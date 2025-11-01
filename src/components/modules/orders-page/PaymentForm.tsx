"use client";

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { CreditCard, DollarSign } from 'lucide-react';

interface PaymentFormProps {
  totalPrice?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  autoPrint?: boolean;
  onTotalPriceChange?: (price: string) => void;
  onPaymentMethodChange?: (method: string) => void;
  onPaymentStatusChange?: (status: string) => void;
  onAutoPrintChange?: (checked: boolean) => void;
}

const PAYMENT_METHOD_OPTIONS = [
  { value: 'tunai', label: 'Tunai' },
  { value: 'transfer', label: 'Transfer Bank' },
  { value: 'debit', label: 'Kartu Debit' },
  { value: 'kredit', label: 'Kartu Kredit' }
];

const PAYMENT_STATUS_OPTIONS = [
  { value: 'Belum Dibayar', label: 'Belum Dibayar' },
  { value: 'Sudah Dibayar', label: 'Sudah Dibayar' },
  { value: 'Sebagian', label: 'Sebagian Dibayar' }
];

export default function PaymentForm({
  totalPrice = 'Rp 0',
  paymentMethod = '',
  paymentStatus = 'Belum Dibayar',
  autoPrint = false,
  onTotalPriceChange,
  onPaymentMethodChange,
  onPaymentStatusChange,
  onAutoPrintChange
}: PaymentFormProps) {
  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <CreditCard size={20} style={{ color: '#6b7280' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Pembayaran
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Total Harga */}
          <TextField
            label="Total Harga"
            value={totalPrice}
            onChange={(e) => onTotalPriceChange?.(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DollarSign size={16} style={{ color: '#9ca3af' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Metode Pembayaran */}
          <FormControl fullWidth>
            <InputLabel>Metode Pembayaran</InputLabel>
            <Select
              value={paymentMethod}
              label="Metode Pembayaran"
              onChange={(e) => onPaymentMethodChange?.(e.target.value)}
            >
              <MenuItem value="">
                <em>-- Pilih Metode --</em>
              </MenuItem>
              {PAYMENT_METHOD_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Status Pembayaran */}
          <FormControl fullWidth>
            <InputLabel>Status Pembayaran</InputLabel>
            <Select
              value={paymentStatus}
              label="Status Pembayaran"
              onChange={(e) => onPaymentStatusChange?.(e.target.value)}
            >
              {PAYMENT_STATUS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Cetak Nota Otomatis */}
          <FormControlLabel
            control={
              <Checkbox
                checked={autoPrint}
                onChange={(e) => onAutoPrintChange?.(e.target.checked)}
              />
            }
            label="Cetak Nota Otomatis"
          />
        </Box>
      </CardContent>
    </Card>
  );
}

