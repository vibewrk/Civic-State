import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About CivicState",
  description:
    "Learn about CivicState's mission, AI transparency, and how we help citizens engage with government.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-navy-700">
        About CivicState
      </h1>

      <div className="mt-10 space-y-10 text-navy-600 leading-relaxed">
        {/* ── Mission ─────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">Our Mission</h2>
          <p className="mt-3">
            CivicState exists to make civic participation accessible to
            everyone. We believe every citizen should be able to communicate
            effectively with their government officials, regardless of their
            legal knowledge, writing ability, or available time.
          </p>
          <p className="mt-3">
            By combining AI-powered research with verified legal citations, we
            help you turn your civic concerns into well-researched,
            professionally drafted letters that get delivered to the right
            officials.
          </p>
        </section>

        {/* ── How It Works ────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            How It Works
          </h2>
          <ol className="mt-3 list-decimal space-y-3 pl-6">
            <li>
              <strong>You describe your concern</strong> &mdash; tell us what
              civic issue matters to you and what outcome you want to see.
            </li>
            <li>
              <strong>AI researches and drafts</strong> &mdash; our system
              finds relevant regulations, legal precedents, and citations, then
              drafts a letter on your behalf.
            </li>
            <li>
              <strong>You review and approve</strong> &mdash; every letter is
              yours to review before it goes out. You are always the author.
            </li>
            <li>
              <strong>We deliver</strong> &mdash; letters are sent to the
              appropriate officials via email, and you can track delivery
              status.
            </li>
          </ol>
        </section>

        {/* ── AI Transparency ─────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            AI Transparency
          </h2>
          <p className="mt-3">
            CivicState is transparent about how we use artificial intelligence:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              We use <strong>Anthropic&apos;s Claude</strong> to research
              regulations and draft letters.
            </li>
            <li>
              AI-generated content is clearly identified as such. Every letter
              includes a disclosure that it was drafted with AI assistance.
            </li>
            <li>
              We <strong>do not</strong> use AI to impersonate officials,
              fabricate endorsements, or create deceptive content.
            </li>
            <li>
              All AI outputs go through content moderation to ensure quality and
              compliance with our{" "}
              <Link
                href="/terms"
                className="text-navy-700 underline hover:text-gold-500"
              >
                content policy
              </Link>
              .
            </li>
            <li>
              Citations are verified against source materials. Letters include
              only citations that can be traced to real regulatory documents.
            </li>
          </ul>
        </section>

        {/* ── What We Are Not ─────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            What We Are Not
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              We are <strong>not a law firm</strong> and do not provide legal
              advice.
            </li>
            <li>
              We are <strong>not a lobbying organization</strong>. We facilitate
              constituent communication, which is protected First Amendment
              activity.
            </li>
            <li>
              We <strong>do not</strong> sell or share your personal data with
              third parties for marketing.
            </li>
          </ul>
        </section>

        {/* ── CAN-SPAM / Physical Address ─────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-700">
            Company Information
          </h2>
          <address className="mt-3 not-italic">
            <p className="font-semibold text-navy-700">CivicState, Inc.</p>
            <p>San Francisco, CA</p>
          </address>
          <p className="mt-3">
            General inquiries:{" "}
            <a
              href="mailto:hello@civicstate.com"
              className="text-navy-700 underline hover:text-gold-500"
            >
              hello@civicstate.com
            </a>
          </p>
          <p className="mt-1">
            Privacy requests:{" "}
            <a
              href="mailto:privacy@civicstate.com"
              className="text-navy-700 underline hover:text-gold-500"
            >
              privacy@civicstate.com
            </a>
          </p>
          <p className="mt-1">
            Legal:{" "}
            <a
              href="mailto:legal@civicstate.com"
              className="text-navy-700 underline hover:text-gold-500"
            >
              legal@civicstate.com
            </a>
          </p>
        </section>
      </div>

      {/* Footer links */}
      <div className="mt-16 border-t border-navy-200 pt-6 text-sm text-navy-400">
        <Link href="/privacy" className="hover:text-navy-600 underline">
          Privacy Policy
        </Link>
        {" | "}
        <Link href="/terms" className="hover:text-navy-600 underline">
          Terms of Service
        </Link>
        {" | "}
        <Link href="/" className="hover:text-navy-600 underline">
          Home
        </Link>
      </div>
    </main>
  );
}
