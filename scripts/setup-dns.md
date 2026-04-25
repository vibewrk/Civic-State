# CivicState DNS Setup for Email Deliverability

This document describes the DNS records required on **civicstate.com** for SPF, DKIM, DMARC, and Return-Path configuration. These records are prerequisites for email delivery via Postmark and must be created before any transactional emails are sent.

## DNS Records

### SPF Record

Sender Policy Framework authorizes Postmark's servers to send email on behalf of civicstate.com.

| Field | Value |
|-------|-------|
| **Type** | TXT |
| **Host** | `@` |
| **Value** | `v=spf1 include:spf.mtasv.net ~all` |
| **TTL** | 3600 |

> `spf.mtasv.net` is Postmark's SPF include domain. The `~all` soft-fail policy is recommended during domain warming; switch to `-all` (hard-fail) after confirming deliverability.

### DKIM Record

DomainKeys Identified Mail signs outgoing emails with a cryptographic key.

| Field | Value |
|-------|-------|
| **Type** | TXT (or CNAME, depending on Postmark instructions) |
| **Host** | Provided by Postmark after domain verification |
| **Value** | Provided by Postmark (unique per domain) |
| **TTL** | 3600 |

**Setup steps:**
1. Log in to Postmark at https://account.postmarkapp.com
2. Navigate to **Sender Signatures** > **Add Domain**
3. Enter `civicstate.com`
4. Postmark will provide the exact DKIM hostname and value
5. Create the DNS record at your registrar
6. Return to Postmark and click **Verify**

### DMARC Record

Domain-based Message Authentication, Reporting, and Conformance tells receiving servers how to handle emails that fail SPF/DKIM checks.

| Field | Value |
|-------|-------|
| **Type** | TXT |
| **Host** | `_dmarc` |
| **Value** | `v=DMARC1; p=quarantine; rua=mailto:dmarc@civicstate.com; pct=100` |
| **TTL** | 3600 |

> `p=quarantine` instructs receivers to quarantine (not reject) emails that fail authentication. The `rua` address receives aggregate DMARC reports. Create a mailbox or forwarding rule for `dmarc@civicstate.com` to monitor these reports.

### Return-Path (Bounce Handling)

Routes bounce notifications back through Postmark for tracking.

| Field | Value |
|-------|-------|
| **Type** | CNAME |
| **Host** | `pm-bounces` |
| **Value** | `pm.mtasv.net` |
| **TTL** | 3600 |

## Postmark Domain Verification

After creating all DNS records:

1. Go to Postmark > **Sender Signatures** > **civicstate.com**
2. Click **Verify SPF**, **Verify DKIM**, and **Verify Return-Path**
3. All three should show green checkmarks
4. If verification fails, allow up to 48 hours for DNS propagation and retry

## Domain Warming Strategy

**Domain warming begins when Clerk emails flow post-deployment**, not when DNS records are created. The warming timeline works as follows:

1. **DNS records created** (this setup) -- establishes authentication infrastructure
2. **Clerk configured to route through Postmark** -- transactional emails (welcome, verification, magic link) begin flowing through Postmark
3. **Each auth-related email contributes to domain reputation** -- these are legitimate, user-initiated transactional emails with high engagement rates (opens, clicks)
4. **2-4 week warming period** -- domain reputation builds gradually with ISPs and government mail servers
5. **Phase 3 letter delivery begins** -- by this point, civicstate.com has an established sending reputation

### Warming Best Practices

- **Do NOT send bulk emails during warming.** Only transactional (auth) emails should flow during the warming period.
- **Monitor sender score** from day one at https://senderscore.org
- **Check Postmark's Activity tab** for bounce rates and spam complaints
- **Target metrics during warming:**
  - Bounce rate < 2%
  - Spam complaint rate < 0.1%
  - Open rate > 30% (transactional emails typically achieve 40-60%)

### Postmark Dedicated IP

If available on the selected Postmark tier, request a dedicated IP address. A dedicated IP means civicstate.com's sending reputation is not affected by other Postmark customers' behavior. This is especially important for government email delivery where spam filters are aggressive.

## Monitoring

### Ongoing Checks

- **Sender Score:** https://senderscore.org -- check weekly during warming, monthly after
- **MXToolbox:** https://mxtoolbox.com/emailhealth -- verify SPF/DKIM/DMARC are correctly configured
- **Postmark Dashboard:** Monitor delivery rates, bounces, and spam complaints per message stream
- **DMARC Reports:** Review aggregate reports sent to `dmarc@civicstate.com` for authentication failures

### Test Email Endpoint

The API includes a test endpoint at `POST /api/test/postmark-ping` that sends a domain warming test email via Postmark. Use this to verify the integration is working:

```bash
curl -X POST http://localhost:3001/api/test/postmark-ping \
  -H "Content-Type: application/json" \
  -d '{"to": "your-email@example.com"}'
```

This endpoint requires `POSTMARK_SERVER_TOKEN` to be set in the environment.
