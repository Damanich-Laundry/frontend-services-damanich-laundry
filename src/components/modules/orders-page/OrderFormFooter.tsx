"use client";

import React from 'react';
import { Box, Button } from '@mui/material';
import { X, Save } from 'lucide-react';

interface OrderFormFooterProps {
  onCancel?: () => void;
  onSave?: () => void;
}

export default function OrderFormFooter({ onCancel, onSave }: OrderFormFooterProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
      <Button
        variant="outlined"
        startIcon={<X size={16} />}
        onClick={onCancel}
        sx={{
          borderColor: '#d1d5db',
          color: '#374151',
          '&:hover': {
            borderColor: '#9ca3af',
            backgroundColor: '#f9fafb'
          }
        }}
      >
        Batal
      </Button>
      <Button
        variant="contained"
        startIcon={<Save size={16} />}
        onClick={onSave}
        sx={{
          backgroundColor: '#6b7280',
          '&:hover': {
            backgroundColor: '#4b5563'
          }
        }}
      >
        Simpan Pesanan
      </Button>
    </Box>
  );
}

