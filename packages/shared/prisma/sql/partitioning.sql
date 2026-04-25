-- Monthly partitioning for audit/ledger tables (per D-13, DATA-06)
-- This converts the tables to partitioned tables.
-- Run AFTER initial Prisma migration.
--
-- Note: Converting existing tables to partitioned requires recreating them.
-- For a greenfield project, create partitioned tables BEFORE first data insertion.
-- Prisma will be configured to query the parent table; PostgreSQL routes to partitions.

-- Create partition function
CREATE OR REPLACE FUNCTION create_monthly_partition(
  table_name TEXT,
  partition_date DATE DEFAULT CURRENT_DATE
) RETURNS VOID AS $$
DECLARE
  partition_name TEXT;
  start_date DATE;
  end_date DATE;
BEGIN
  start_date := date_trunc('month', partition_date);
  end_date := start_date + INTERVAL '1 month';
  partition_name := table_name || '_' || to_char(start_date, 'YYYY_MM');

  EXECUTE format(
    'CREATE TABLE IF NOT EXISTS %I PARTITION OF %I FOR VALUES FROM (%L) TO (%L)',
    partition_name, table_name, start_date, end_date
  );
END;
$$ LANGUAGE plpgsql;

-- Helper: Create partitions for next N months (call from a cron job or BullMQ repeatable job)
CREATE OR REPLACE FUNCTION ensure_partitions_ahead(
  table_name TEXT,
  months_ahead INT DEFAULT 3
) RETURNS VOID AS $$
DECLARE
  i INT;
  target_date DATE;
BEGIN
  FOR i IN 0..months_ahead LOOP
    target_date := CURRENT_DATE + (i || ' months')::INTERVAL;
    PERFORM create_monthly_partition(table_name, target_date);
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Example usage (run after converting tables to partitioned):
-- SELECT ensure_partitions_ahead('LedgerEntry', 3);
-- SELECT ensure_partitions_ahead('AuditLog', 3);
-- SELECT ensure_partitions_ahead('AgentActionLog', 3);
