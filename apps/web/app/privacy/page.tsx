import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - CivicState",
  description:
    "How CivicState collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-navy-700">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-navy-400">
        Last updated: April 25, 2026
      </p>

      <div className="mt-10 space-y-10 text-navy-600 leading-relaxed">
        {/* ── 1. Overview ──────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">1. Overview</h2>
          <p className="mt-3">
            CivicState, Inc. (&quot;CivicState,&quot; &quot;we,&quot;
            &quot;us&quot;) operates the civicstate.com platform. This Privacy
            Policy explains what personal information we collect, why we collect
            it, how long we keep it, and the choices you have.
          </p>
        </section>

        {/* ── 2. Data We Collect ───────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            2. Data We Collect
          </h2>
          <p className="mt-3">
            We classify data into three tiers based on sensitivity:
          </p>

          <h3 className="mt-4 text-lg font-semibold text-navy-700">
            Tier 1 &mdash; Encrypted PII (Personally Identifiable Information)
          </h3>
          <p className="mt-2">
            Full name, email address, mailing address, and any identifying
            information you provide in your submissions. Tier 1 data is
            encrypted at rest using AES-256-GCM and in transit using TLS 1.3.
            Access is restricted to essential operations only.
          </p>

          <h3 className="mt-4 text-lg font-semibold text-navy-700">
            Tier 2 &mdash; Operational Data
          </h3>
          <p className="mt-2">
            Submission content (civic issue descriptions, desired outcomes), ZIP
            codes, payment transaction IDs, campaign metadata, and delivery
            status. This data is used to operate the service, route letters, and
            process payments.
          </p>

          <h3 className="mt-4 text-lg font-semibold text-navy-700">
            Tier 3 &mdash; Public / Aggregate Data
          </h3>
          <p className="mt-2">
            Anonymized analytics (page views, feature usage via Plausible
            Analytics), public official contact information sourced from
            government databases, and aggregate statistics. This data cannot be
            used to identify you.
          </p>
        </section>

        {/* ── 3. Why We Collect Data ───────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            3. Why We Collect Data
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>To provide our service:</strong> research regulations,
              draft letters, identify appropriate officials, and deliver
              correspondence on your behalf.
            </li>
            <li>
              <strong>To process payments:</strong> Stripe handles payment
              processing; we store transaction references but never store credit
              card numbers.
            </li>
            <li>
              <strong>To authenticate you:</strong> Clerk provides
              authentication; we receive your user ID and email.
            </li>
            <li>
              <strong>To improve the service:</strong> anonymized usage data
              helps us understand which features are working.
            </li>
            <li>
              <strong>To comply with the law:</strong> financial and audit
              records are retained for 7 years as required by law.
            </li>
          </ul>
        </section>

        {/* ── 4. Data Retention ────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            4. Data Retention
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Agent action logs:</strong> 24 months, then automatically
              purged.
            </li>
            <li>
              <strong>Job snapshots:</strong> 12 months, then automatically
              purged.
            </li>
            <li>
              <strong>Financial and audit records:</strong> 7 years (legal
              requirement).
            </li>
            <li>
              <strong>Account data:</strong> retained until you delete your
              account or request deletion.
            </li>
          </ul>
        </section>

        {/* ── 5. AI Disclosure ─────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            5. AI Disclosure
          </h2>
          <p className="mt-3">
            CivicState uses artificial intelligence to research regulations, find
            citations, and draft letters. Specifically:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Model:</strong> We use Anthropic&apos;s Claude API to
              generate research summaries and draft letters.
            </li>
            <li>
              <strong>Data sent to Anthropic:</strong> Your submission content
              (civic issue description and desired outcome) is sent to
              Anthropic&apos;s API for processing. We do not send your name,
              email, or payment information to Anthropic.
            </li>
            <li>
              <strong>Anthropic&apos;s data retention:</strong> Per
              Anthropic&apos;s API terms, prompts and outputs are not used to
              train models and are retained for up to 30 days for trust and
              safety purposes. See{" "}
              <a
                href="https://www.anthropic.com/privacy"
                className="text-navy-700 underline hover:text-gold-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Anthropic&apos;s Privacy Policy
              </a>{" "}
              for details.
            </li>
            <li>
              <strong>Human review:</strong> AI-generated letters are subject to
              content moderation. Flagged submissions may be reviewed by CivicState
              staff before delivery.
            </li>
          </ul>
        </section>

        {/* ── 6. Your Rights (CCPA) ───────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            6. Your Rights Under the California Consumer Privacy Act (CCPA)
          </h2>
          <p className="mt-3">
            If you are a California resident, you have the following rights:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Right to Know:</strong> You may request a copy of all
              personal information we hold about you. Use the data export
              feature in your{" "}
              <Link
                href="/dashboard"
                className="text-navy-700 underline hover:text-gold-500"
              >
                dashboard
              </Link>{" "}
              or email us.
            </li>
            <li>
              <strong>Right to Delete:</strong> You may request deletion of your
              personal information. We will process deletion requests within 72
              hours. Use the &quot;Delete My Data&quot; option in your dashboard
              or email us.
            </li>
            <li>
              <strong>Right to Opt-Out:</strong> We do not sell your personal
              information. We do not share your information with third parties
              for their marketing purposes.
            </li>
            <li>
              <strong>Non-Discrimination:</strong> We will not discriminate
              against you for exercising your CCPA rights.
            </li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, email{" "}
            <a
              href="mailto:privacy@civicstate.com"
              className="text-navy-700 underline hover:text-gold-500"
            >
              privacy@civicstate.com
            </a>{" "}
            or use the self-service tools in your account dashboard. We will
            verify your identity before processing any request.
          </p>
        </section>

        {/* ── 7. Third-Party Services ─────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            7. Third-Party Services
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Clerk</strong> &mdash; authentication and identity
              management.
            </li>
            <li>
              <strong>Stripe</strong> &mdash; payment processing. See{" "}
              <a
                href="https://stripe.com/privacy"
                className="text-navy-700 underline hover:text-gold-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stripe&apos;s Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Postmark</strong> &mdash; transactional email delivery.
            </li>
            <li>
              <strong>Anthropic</strong> &mdash; AI research and letter
              generation.
            </li>
            <li>
              <strong>Plausible Analytics</strong> &mdash; privacy-friendly,
              cookie-free website analytics.
            </li>
          </ul>
        </section>

        {/* ── 8. Contact ──────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            8. Contact Us
          </h2>
          <p className="mt-3">
            For privacy-related questions or requests, contact:
          </p>
          <address className="mt-3 not-italic">
            <p>CivicState, Inc.</p>
            <p>San Francisco, CA</p>
            <p>
              Email:{" "}
              <a
                href="mailto:privacy@civicstate.com"
                className="text-navy-700 underline hover:text-gold-500"
              >
                privacy@civicstate.com
              </a>
            </p>
          </address>
        </section>
      </div>

      {/* Footer links */}
      <div className="mt-16 border-t border-navy-200 pt-6 text-sm text-navy-400">
        <Link href="/terms" className="hover:text-navy-600 underline">
          Terms of Service
        </Link>
        {" | "}
        <Link href="/about" className="hover:text-navy-600 underline">
          About
        </Link>
        {" | "}
        <Link href="/" className="hover:text-navy-600 underline">
          Home
        </Link>
      </div>
    </main>
  );
}
