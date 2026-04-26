"use client";

import { useEffect, useState } from "react";
import { CampaignList } from "@/components/dashboard/campaign-list";
import { getCampaigns } from "@/lib/api";
import type { Campaign } from "@/lib/api";

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const data = await getCampaigns();
        setCampaigns(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load campaigns"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-navy-400">Loading your campaigns...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
        <p className="text-destructive font-medium">Error: {error}</p>
        <p className="mt-1 text-sm text-navy-500">
          Please try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-800">My Campaigns</h1>
          <p className="mt-1 text-navy-500">
            Track your submissions and delivery status
          </p>
        </div>
        <span className="text-sm text-navy-400">
          {campaigns.length} {campaigns.length === 1 ? "campaign" : "campaigns"}
        </span>
      </div>
      <div className="mt-8">
        <CampaignList campaigns={campaigns} />
      </div>
    </div>
  );
}
