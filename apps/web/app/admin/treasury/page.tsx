"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface LedgerEntry {
  id: string;
  type: string;
  amount: number;
  currency: string;
  reference: string;
  description: string;
  createdAt: string;
}

interface TreasuryData {
  today: { revenue: number; costs: number; net: number };
  allTime: { revenue: number; costs: number; balance: number };
  recentEntries: LedgerEntry[];
}

export default function TreasuryPage() {
  const [data, setData] = useState<TreasuryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTreasury() {
      try {
        const res = await fetch(`${API_URL}/api/admin/treasury`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load treasury data");
        setData(await res.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchTreasury();
  }, []);

  const formatCents = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  const typeColors: Record<string, string> = {
    payment_received: "bg-green-100 text-green-800",
    ai_cost: "bg-blue-100 text-blue-800",
    delivery_cost: "bg-purple-100 text-purple-800",
    platform_fee: "bg-navy-100 text-navy-800",
    refund: "bg-destructive/10 text-destructive",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-navy-400">Loading treasury...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
        <p className="text-destructive font-medium">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy-800">Treasury</h1>
      <p className="mt-1 text-navy-500">Revenue, costs, and ledger overview</p>

      {/* Summary cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-navy-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-500">
              Today&apos;s Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-navy-800">
              {formatCents(data?.today.revenue ?? 0)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-navy-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-500">
              Today&apos;s Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-navy-800">
              {formatCents(data?.today.costs ?? 0)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-navy-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-500">
              Today&apos;s Net
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-3xl font-bold ${
                (data?.today.net ?? 0) >= 0
                  ? "text-green-600"
                  : "text-destructive"
              }`}
            >
              {formatCents(data?.today.net ?? 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* All-time summary */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="border-gold-300 bg-gold-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">
              All-Time Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-navy-800">
              {formatCents(data?.allTime.revenue ?? 0)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-gold-300 bg-gold-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">
              All-Time Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-navy-800">
              {formatCents(data?.allTime.costs ?? 0)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-gold-300 bg-gold-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">
              All-Time Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-2xl font-bold ${
                (data?.allTime.balance ?? 0) >= 0
                  ? "text-green-600"
                  : "text-destructive"
              }`}
            >
              {formatCents(data?.allTime.balance ?? 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent ledger entries */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-navy-800">
          Recent Ledger Entries
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-navy-200">
          <table className="w-full text-sm">
            <thead className="bg-navy-100 text-navy-600">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Amount</th>
                <th className="px-4 py-3 text-left font-medium">Reference</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {(data?.recentEntries ?? []).length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-navy-400"
                  >
                    No ledger entries yet
                  </td>
                </tr>
              ) : (
                data?.recentEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-navy-50">
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          typeColors[entry.type] ??
                          "bg-navy-100 text-navy-700"
                        }
                      >
                        {entry.type.replace(/_/g, " ")}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-mono">
                      {entry.type === "payment_received"
                        ? `+${formatCents(entry.amount)}`
                        : `-${formatCents(entry.amount)}`}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-navy-500">
                      {entry.reference.slice(0, 16)}...
                    </td>
                    <td className="px-4 py-3 text-navy-600">
                      {entry.description}
                    </td>
                    <td className="px-4 py-3 text-navy-400">
                      {new Date(entry.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
