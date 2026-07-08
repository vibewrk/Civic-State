"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getLetterPreviews,
  createPaymentSession,
  type LetterPreview as LetterPreviewType,
  type LetterPreviewResponse,
  type PricingTier,
} from "@/lib/api";

interface LetterPreviewProps {
  submissionId: string;
}

export function LetterPreview({ submissionId }: LetterPreviewProps) {
  const [data, setData] = useState<LetterPreviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [selectedTier, setSelectedTier] = useState<PricingTier>("single");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  async function handlePayment() {
    setPaying(true);
    setPayError(null);
    try {
      const session = await createPaymentSession(submissionId, selectedTier);
      window.location.href = session.checkoutUrl;
    } catch (err) {
      setPayError(
        err instanceof Error ? err.message : "Payment failed. Please try again."
      );
      setPaying(false);
    }
  }

  useEffect(() => {
    async function fetchPreviews() {
      try {
        const result = await getLetterPreviews(submissionId);
        setData(result);
        setSelectedTier(result.pricingTier ?? result.packages[0]?.tier ?? "single");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load previews");
      } finally {
        setLoading(false);
      }
    }
    fetchPreviews();
  }, [submissionId]);

  if (loading) {
    return (
      <Card className="border-navy-200">
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Loading letter previews...</p>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="border-navy-200">
        <CardContent className="py-8">
          <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error || "No previews available"}
          </p>
        </CardContent>
      </Card>
    );
  }

  const selectedPackage =
    data.packages.find((pkg) => pkg.tier === selectedTier) ?? data.packages[0];
  const tierPrice = selectedPackage?.amount ?? data.pricingTiers[selectedTier];

  return (
    <div className="space-y-6">
      {/* Letter cards */}
      <div className="space-y-4">
        {data.letters.map((letter, index) => (
          <LetterCard
            key={index}
            letter={letter}
            expanded={expandedIndex === index}
            onToggle={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          />
        ))}
      </div>

      {/* AI Disclosure */}
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-gold-100 text-gold-800">
          AI-Generated
        </Badge>
        <span className="text-xs text-muted-foreground">
          Letters drafted by AI based on your input and public research
        </span>
      </div>

      {/* Pricing tier selector */}
      <Card className="border-navy-200">
        <CardHeader>
          <CardTitle className="text-lg text-navy-700">
            Choose Your Delivery
          </CardTitle>
          <CardDescription>
            Select how many officials to send your letter to
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {data.packages.map(
              (pkg) => {
                const tier = pkg.tier;
                const isSelected = selectedTier === tier;
                return (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`rounded-lg border-2 p-4 text-center transition-colors ${
                      isSelected
                        ? "border-navy-700 bg-navy-50"
                        : "border-border hover:border-navy-300"
                    }`}
                  >
                    <div className="text-2xl font-bold text-navy-700">
                      ${pkg.amount}
                    </div>
                    <div className="mt-1 text-sm text-navy-500">{pkg.label}</div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {pkg.description}
                    </div>
                  </button>
                );
              }
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button
            className="w-full bg-gold-500 text-navy-800 hover:bg-gold-400 font-semibold text-base py-6"
            size="lg"
            disabled={paying || !selectedPackage || data.lettersCount === 0}
            onClick={handlePayment}
          >
            {paying ? "Creating checkout session..." : `Proceed to Payment - $${tierPrice}`}
          </Button>
          {payError && (
            <p className="text-xs text-center text-destructive">
              {payError}
            </p>
          )}
        </CardFooter>
      </Card>

      {/* Disclaimer */}
      <p className="text-xs text-center text-muted-foreground border-t pt-4">
        <strong>Disclaimer:</strong> CivicState letters are not legal advice.
        Content is generated by AI and may contain errors. You should review all
        letters before sending. CivicState is not a law firm and does not provide
        legal representation.
      </p>
    </div>
  );
}

function LetterCard({
  letter,
  expanded,
  onToggle,
}: {
  letter: LetterPreviewType;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <Card
      className={`cursor-pointer border-navy-200 transition-shadow ${
        expanded ? "shadow-md" : "hover:shadow-sm"
      }`}
      onClick={onToggle}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base text-navy-700">
              {letter.official.name}
            </CardTitle>
            <CardDescription>
              {letter.official.title} &mdash; {letter.official.jurisdiction}
            </CardDescription>
          </div>
          <svg
            className={`h-5 w-5 text-navy-400 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent>
          <div className="whitespace-pre-wrap rounded-md bg-navy-50 p-4 text-sm leading-relaxed text-navy-800">
            {letter.content}
          </div>
          {letter.citations.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-navy-600">Citations:</p>
              <ul className="mt-1 space-y-1">
                {letter.citations.map((citation, i) => (
                  <li key={i} className="text-xs text-muted-foreground">
                    [{i + 1}] {citation}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
