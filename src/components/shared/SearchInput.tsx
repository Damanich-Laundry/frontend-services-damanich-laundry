"use client";

import { TextField, InputAdornment } from '@mui/material';
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
    <TextField
      type="text"
      placeholder={placeholder}
      size="small"
      fullWidth
      className={className}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search size={16} style={{ color: '#9ca3af' }} />
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          fontSize: '0.875rem',
          '& fieldset': {
            borderColor: '#d1d5db',
          },
          '&:hover fieldset': {
            borderColor: '#9ca3af',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#3b82f6',
          },
        },
      }}
      onChange={(e) => onSearch?.(e.target.value)}
    />
  );
}
