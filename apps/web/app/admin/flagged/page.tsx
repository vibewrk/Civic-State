"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface FlaggedSubmission {
  id: string;
  userId: string;
  userEmail: string;
  issueDescription: string;
  desiredOutcome: string;
  zipCode: string;
  isAnonymous: boolean;
  status: string;
  flagReason: { tier?: string; reason?: string; confidence?: number } | null;
  aiDraft: string | null;
  createdAt: string;
}

export default function FlaggedPage() {
  const [submissions, setSubmissions] = useState<FlaggedSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editIssue, setEditIssue] = useState("");
  const [editOutcome, setEditOutcome] = useState("");

  const fetchFlagged = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/flagged`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load flagged submissions");
      const data = await res.json();
      setSubmissions(data.flagged);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlagged();
  }, [fetchFlagged]);

  async function handleApprove(id: string) {
    setActionLoading(id);
    try {
      const res = await fetch(`${API_URL}/api/admin/flagged/${id}/approve`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Approve failed");
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Approve failed");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleReject(id: string) {
    if (!rejectReason.trim()) return;
    setActionLoading(id);
    try {
      const res = await fetch(`${API_URL}/api/admin/flagged/${id}/reject`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rejectReason }),
      });
      if (!res.ok) throw new Error("Reject failed");
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      setRejectId(null);
      setRejectReason("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Reject failed");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleEdit(id: string) {
    setActionLoading(id);
    try {
      const body: Record<string, string> = {};
      if (editIssue.trim()) body.issueDescription = editIssue;
      if (editOutcome.trim()) body.desiredOutcome = editOutcome;

      const res = await fetch(`${API_URL}/api/admin/flagged/${id}/edit`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Edit failed");
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      setEditId(null);
      setEditIssue("");
      setEditOutcome("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Edit failed");
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-navy-400">Loading flagged submissions...</p>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-800">Flagged Submissions</h1>
          <p className="mt-1 text-navy-500">
            Review content flagged by the moderation pipeline
          </p>
        </div>
        <Badge variant={submissions.length > 0 ? "destructive" : "secondary"}>
          {submissions.length} pending
        </Badge>
      </div>

      {submissions.length === 0 ? (
        <Card className="mt-8 border-navy-200">
          <CardContent className="flex items-center justify-center py-16">
            <p className="text-navy-400">No flagged submissions. All clear.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8 space-y-6">
          {submissions.map((s) => (
            <Card key={s.id} className="border-navy-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-navy-800">
                      Submission {s.id.slice(0, 8)}...
                    </CardTitle>
                    <p className="mt-1 text-xs text-navy-400">
                      {s.userEmail} | ZIP: {s.zipCode} |{" "}
                      {new Date(s.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {s.flagReason && (
                    <Badge variant="destructive" className="ml-4 shrink-0">
                      {s.flagReason.reason ?? "Flagged"}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* User text */}
                <div>
                  <p className="text-xs font-semibold uppercase text-navy-500">
                    Issue Description
                  </p>
                  <p className="mt-1 rounded bg-navy-50 p-3 text-sm text-navy-700">
                    {s.issueDescription}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-navy-500">
                    Desired Outcome
                  </p>
                  <p className="mt-1 rounded bg-navy-50 p-3 text-sm text-navy-700">
                    {s.desiredOutcome}
                  </p>
                </div>

                {/* AI Draft (if available) */}
                {s.aiDraft && (
                  <div>
                    <p className="text-xs font-semibold uppercase text-navy-500">
                      AI Draft
                    </p>
                    <p className="mt-1 whitespace-pre-wrap rounded bg-gold-50 p-3 text-sm text-navy-700">
                      {s.aiDraft}
                    </p>
                  </div>
                )}

                {/* Flag details */}
                {s.flagReason && (
                  <div className="rounded border border-navy-200 bg-navy-50 p-3">
                    <p className="text-xs font-semibold uppercase text-navy-500">
                      Flag Details
                    </p>
                    <p className="mt-1 text-sm text-navy-600">
                      Tier: {s.flagReason.tier} | Confidence:{" "}
                      {s.flagReason.confidence != null
                        ? `${(s.flagReason.confidence * 100).toFixed(0)}%`
                        : "N/A"}
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 border-t border-navy-100 pt-4">
                  <Button
                    size="sm"
                    className="bg-green-600 text-white hover:bg-green-700"
                    disabled={actionLoading === s.id}
                    onClick={() => handleApprove(s.id)}
                  >
                    {actionLoading === s.id ? "Processing..." : "Approve"}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={actionLoading === s.id}
                    onClick={() => {
                      setRejectId(rejectId === s.id ? null : s.id);
                      setEditId(null);
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={actionLoading === s.id}
                    onClick={() => {
                      setEditId(editId === s.id ? null : s.id);
                      setEditIssue(s.issueDescription);
                      setEditOutcome(s.desiredOutcome);
                      setRejectId(null);
                    }}
                  >
                    Edit & Approve
                  </Button>
                </div>

                {/* Reject form */}
                {rejectId === s.id && (
                  <div className="space-y-2 rounded border border-destructive/30 bg-destructive/5 p-4">
                    <label className="text-sm font-medium text-navy-700">
                      Rejection reason
                    </label>
                    <textarea
                      className="w-full rounded border border-navy-200 p-2 text-sm"
                      rows={3}
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Why is this submission being rejected?"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={!rejectReason.trim() || actionLoading === s.id}
                        onClick={() => handleReject(s.id)}
                      >
                        Confirm Reject
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setRejectId(null);
                          setRejectReason("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Edit form */}
                {editId === s.id && (
                  <div className="space-y-3 rounded border border-gold-300 bg-gold-50 p-4">
                    <div>
                      <label className="text-sm font-medium text-navy-700">
                        Issue Description
                      </label>
                      <textarea
                        className="mt-1 w-full rounded border border-navy-200 p-2 text-sm"
                        rows={4}
                        value={editIssue}
                        onChange={(e) => setEditIssue(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-navy-700">
                        Desired Outcome
                      </label>
                      <textarea
                        className="mt-1 w-full rounded border border-navy-200 p-2 text-sm"
                        rows={3}
                        value={editOutcome}
                        onChange={(e) => setEditOutcome(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-gold-500 text-navy-800 hover:bg-gold-400"
                        disabled={actionLoading === s.id}
                        onClick={() => handleEdit(s.id)}
                      >
                        Save & Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditId(null);
                          setEditIssue("");
                          setEditOutcome("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
