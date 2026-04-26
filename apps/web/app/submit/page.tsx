"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { IssueForm } from "@/components/wizard/issue-form";
import { LocationForm } from "@/components/wizard/location-form";
import { ResearchLoading } from "@/components/wizard/research-loading";
import { LetterPreview } from "@/components/wizard/letter-preview";

const STEP_LABELS = [
  "Describe Issue",
  "Your Location",
  "Research",
  "Review Letters",
];

interface FormData {
  issueDescription: string;
  desiredOutcome: string;
  zipCode: string;
  fullName: string;
  anonymous: boolean;
}

export default function SubmitPage() {
  const [step, setStep] = useState(1);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    issueDescription: "",
    desiredOutcome: "",
    zipCode: "",
    fullName: "",
    anonymous: true,
  });

  const progressValue = (step / STEP_LABELS.length) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-navy-700">Submit a Concern</h1>
        <p className="mt-2 text-navy-500">
          Step {step} of {STEP_LABELS.length}: {STEP_LABELS[step - 1]}
        </p>
      </div>

      {/* Progress bar */}
      <Progress value={progressValue} className="h-2" />

      {/* Step content */}
      {step === 1 && (
        <IssueForm
          data={formData}
          onChange={(updates) => setFormData((prev) => ({ ...prev, ...updates }))}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <LocationForm
          data={formData}
          onChange={(updates) => setFormData((prev) => ({ ...prev, ...updates }))}
          onBack={() => setStep(1)}
          onSubmit={(id) => {
            setSubmissionId(id);
            setStep(3);
          }}
        />
      )}

      {step === 3 && submissionId && (
        <ResearchLoading
          submissionId={submissionId}
          onReady={() => setStep(4)}
        />
      )}

      {step === 4 && submissionId && (
        <LetterPreview submissionId={submissionId} />
      )}
    </div>
  );
}
