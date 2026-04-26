import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      {/* Hero */}
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-navy-700">
          CivicState
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-navy-600">
          Turn civic concerns into researched, citation-backed letters delivered
          to your government officials.
        </p>
        <p className="mt-2 text-base text-navy-400">
          AI-powered research. Verified citations. One-click delivery. $5 - $25.
        </p>
      </div>

      {/* CTA */}
      <div className="flex gap-4">
        <Button asChild size="lg" className="bg-gold-500 text-navy-800 hover:bg-gold-400 font-semibold px-8">
          <Link href="/submit">Get Started</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="#how-it-works">Learn More</Link>
        </Button>
      </div>

      {/* How it works */}
      <section id="how-it-works" className="mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-lg border border-navy-200 p-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 text-navy-700 font-bold">
            1
          </div>
          <h3 className="font-semibold text-navy-700">Describe Your Issue</h3>
          <p className="mt-2 text-sm text-navy-500">
            Tell us what civic concern matters to you and the outcome you want.
          </p>
        </div>
        <div className="rounded-lg border border-navy-200 p-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 text-navy-700 font-bold">
            2
          </div>
          <h3 className="font-semibold text-navy-700">AI Researches</h3>
          <p className="mt-2 text-sm text-navy-500">
            Our AI finds relevant regulations, precedents, and the right officials to contact.
          </p>
        </div>
        <div className="rounded-lg border border-navy-200 p-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 text-navy-700 font-bold">
            3
          </div>
          <h3 className="font-semibold text-navy-700">Letters Delivered</h3>
          <p className="mt-2 text-sm text-navy-500">
            Review your citation-backed letters and we deliver them to officials.
          </p>
        </div>
      </section>
    </main>
  );
}
