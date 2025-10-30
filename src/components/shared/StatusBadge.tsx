"use client";

import { Chip } from '@mui/material';

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
}

export default function StatusBadge({ 
  status, 
  size = "sm"
}: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
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
      return "error";
    }
    
    return "default";
  };

  const getSize = (size: string) => {
    switch (size) {
      case "sm": return "small";
      case "md": return "medium";
      case "lg": return "medium";
      default: return "small";
    }
  };

  return (
    <Chip
      label={status}
      size={getSize(size) as "small" | "medium"}
      color={getStatusColor(status) as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"}
      sx={{
        fontWeight: 500,
        border: 'none',
      }}
    />
  );
}
