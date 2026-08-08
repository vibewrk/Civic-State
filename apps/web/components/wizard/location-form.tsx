"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createSubmission, lookupOfficialCoverage } from "@/lib/api";
import {
  summarizeOfficialCoverage,
  type OfficialCoverageResponse,
  type OfficialCoverageTone,
} from "@/lib/official-coverage";

interface LocationFormProps {
  data: {
    issueDescription: string;
    desiredOutcome: string;
    zipCode: string;
    fullName: string;
    anonymous: boolean;
  };
  onChange: (updates: Partial<LocationFormProps["data"]>) => void;
  onBack: () => void;
  onSubmit: (submissionId: string) => void;
}

const ZIP_REGEX = /^\d{5}$/;
const COVERAGE_LOOKUP_TIMEOUT_MS = 30_000;

const COVERAGE_STYLES: Record<OfficialCoverageTone, string> = {
  high: "border-green-200 bg-green-50 text-green-900",
  medium: "border-gold-200 bg-gold-50 text-gold-900",
  low: "border-amber-200 bg-amber-50 text-amber-900",
  none: "border-destructive/20 bg-destructive/10 text-destructive",
};

function isAbortError(err: unknown): boolean {
  return err instanceof Error && err.name === "AbortError";
}

function createCoverageLookupSignal(controller: AbortController): AbortSignal {
  if (
    typeof AbortSignal.any === "function" &&
    typeof AbortSignal.timeout === "function"
  ) {
    return AbortSignal.any([
      controller.signal,
      AbortSignal.timeout(COVERAGE_LOOKUP_TIMEOUT_MS),
    ]);
  }

  return controller.signal;
}

export function LocationForm({ data, onChange, onBack, onSubmit }: LocationFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coverage, setCoverage] = useState<OfficialCoverageResponse | null>(null);
  const [coverageLoading, setCoverageLoading] = useState(false);
  const [coverageError, setCoverageError] = useState<string | null>(null);

  const zipValid = ZIP_REGEX.test(data.zipCode);
  const canSubmit = zipValid && !submitting;
  const coverageSummary = coverage ? summarizeOfficialCoverage(coverage) : null;

  useEffect(() => {
    if (!zipValid) {
      setCoverage(null);
      setCoverageLoading(false);
      setCoverageError(null);
      return;
    }

    let cancelled = false;
    const controller = new AbortController();
    const zipCode = data.zipCode;
    setCoverageLoading(true);
    setCoverageError(null);

    const timeout = window.setTimeout(async () => {
      try {
        const result = await lookupOfficialCoverage(zipCode, {
          signal: createCoverageLookupSignal(controller),
        });
        if (!cancelled) setCoverage(result);
      } catch (err) {
        if (isAbortError(err) && controller.signal.aborted) return;
        if (!cancelled) {
          setCoverage(null);
          setCoverageError("Coverage check unavailable right now.");
        }
      } finally {
        if (!cancelled) setCoverageLoading(false);
      }
    }, 350);

    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [data.zipCode, zipValid]);

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const result = await createSubmission({
        issueDescription: data.issueDescription,
        desiredOutcome: data.desiredOutcome,
        zipCode: data.zipCode,
        fullName: data.anonymous ? undefined : data.fullName || undefined,
        anonymous: data.anonymous,
      });
      onSubmit(result.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  return (
    <Card className="border-navy-200">
      <CardHeader>
        <CardTitle className="text-navy-700">Your Location</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* ZIP code */}
        <div className="space-y-2">
          <Label htmlFor="zip" className="text-navy-600">
            ZIP Code
          </Label>
          <Input
            id="zip"
            placeholder="e.g. 90210"
            value={data.zipCode}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 5);
              onChange({ zipCode: val });
            }}
            maxLength={5}
            inputMode="numeric"
            className="max-w-[200px]"
          />
          {data.zipCode.length > 0 && !zipValid && (
            <p className="text-xs text-destructive">
              Please enter a valid 5-digit ZIP code
            </p>
          )}
          {zipValid && (
            <div
              className={`rounded-md border p-3 text-sm ${
                coverageSummary
                  ? COVERAGE_STYLES[coverageSummary.tone]
                  : "border-navy-200 bg-navy-50 text-navy-700"
              }`}
            >
              {coverageLoading && <p>Checking official coverage...</p>}
              {!coverageLoading && coverageSummary && (
                <div className="space-y-1">
                  <p className="font-medium">{coverageSummary.title}</p>
                  <p>{coverageSummary.detail}</p>
                </div>
              )}
              {!coverageLoading && coverageError && <p>{coverageError}</p>}
            </div>
          )}
        </div>

        {/* Anonymous toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="anonymous"
            checked={data.anonymous}
            onChange={(e) => onChange({ anonymous: e.target.checked })}
            className="h-4 w-4 rounded border-navy-300 text-navy-700 focus:ring-navy-500"
          />
          <Label htmlFor="anonymous" className="text-navy-600 cursor-pointer">
            Stay anonymous
          </Label>
        </div>

        {/* Full name (shown when not anonymous) */}
        {!data.anonymous && (
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-navy-600">
              Full Name (optional)
            </Label>
            <Input
              id="fullName"
              placeholder="Your full name"
              value={data.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
            />
          </div>
        )}

        {/* Error message */}
        {error && (
          <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </p>
        )}
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" onClick={onBack} disabled={submitting}>
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="bg-navy-700 hover:bg-navy-600"
        >
          {submitting ? "Submitting..." : "Submit & Research"}
        </Button>
      </CardFooter>
    </Card>
  );
}
