"use client";

import { Avatar } from '@mui/material';

interface UserAvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function UserAvatar({ 
  name, 
  src, 
  size = "md",
  className = ""
}: UserAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getSize = (size: string) => {
    switch (size) {
      case "sm": return 24;
      case "md": return 32;
      case "lg": return 48;
      default: return 32;
    }
  };

  return (
    <Avatar
      src={src}
      sx={{
        width: getSize(size),
        height: getSize(size),
        backgroundColor: '#e5e7eb',
        color: '#374151',
        fontSize: size === 'sm' ? '0.75rem' : size === 'lg' ? '1rem' : '0.875rem',
        fontWeight: 500,
      }}
      className={className}
    >
      {getInitials(name)}
    </Avatar>
  );
}
