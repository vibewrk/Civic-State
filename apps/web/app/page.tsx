import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold text-navy-700">CivicState</h1>
      <p className="max-w-md text-center text-lg text-navy-600">
        Turn civic concerns into researched, citation-backed letters delivered to
        your government officials.
      </p>
      <div className="flex gap-4">
        <Button>Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </main>
  );
}
