"use client";

import React from 'react';
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
  InputAdornment
} from '@mui/material';
import { List, Scale, Calendar, FileText } from 'lucide-react';
import { Service } from '@/components/modules/services-page/types';

interface OrderDetailsFormProps {
  services: Service[];
  selectedServiceId?: string;
  weight?: string;
  orderDate?: string;
  status?: string;
  notes?: string;
  onServiceChange?: (serviceId: string) => void;
  onWeightChange?: (weight: string) => void;
  onOrderDateChange?: (date: string) => void;
  onStatusChange?: (status: string) => void;
  onNotesChange?: (notes: string) => void;
}

const ORDER_STATUS_OPTIONS = [
  { value: 'Menunggu', label: 'Menunggu' },
  { value: 'Dalam Proses', label: 'Dalam Proses' },
  { value: 'Selesai', label: 'Selesai' },
  { value: 'Dibatalkan', label: 'Dibatalkan' }
];

export default function OrderDetailsForm({
  services,
  selectedServiceId,
  weight = '0',
  orderDate = new Date().toISOString().split('T')[0],
  status = 'Menunggu',
  notes = '',
  onServiceChange,
  onWeightChange,
  onOrderDateChange,
  onStatusChange,
  onNotesChange
}: OrderDetailsFormProps) {
  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <List size={20} style={{ color: '#6b7280' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Detail Pesanan
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Jenis Layanan */}
          <FormControl fullWidth>
            <InputLabel>Jenis Layanan</InputLabel>
            <Select
              value={selectedServiceId || ''}
              label="Jenis Layanan"
              onChange={(e) => onServiceChange?.(e.target.value)}
            >
              <MenuItem value="">
                <em>-- Pilih Layanan --</em>
              </MenuItem>
              {services.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  {service.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Berat Cucian */}
          <TextField
            label="Berat Cucian (kg)"
            type="number"
            value={weight}
            onChange={(e) => onWeightChange?.(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Scale size={16} style={{ color: '#9ca3af' }} />
                </InputAdornment>
              ),
              inputProps: { min: 0, step: 0.1 }
            }}
          />

          {/* Tanggal Order */}
          <TextField
            label="Tanggal Order"
            type="date"
            value={orderDate}
            onChange={(e) => onOrderDateChange?.(e.target.value)}
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

          {/* Status Pesanan */}
          <FormControl fullWidth>
            <InputLabel>Status Pesanan</InputLabel>
            <Select
              value={status}
              label="Status Pesanan"
              onChange={(e) => onStatusChange?.(e.target.value)}
            >
              {ORDER_STATUS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Catatan Tambahan */}
          <TextField
            label="Catatan Tambahan"
            placeholder="Tambahkan catatan khusus..."
            value={notes}
            onChange={(e) => onNotesChange?.(e.target.value)}
            fullWidth
            multiline
            rows={4}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ alignSelf: 'flex-start', pt: 1 }}>
                  <FileText size={16} style={{ color: '#9ca3af' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

