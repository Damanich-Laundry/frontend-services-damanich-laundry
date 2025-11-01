"use client";

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ArrowLeft } from 'lucide-react';

interface EditOrderFormHeaderProps {
  onBack?: () => void;
}

export default function EditOrderFormHeader({ onBack }: EditOrderFormHeaderProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Edit Data Pesanan
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Perbarui data pesanan dan status pembayaran pelanggan
        </Typography>
      </Box>
      <Button
        variant="outlined"
        startIcon={<ArrowLeft size={16} />}
        onClick={onBack}
        sx={{
          borderColor: '#d1d5db',
          color: '#374151',
          '&:hover': {
            borderColor: '#9ca3af',
            backgroundColor: '#f9fafb'
          }
        }}
      >
        Kembali ke Daftar Pesanan
      </Button>
    </Box>
  );
}

