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
    
    // Check for inactive/non-active first to avoid matching "aktif" in "non-aktif"
    if (statusLower.includes('batal') || statusLower.includes('cancelled') || statusLower.includes('nonaktif') || statusLower.includes('non-aktif') || statusLower.includes('inactive')) {
      return "error";
    }
    if (statusLower.includes('selesai') || statusLower.includes('completed') || statusLower.includes('aktif') || statusLower.includes('active')) {
      return "success";
    }
    if (statusLower.includes('proses') || statusLower.includes('process')) {
      return "warning";
    }
    if (statusLower.includes('baru') || statusLower.includes('new')) {
      return "primary";
    }
    if (statusLower.includes('menunggu') || statusLower.includes('pending') || statusLower.includes('waiting')) {
      return "info";
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
