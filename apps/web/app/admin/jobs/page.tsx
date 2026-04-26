"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function JobsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-navy-800">Job Queue Monitor</h1>
      <p className="mt-1 text-navy-500">
        Monitor and manage background job queues via Bull Board
      </p>

      <Card className="mt-8 border-navy-200">
        <CardHeader>
          <CardTitle className="text-lg text-navy-800">Bull Board Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-navy-600">
            The Bull Board UI provides real-time monitoring of all job queues:
            classifier, researcher, drafter, delivery, treasury, and reconciliation.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {["classifier", "researcher", "drafter", "delivery", "treasury", "reconciliation"].map(
              (queue) => (
                <div
                  key={queue}
                  className="rounded-lg border border-navy-200 bg-navy-50 p-3 text-center"
                >
                  <p className="text-sm font-semibold capitalize text-navy-700">
                    {queue}
                  </p>
                </div>
              )
            )}
          </div>
          <Button
            asChild
            className="bg-gold-500 text-navy-800 hover:bg-gold-400 font-semibold"
          >
            <a
              href={`${API_URL}/api/admin/queues`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Bull Board
            </a>
          </Button>
          <p className="text-xs text-navy-400">
            Opens in a new tab. Requires admin authentication on the API server.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
