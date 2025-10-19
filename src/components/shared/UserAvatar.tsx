"use client";

import { Avatar } from "@heroui/react";

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

  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-12 h-12 text-base"
  };

  return (
    <Avatar
      src={src}
      name={getInitials(name)}
      size={size}
      className={`${sizeClasses[size]} ${className}`}
      classNames={{
        base: "bg-gray-200 text-gray-700",
        name: "font-medium"
      }}
    />
  );
}
