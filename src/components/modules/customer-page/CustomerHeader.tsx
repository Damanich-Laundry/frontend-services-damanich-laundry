"use client";

import React from 'react';
import { Box, Button } from '@mui/material';
import { Plus } from 'lucide-react';
import { SearchInput } from '@/components/shared';

interface CustomerHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddCustomer?: () => void;
}

export default function CustomerHeader({
  onSearchChange,
  onAddCustomer
}: CustomerHeaderProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Box sx={{ flex: 1 }}>
        <SearchInput 
          placeholder="Cari nama layanan..." 
          onSearch={onSearchChange}
        />
      </Box>
      <Button 
        variant="contained"
        startIcon={<Plus size={16} />}
        onClick={onAddCustomer}
        sx={{ 
          whiteSpace: 'nowrap',
          backgroundColor: '#6b7280',
          '&:hover': {
            backgroundColor: '#4b5563',
          }
        }}
      >
        Tambah Pelanggan Baru
      </Button>
    </Box>
  );
}

