"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface DashboardData {
  flaggedCount: number;
  todayRevenue: number;
  todayCosts: number;
  todayNet: number;
  allTimeBalance: number;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const [flaggedRes, treasuryRes] = await Promise.all([
          fetch(`${API_URL}/api/admin/flagged`, { credentials: "include" }),
          fetch(`${API_URL}/api/admin/treasury`, { credentials: "include" }),
        ]);

        if (!flaggedRes.ok || !treasuryRes.ok) {
          throw new Error("Failed to load dashboard data");
        }

        const flaggedData = await flaggedRes.json();
        const treasuryData = await treasuryRes.json();

        setData({
          flaggedCount: flaggedData.count ?? 0,
          todayRevenue: treasuryData.today?.revenue ?? 0,
          todayCosts: treasuryData.today?.costs ?? 0,
          todayNet: treasuryData.today?.net ?? 0,
          allTimeBalance: treasuryData.allTime?.balance ?? 0,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-navy-400">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
        <p className="text-destructive font-medium">Error: {error}</p>
        <p className="mt-1 text-sm text-navy-500">
          Make sure the API is running and you have admin access.
        </p>
      </div>
    );
  }

  const formatCents = (cents: number) =>
    `$${(cents / 100).toFixed(2)}`;

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy-800">Admin Dashboard</h1>
      <p className="mt-1 text-navy-500">Overview of platform operations</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Flagged Count */}
        <Card className="border-navy-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-500">
              Flagged Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-3xl font-bold ${(data?.flaggedCount ?? 0) > 0 ? "text-destructive" : "text-navy-800"}`}>
              {data?.flaggedCount ?? 0}
            </p>
            <p className="mt-1 text-xs text-navy-400">Awaiting review</p>
          </CardContent>
        </Card>

        {/* Today Revenue */}
        <Card className="border-navy-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-500">
              Today&apos;s Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-navy-800">
              {formatCents(data?.todayRevenue ?? 0)}
            </p>
            <p className="mt-1 text-xs text-navy-400">
              Costs: {formatCents(data?.todayCosts ?? 0)}
            </p>
          </CardContent>
        </Card>

        {/* Today Net */}
        <Card className="border-navy-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-500">
              Today&apos;s Net
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-3xl font-bold ${(data?.todayNet ?? 0) >= 0 ? "text-green-600" : "text-destructive"}`}>
              {formatCents(data?.todayNet ?? 0)}
            </p>
            <p className="mt-1 text-xs text-navy-400">Revenue minus costs</p>
          </CardContent>
        </Card>

        {/* All-time Balance */}
        <Card className="border-navy-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-500">
              All-Time Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-3xl font-bold ${(data?.allTimeBalance ?? 0) >= 0 ? "text-green-600" : "text-destructive"}`}>
              {formatCents(data?.allTimeBalance ?? 0)}
            </p>
            <p className="mt-1 text-xs text-navy-400">Cumulative P&L</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
