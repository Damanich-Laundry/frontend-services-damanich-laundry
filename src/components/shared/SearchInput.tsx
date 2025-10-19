"use client";

import { Input } from "@heroui/react";
import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  onSearch?: (value: string) => void;
}

export default function SearchInput({ 
  placeholder = "Search...", 
  className = "",
  onSearch 
}: SearchInputProps) {
  return (
    <Input
      type="text"
      placeholder={placeholder}
      startContent={<Search className="w-4 h-4 text-gray-400" />}
      className={className}
      classNames={{
        input: "text-sm",
        inputWrapper: "border border-gray-300 hover:border-gray-400 focus-within:border-blue-500"
      }}
      onChange={(e) => onSearch?.(e.target.value)}
    />
  );
}
