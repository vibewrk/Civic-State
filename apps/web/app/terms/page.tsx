import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - CivicState",
  description: "Terms and conditions for using the CivicState platform.",
};

export default function TermsOfServicePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-navy-700">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-navy-400">
        Last updated: April 25, 2026
      </p>

      {/* ── PROMINENT DISCLAIMER ──────────────────────────────────── */}
      <div className="mt-8 rounded-lg border-2 border-gold-500 bg-gold-50 p-6">
        <h2 className="text-lg font-bold text-navy-800">
          IMPORTANT: THIS IS NOT LEGAL ADVICE
        </h2>
        <p className="mt-2 text-navy-700">
          CivicState is a technology platform that helps you communicate with
          government officials. <strong>We are not a law firm.</strong> The
          letters, research, and citations provided by CivicState do not
          constitute legal advice, legal representation, or lobbying services.
          If you need legal advice, consult a licensed attorney.
        </p>
      </div>

      <div className="mt-10 space-y-10 text-navy-600 leading-relaxed">
        {/* ── 1. Service Description ──────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            1. Service Description
          </h2>
          <p className="mt-3">
            CivicState provides an AI-assisted platform that helps citizens
            research regulations, draft citation-backed letters about civic
            issues, and deliver those letters to appropriate government
            officials. The service is available at civicstate.com.
          </p>
          <h3 className="mt-4 text-lg font-semibold text-navy-700">
            Service Limitations
          </h3>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>
              Letters are AI-generated research tools, not professional legal
              documents.
            </li>
            <li>
              We cannot guarantee any specific outcome from your letter.
            </li>
            <li>
              Official contact information is sourced from public databases and
              may occasionally be outdated.
            </li>
            <li>
              Delivery confirmation indicates the letter was sent, not that it
              was read or acted upon.
            </li>
          </ul>
        </section>

        {/* ── 2. Lobbying Disclaimer ──────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            2. Lobbying Disclaimer
          </h2>
          <p className="mt-3">
            CivicState facilitates <strong>constituent communication</strong>{" "}
            &mdash; direct communication between citizens and their elected
            officials. This is a constitutionally protected activity under the
            First Amendment.
          </p>
          <p className="mt-3">
            CivicState does not engage in lobbying. We do not advocate for
            specific legislation on behalf of clients, coordinate grassroots
            campaigns, or act as a lobbyist or lobbying firm. Each letter
            represents the individual views of the user who authored it.
          </p>
        </section>

        {/* ── 3. User-as-Author ───────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            3. You Are the Author
          </h2>
          <p className="mt-3">
            When you use CivicState, you describe your civic concern and
            desired outcome in your own words. Our AI assists with research and
            drafting, but <strong>you are the author</strong> of the underlying
            civic issue. By submitting a letter for delivery, you affirm that:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              The civic concern you described is genuine and reflects your
              actual views.
            </li>
            <li>
              You have reviewed the AI-generated letter and approve its content.
            </li>
            <li>
              You authorize CivicState to deliver the letter on your behalf.
            </li>
          </ul>
        </section>

        {/* ── 4. Account and Eligibility ──────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            4. Account and Eligibility
          </h2>
          <p className="mt-3">
            You must be at least 13 years old to use CivicState. You are
            responsible for maintaining the security of your account
            credentials. You agree to provide accurate information when creating
            your account.
          </p>
        </section>

        {/* ── 5. Content Policy ───────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            5. Content Policy
          </h2>
          <p className="mt-3">
            All submissions are subject to automated content moderation. The
            following content is prohibited and will be rejected or flagged:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Threats of violence or harm against any person.</li>
            <li>
              Hate speech targeting individuals or groups based on protected
              characteristics.
            </li>
            <li>
              Harassment, intimidation, or personal attacks against officials.
            </li>
            <li>Deliberately false or fabricated claims presented as fact.</li>
            <li>Spam, commercial solicitation, or off-topic content.</li>
            <li>Content that violates applicable law.</li>
          </ul>
          <p className="mt-3">
            We reserve the right to refuse service and cancel letters that
            violate this policy. Refunds may be issued at our discretion for
            moderated content.
          </p>
        </section>

        {/* ── 6. Payment Terms and Refund Policy ──────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            6. Payment Terms and Refund Policy
          </h2>
          <p className="mt-3">
            CivicState charges between $5 and $25 per letter, depending on the
            tier of service selected. Payment is processed by Stripe at the time
            of submission.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Refunds for undelivered letters:</strong> If we are unable
              to deliver your letter for any reason (invalid official address,
              delivery failure), you will receive a full refund.
            </li>
            <li>
              <strong>Refunds for moderated content:</strong> If your submission
              is rejected by our moderation system, you will receive a full
              refund.
            </li>
            <li>
              <strong>No refunds after delivery:</strong> Once a letter has been
              successfully delivered, no refunds will be issued.
            </li>
            <li>
              <strong>Processing time:</strong> Letters are typically researched,
              drafted, and delivered within 24&ndash;48 hours.
            </li>
          </ul>
        </section>

        {/* ── 7. CAN-SPAM Compliance ──────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            7. CAN-SPAM Compliance (LGAL-03)
          </h2>
          <p className="mt-3">
            CivicState complies with the CAN-SPAM Act. All transactional and
            marketing emails we send:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              Include our physical mailing address: CivicState, Inc., San
              Francisco, CA.
            </li>
            <li>
              Contain a clear and conspicuous unsubscribe mechanism for
              marketing emails.
            </li>
            <li>Use accurate &quot;From&quot; and subject lines.</li>
            <li>
              Honor opt-out requests within 10 business days.
            </li>
          </ul>
          <p className="mt-3">
            Note: Letters delivered to government officials on your behalf are
            constituent correspondence, not commercial email, and are not
            subject to CAN-SPAM.
          </p>
        </section>

        {/* ── 8. Intellectual Property ────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            8. Intellectual Property
          </h2>
          <p className="mt-3">
            You retain ownership of the civic concerns and viewpoints you
            submit. CivicState retains ownership of the platform, AI models
            (which are licensed from Anthropic), and proprietary research
            processes. AI-generated letter content is provided to you under a
            perpetual, non-exclusive license for personal use.
          </p>
        </section>

        {/* ── 9. Limitation of Liability ──────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            9. Limitation of Liability
          </h2>
          <p className="mt-3">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, CIVICSTATE SHALL NOT BE
            LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE
            SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID
            FOR THE SPECIFIC SERVICE GIVING RISE TO THE CLAIM.
          </p>
        </section>

        {/* ── 10. Changes ─────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            10. Changes to These Terms
          </h2>
          <p className="mt-3">
            We may update these Terms from time to time. Material changes will
            be communicated via email or a notice on our website. Continued use
            of the service after changes constitutes acceptance of the updated
            terms.
          </p>
        </section>

        {/* ── 11. Contact ─────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            11. Contact
          </h2>
          <p className="mt-3">
            Questions about these Terms? Contact us at{" "}
            <a
              href="mailto:legal@civicstate.com"
              className="text-navy-700 underline hover:text-gold-500"
            >
              legal@civicstate.com
            </a>
            .
          </p>
        </section>
      </div>

      {/* Footer links */}
      <div className="mt-16 border-t border-navy-200 pt-6 text-sm text-navy-400">
        <Link href="/privacy" className="hover:text-navy-600 underline">
          Privacy Policy
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
