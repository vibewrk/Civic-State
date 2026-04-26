"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createSubmission } from "@/lib/api";

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

export function LocationForm({ data, onChange, onBack, onSubmit }: LocationFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const zipValid = ZIP_REGEX.test(data.zipCode);
  const canSubmit = zipValid && !submitting;

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
