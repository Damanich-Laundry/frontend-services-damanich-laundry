"use client";

import { Chip } from "@heroui/react";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
}

export default function StatusBadge({ 
  status, 
  variant = "default",
  size = "sm"
}: StatusBadgeProps) {
  const getStatusVariant = (status: string) => {
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes('selesai') || statusLower.includes('completed')) {
      return "success";
    }
    if (statusLower.includes('proses') || statusLower.includes('process')) {
      return "warning";
    }
    if (statusLower.includes('baru') || statusLower.includes('new')) {
      return "primary";
    }
    if (statusLower.includes('batal') || statusLower.includes('cancelled')) {
      return "danger";
    }
    
    return variant;
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes('selesai') || statusLower.includes('completed')) {
      return "bg-green-100 text-green-800";
    }
    if (statusLower.includes('proses') || statusLower.includes('process')) {
      return "bg-yellow-100 text-yellow-800";
    }
    if (statusLower.includes('baru') || statusLower.includes('new')) {
      return "bg-blue-100 text-blue-800";
    }
    if (statusLower.includes('batal') || statusLower.includes('cancelled')) {
      return "bg-red-100 text-red-800";
    }
    
    return "bg-gray-100 text-gray-800";
  };

  return (
    <Chip
      size={size}
      className={getStatusColor(status)}
      classNames={{
        base: "border-0",
        content: "font-medium"
      }}
    >
      {status}
    </Chip>
  );
}
