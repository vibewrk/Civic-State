"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { DeliveryStatus } from "./delivery-status";
import type { Campaign } from "@/lib/api";

interface CampaignListProps {
  campaigns: Campaign[];
}

/**
 * Derive an overall delivery status from a campaign's letters.
 * Priority: failed/bounced > delivered > sent > queued/draft/pending
 */
function deriveOverallStatus(campaign: Campaign): string {
  const statuses = campaign.letters.map(
    (l) => l.delivery?.status ?? l.status ?? "queued"
  );

  if (statuses.length === 0) return campaign.status;
  if (statuses.some((s) => s === "failed")) return "failed";
  if (statuses.some((s) => s === "bounced")) return "bounced";
  if (statuses.every((s) => s === "delivered")) return "delivered";
  if (statuses.some((s) => s === "sent" || s === "delivered")) return "sent";
  return "queued";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function CampaignList({ campaigns }: CampaignListProps) {
  if (campaigns.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-navy-200 bg-white p-12 text-center">
        <h3 className="text-lg font-medium text-navy-700">No campaigns yet</h3>
        <p className="mt-2 text-sm text-navy-400">
          Submit your first civic concern to get started.
        </p>
        <Link
          href="/submit"
          className="mt-4 inline-block rounded-md bg-navy-700 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800 transition-colors"
        >
          New Submission
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => {
        const overallStatus = deriveOverallStatus(campaign);
        const letterCount = campaign.letters.length;
        const issuePreview =
          campaign.submission?.issueDescription?.substring(0, 120) ?? "";

        return (
          <Link
            key={campaign.id}
            href={`/dashboard/campaigns/${campaign.id}`}
            className="block"
          >
            <Card className="border-navy-200 hover:border-navy-400 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-navy-800 truncate">
                      {issuePreview || "Untitled Campaign"}
                      {(campaign.submission?.issueDescription?.length ?? 0) >
                        120 && "..."}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-navy-400">
                      <span>{formatDate(campaign.createdAt)}</span>
                      <span>
                        {letterCount} {letterCount === 1 ? "letter" : "letters"}
                      </span>
                      <span className="capitalize">
                        {campaign.pricingTier} tier
                      </span>
                      {campaign.submission?.zipCode && (
                        <span>ZIP {campaign.submission.zipCode}</span>
                      )}
                    </div>
                  </div>
                  <DeliveryStatus status={overallStatus} />
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
