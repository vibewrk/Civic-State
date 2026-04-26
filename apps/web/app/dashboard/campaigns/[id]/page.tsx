"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CampaignDetail } from "@/components/dashboard/campaign-detail";
import { getCampaign } from "@/lib/api";
import type { Campaign } from "@/lib/api";

export default function CampaignDetailPage() {
  const params = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;

    async function fetchCampaign() {
      try {
        const data = await getCampaign(params.id);
        setCampaign(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load campaign"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCampaign();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-navy-400">Loading campaign...</p>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
        <p className="text-destructive font-medium">
          {error ?? "Campaign not found"}
        </p>
        <p className="mt-1 text-sm text-navy-500">
          The campaign may not exist or you may not have access.
        </p>
      </div>
    );
  }

  return <CampaignDetail campaign={campaign} />;
}
