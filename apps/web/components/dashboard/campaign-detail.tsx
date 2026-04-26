"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeliveryStatus } from "./delivery-status";
import { toggleAnonymity } from "@/lib/api";
import type { Campaign } from "@/lib/api";

interface CampaignDetailProps {
  campaign: Campaign;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "--";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function CampaignDetail({ campaign: initial }: CampaignDetailProps) {
  const [campaign, setCampaign] = useState(initial);
  const [togglingAnonymity, setTogglingAnonymity] = useState(false);

  const canToggleAnonymity =
    campaign.status !== "delivering" && campaign.status !== "delivered";

  async function handleToggleAnonymity() {
    setTogglingAnonymity(true);
    try {
      const result = await toggleAnonymity(campaign.id);
      setCampaign((prev) => ({
        ...prev,
        submission: {
          ...prev.submission,
          isAnonymous: result.isAnonymous,
        },
      }));
    } catch (err) {
      console.error("Failed to toggle anonymity:", err);
    } finally {
      setTogglingAnonymity(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center text-sm text-navy-500 hover:text-navy-700 transition-colors"
      >
        &larr; Back to campaigns
      </Link>

      {/* Campaign overview */}
      <Card className="border-navy-200">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-lg text-navy-800">
                Campaign Details
              </CardTitle>
              <p className="mt-1 text-xs text-navy-400">
                Created {formatDate(campaign.createdAt)}
              </p>
            </div>
            <DeliveryStatus status={campaign.status} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-navy-400">
              Issue
            </h4>
            <p className="mt-1 text-sm text-navy-700">
              {campaign.submission?.issueDescription ?? "No description"}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-navy-400">
              Desired Outcome
            </h4>
            <p className="mt-1 text-sm text-navy-700">
              {campaign.submission?.desiredOutcome ?? "--"}
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-navy-400">ZIP Code: </span>
              <span className="font-medium text-navy-700">
                {campaign.submission?.zipCode ?? "--"}
              </span>
            </div>
            <div>
              <span className="text-navy-400">Tier: </span>
              <span className="font-medium capitalize text-navy-700">
                {campaign.pricingTier}
              </span>
            </div>
            <div>
              <span className="text-navy-400">Letters: </span>
              <span className="font-medium text-navy-700">
                {campaign.letters.length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anonymity toggle (DASH-05) */}
      <Card className="border-navy-200">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-medium text-navy-700">
              Anonymous submission
            </p>
            <p className="text-xs text-navy-400">
              {campaign.submission?.isAnonymous
                ? "Your name is hidden from officials"
                : "Your name is visible to officials"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={!canToggleAnonymity || togglingAnonymity}
            onClick={handleToggleAnonymity}
            className="border-navy-200 text-navy-600"
          >
            {togglingAnonymity
              ? "Updating..."
              : campaign.submission?.isAnonymous
                ? "Show My Name"
                : "Go Anonymous"}
          </Button>
        </CardContent>
      </Card>

      {/* Letters with delivery tracking (DASH-02) */}
      <div>
        <h3 className="text-lg font-semibold text-navy-800 mb-4">Letters</h3>
        <div className="space-y-3">
          {campaign.letters.map((letter) => {
            const delivery = letter.delivery;
            const deliveryStatus = delivery?.status ?? letter.status ?? "queued";

            return (
              <Card key={letter.id} className="border-navy-200">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-navy-800">
                        {letter.official.name}
                      </p>
                      <p className="text-xs text-navy-500">
                        {letter.official.title}
                        {letter.official.jurisdiction &&
                          ` - ${letter.official.jurisdiction}`}
                      </p>
                      {letter.official.email && (
                        <p className="text-xs text-navy-400 mt-0.5">
                          {letter.official.email}
                        </p>
                      )}
                      {/* Delivery timestamps */}
                      {delivery && (
                        <div className="mt-2 text-xs text-navy-400 space-y-0.5">
                          {delivery.sentAt && (
                            <p>Sent: {formatDate(delivery.sentAt)}</p>
                          )}
                          {delivery.deliveredAt && (
                            <p>Delivered: {formatDate(delivery.deliveredAt)}</p>
                          )}
                          {delivery.bouncedAt && (
                            <p>
                              Bounced: {formatDate(delivery.bouncedAt)}
                              {delivery.bounceType &&
                                ` (${delivery.bounceType})`}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <DeliveryStatus status={deliveryStatus} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {campaign.letters.length === 0 && (
            <p className="text-sm text-navy-400 text-center py-4">
              No letters generated yet.
            </p>
          )}
        </div>
      </div>

      {/* Payments */}
      {campaign.payments && campaign.payments.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-navy-800 mb-4">
            Payments
          </h3>
          <div className="space-y-2">
            {campaign.payments.map((payment) => (
              <Card key={payment.id} className="border-navy-200">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="text-sm">
                    <span className="font-medium text-navy-700">
                      ${(payment.amount / 100).toFixed(2)}{" "}
                      {payment.currency.toUpperCase()}
                    </span>
                    <span className="ml-2 text-navy-400">
                      {formatDate(payment.createdAt)}
                    </span>
                  </div>
                  <DeliveryStatus status={payment.status} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
