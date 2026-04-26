"use client";

import { useEffect, useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getResearchStatus, type ResearchStatus } from "@/lib/api";

interface ResearchLoadingProps {
  submissionId: string;
  onReady: () => void;
}

const STAGES: { key: ResearchStatus["status"]; label: string; progress: number }[] = [
  { key: "classifying", label: "Classifying your issue...", progress: 25 },
  { key: "researching", label: "Researching regulations & precedents...", progress: 50 },
  { key: "drafting", label: "Drafting your letters...", progress: 75 },
  { key: "ready", label: "Letters ready for review!", progress: 100 },
];

export function ResearchLoading({ submissionId, onReady }: ResearchLoadingProps) {
  const [status, setStatus] = useState<ResearchStatus>({
    status: "classifying",
    progress: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    async function poll() {
      try {
        const res = await getResearchStatus(submissionId);
        setStatus(res);
        if (res.status === "ready") {
          if (intervalRef.current) clearInterval(intervalRef.current);
          onReady();
        } else if (res.status === "error") {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setError(res.message || "Research failed. Please try again.");
        }
      } catch {
        // Silently retry on network errors — the interval keeps going
      }
    }

    // Initial fetch
    poll();

    // Poll every 3 seconds
    intervalRef.current = setInterval(poll, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [submissionId, onReady]);

  const currentStage = STAGES.find((s) => s.key === status.status) || STAGES[0];

  return (
    <Card className="border-navy-200">
      <CardHeader>
        <CardTitle className="text-navy-700">Researching Your Issue</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Progress value={currentStage.progress} className="h-3" />

        <div className="space-y-3">
          {STAGES.map((stage) => {
            const isActive = stage.key === status.status;
            const isComplete = currentStage.progress > stage.progress;
            return (
              <div
                key={stage.key}
                className={`flex items-center gap-3 text-sm ${
                  isActive
                    ? "font-semibold text-navy-700"
                    : isComplete
                    ? "text-navy-500"
                    : "text-muted-foreground"
                }`}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full border text-xs">
                  {isComplete ? (
                    <svg
                      className="h-3.5 w-3.5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : isActive ? (
                    <span className="h-2 w-2 animate-pulse rounded-full bg-navy-700" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                  )}
                </span>
                {stage.label}
              </div>
            );
          })}
        </div>

        {error && (
          <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
