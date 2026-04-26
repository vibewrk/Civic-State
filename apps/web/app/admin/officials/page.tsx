"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface Official {
  id: string;
  name: string;
  title: string;
  email: string;
  jurisdiction: string;
  level: string;
  district: string;
  state: string;
  party: string;
  phone: string | null;
  bounceCount: number;
  optedOut: boolean;
  lastVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface OfficialsResponse {
  officials: Official[];
  total: number;
  page: number;
  totalPages: number;
}

export default function OfficialsPage() {
  const [data, setData] = useState<OfficialsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Official>>({});
  const [saving, setSaving] = useState(false);

  const fetchOfficials = useCallback(async (p: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_URL}/api/admin/officials?page=${p}&limit=25`,
        { credentials: "include" }
      );
      if (!res.ok) throw new Error("Failed to load officials");
      setData(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOfficials(page);
  }, [page, fetchOfficials]);

  function startEdit(official: Official) {
    setEditingId(official.id);
    setEditForm({
      name: official.name,
      title: official.title,
      email: official.email,
      phone: official.phone ?? "",
      optedOut: official.optedOut,
    });
  }

  async function handleSave(id: string) {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/officials/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Update failed");
      setEditingId(null);
      fetchOfficials(page);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  const levelColors: Record<string, string> = {
    federal: "bg-blue-100 text-blue-800",
    state: "bg-purple-100 text-purple-800",
    local: "bg-green-100 text-green-800",
  };

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
          <h1 className="text-3xl font-bold text-navy-800">Officials Directory</h1>
          <p className="mt-1 text-navy-500">
            Manage government officials, bounce rates, and opt-out status
          </p>
        </div>
        {data && (
          <p className="text-sm text-navy-400">
            {data.total} officials total
          </p>
        )}
      </div>

      {loading && !data ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-navy-400">Loading officials...</p>
        </div>
      ) : (
        <>
          <div className="mt-8 overflow-x-auto rounded-lg border border-navy-200">
            <table className="w-full text-sm">
              <thead className="bg-navy-100 text-navy-600">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Title</th>
                  <th className="px-4 py-3 text-left font-medium">Level</th>
                  <th className="px-4 py-3 text-left font-medium">Jurisdiction</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Bounces</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Verified</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {(data?.officials ?? []).length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-8 text-center text-navy-400"
                    >
                      No officials found
                    </td>
                  </tr>
                ) : (
                  data?.officials.map((o) => (
                    <tr key={o.id} className="hover:bg-navy-50">
                      <td className="px-4 py-3 font-medium text-navy-800">
                        {editingId === o.id ? (
                          <input
                            className="w-full rounded border border-navy-200 px-2 py-1 text-sm"
                            value={editForm.name ?? ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, name: e.target.value })
                            }
                          />
                        ) : (
                          o.name
                        )}
                      </td>
                      <td className="px-4 py-3 text-navy-600">
                        {editingId === o.id ? (
                          <input
                            className="w-full rounded border border-navy-200 px-2 py-1 text-sm"
                            value={editForm.title ?? ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, title: e.target.value })
                            }
                          />
                        ) : (
                          o.title
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            levelColors[o.level] ?? "bg-navy-100 text-navy-700"
                          }
                        >
                          {o.level}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-navy-600">
                        {o.jurisdiction}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-navy-500">
                        {editingId === o.id ? (
                          <input
                            className="w-full rounded border border-navy-200 px-2 py-1 text-sm"
                            value={editForm.email ?? ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, email: e.target.value })
                            }
                          />
                        ) : (
                          o.email
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`font-mono ${
                            o.bounceCount > 2
                              ? "text-destructive font-bold"
                              : "text-navy-600"
                          }`}
                        >
                          {o.bounceCount}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {editingId === o.id ? (
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={editForm.optedOut ?? false}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  optedOut: e.target.checked,
                                })
                              }
                            />
                            <span className="text-xs">Opted out</span>
                          </label>
                        ) : o.optedOut ? (
                          <Badge variant="destructive">Opted Out</Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-navy-400">
                        {o.lastVerifiedAt
                          ? new Date(o.lastVerifiedAt).toLocaleDateString()
                          : "Never"}
                      </td>
                      <td className="px-4 py-3">
                        {editingId === o.id ? (
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              className="bg-gold-500 text-navy-800 hover:bg-gold-400"
                              disabled={saving}
                              onClick={() => handleSave(o.id)}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingId(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEdit(o)}
                          >
                            Edit
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-navy-400">
                Page {data.page} of {data.totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page >= data.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
