"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type DeliveryStatusType =
  | "queued"
  | "sent"
  | "delivered"
  | "bounced"
  | "failed"
  | "draft"
  | "pending";

const STATUS_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  queued: {
    label: "Queued",
    className: "bg-gray-100 text-gray-700 border-gray-200",
  },
  draft: {
    label: "Draft",
    className: "bg-gray-100 text-gray-700 border-gray-200",
  },
  pending: {
    label: "Pending",
    className: "bg-gray-100 text-gray-700 border-gray-200",
  },
  sent: {
    label: "Sent",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  bounced: {
    label: "Bounced",
    className: "bg-red-100 text-red-700 border-red-200",
  },
  failed: {
    label: "Failed",
    className: "bg-red-100 text-red-700 border-red-200",
  },
};

interface DeliveryStatusProps {
  status: string;
  className?: string;
}

export function DeliveryStatus({ status, className }: DeliveryStatusProps) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <Badge
      variant="outline"
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
