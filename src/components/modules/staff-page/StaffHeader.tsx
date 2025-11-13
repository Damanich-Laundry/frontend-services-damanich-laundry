"use client";

import React from 'react';
import { Box, Button } from '@mui/material';
import { Plus } from 'lucide-react';
import { SearchInput } from '@/components/shared';

interface StaffHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddStaff?: () => void;
}

export default function StaffHeader({
  searchQuery,
  onSearchChange,
  onAddStaff
}: StaffHeaderProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Box sx={{ flex: 1 }}>
        <SearchInput 
          placeholder="Cari nama staff..." 
          onSearch={onSearchChange}
        />
      </Box>
      <Button 
        variant="contained"
        startIcon={<Plus size={16} />}
        onClick={onAddStaff}
        sx={{ 
          whiteSpace: 'nowrap',
          backgroundColor: '#6b7280',
          '&:hover': {
            backgroundColor: '#4b5563',
          }
        }}
      >
        Tambah Staff Baru
      </Button>
    </Box>
  );
}

