#!/usr/bin/env bash
set -euo pipefail

# CivicState PostgreSQL Backup Script
# Runs daily via cron on the DigitalOcean droplet
# Backs up to DigitalOcean Spaces (S3-compatible) with 30-day retention

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/tmp/civicstate-backups"
BACKUP_FILE="civicstate_${TIMESTAMP}.sql.gz"
SPACES_BUCKET="${DO_SPACES_BUCKET:-civicstate-backups}"
SPACES_REGION="${DO_SPACES_REGION:-nyc3}"
RETENTION_DAYS=30

# Create temp directory
mkdir -p "$BACKUP_DIR"

echo "[$(date)] Starting backup..."

# Dump database (from Docker container)
docker exec civicstate-postgres-1 pg_dump \
  -U civicstate \
  -d civicstate \
  --no-owner \
  --no-privileges \
  | gzip > "${BACKUP_DIR}/${BACKUP_FILE}"

BACKUP_SIZE=$(du -h "${BACKUP_DIR}/${BACKUP_FILE}" | cut -f1)
echo "[$(date)] Backup created: ${BACKUP_FILE} (${BACKUP_SIZE})"

# Upload to DigitalOcean Spaces via s3cmd
s3cmd put \
  "${BACKUP_DIR}/${BACKUP_FILE}" \
  "s3://${SPACES_BUCKET}/backups/${BACKUP_FILE}" \
  --host="${SPACES_REGION}.digitaloceanspaces.com" \
  --host-bucket="%(bucket)s.${SPACES_REGION}.digitaloceanspaces.com"

echo "[$(date)] Uploaded to Spaces: s3://${SPACES_BUCKET}/backups/${BACKUP_FILE}"

# Delete backups older than retention period
s3cmd ls "s3://${SPACES_BUCKET}/backups/" \
  --host="${SPACES_REGION}.digitaloceanspaces.com" \
  --host-bucket="%(bucket)s.${SPACES_REGION}.digitaloceanspaces.com" \
  | while read -r line; do
    FILE_DATE=$(echo "$line" | awk '{print $1}')
    FILE_PATH=$(echo "$line" | awk '{print $4}')
    if [[ -n "$FILE_DATE" && -n "$FILE_PATH" ]]; then
      DAYS_OLD=$(( ($(date +%s) - $(date -d "$FILE_DATE" +%s 2>/dev/null || date -j -f "%Y-%m-%d" "$FILE_DATE" +%s 2>/dev/null || echo 0)) / 86400 ))
      if [[ $DAYS_OLD -gt $RETENTION_DAYS ]]; then
        echo "[$(date)] Deleting old backup: $FILE_PATH ($DAYS_OLD days old)"
        s3cmd del "$FILE_PATH" \
          --host="${SPACES_REGION}.digitaloceanspaces.com" \
          --host-bucket="%(bucket)s.${SPACES_REGION}.digitaloceanspaces.com"
      fi
    fi
  done

# Cleanup local temp
rm -f "${BACKUP_DIR}/${BACKUP_FILE}"

echo "[$(date)] Backup complete."

# Cron entry (add to droplet crontab):
# 0 3 * * * /opt/civicstate/scripts/backup.sh >> /var/log/civicstate-backup.log 2>&1
