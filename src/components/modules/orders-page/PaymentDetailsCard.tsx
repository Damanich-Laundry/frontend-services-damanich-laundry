"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Button
} from '@mui/material';
import { CreditCard, DollarSign, Calendar, FileText, RefreshCw } from 'lucide-react';

interface PaymentDetailsCardProps {
  paymentMethod?: string;
  paymentStatus?: string;
  totalPrice?: string;
  paymentDate?: string;
  transactionRef?: string;
  onPaymentMethodChange?: (method: string) => void;
  onPaymentStatusChange?: (status: string) => void;
  onPaymentDateChange?: (date: string) => void;
  onTransactionRefChange?: (ref: string) => void;
  onUpdatePayment?: () => void;
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

export default function PaymentDetailsCard({
  paymentMethod = '',
  paymentStatus = 'Belum Dibayar',
  totalPrice = 'Rp 0',
  paymentDate = '',
  transactionRef = '',
  onPaymentMethodChange,
  onPaymentStatusChange,
  onPaymentDateChange,
  onTransactionRefChange,
  onUpdatePayment
}: PaymentDetailsCardProps) {
  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <CreditCard size={20} style={{ color: '#6b7280' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Detail Pembayaran
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
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

          {/* Total Harga (Read-only) */}
          <TextField
            label="Total Harga"
            value={totalPrice}
            fullWidth
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DollarSign size={16} style={{ color: '#9ca3af' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#374151',
                backgroundColor: '#f3f4f6'
              }
            }}
          />

          {/* Tanggal Pembayaran */}
          <TextField
            label="Tanggal Pembayaran"
            type="date"
            value={paymentDate}
            onChange={(e) => onPaymentDateChange?.(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Calendar size={16} style={{ color: '#9ca3af' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Nomor Transaksi / Referensi */}
          <TextField
            label="Nomor Transaksi / Referensi"
            placeholder="Opsional"
            value={transactionRef}
            onChange={(e) => onTransactionRefChange?.(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FileText size={16} style={{ color: '#9ca3af' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Perbarui Pembayaran Button */}
          <Button
            variant="contained"
            startIcon={<RefreshCw size={16} />}
            onClick={onUpdatePayment}
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: '#6b7280',
              '&:hover': {
                backgroundColor: '#4b5563'
              }
            }}
          >
            Perbarui Pembayaran
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

