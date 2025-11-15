"use client";

import React, { useState, useImperativeHandle, forwardRef } from 'react';
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
import { Edit, Scale, Calendar, FileText, Check, X } from 'lucide-react';
import { Customer } from '@/datas/dummies';
import { Service } from '@/components/modules/services-page/types';

export interface EditOrderFormData {
  orderNumber: string;
  customerId: string;
  serviceId: string;
  weight: string;
  status: string;
  orderDate: string;
  estimatedCompletion: string;
  notes: string;
}

interface EditOrderFormProps {
  customers?: Customer[];
  services?: Service[];
  initialData?: Partial<EditOrderFormData>;
  onSubmit?: (data: EditOrderFormData) => void;
  onCancel?: () => void;
}

export interface EditOrderFormRef {
  submit: () => void;
}

const ORDER_STATUS_OPTIONS = [
  { value: 'Menunggu', label: 'Menunggu' },
  { value: 'Dalam Proses', label: 'Dalam Proses' },
  { value: 'Selesai', label: 'Selesai' },
  { value: 'Dibatalkan', label: 'Dibatalkan' }
];

const EditOrderForm = forwardRef<EditOrderFormRef, EditOrderFormProps>(({
  customers = [],
  services = [],
  initialData,
  onSubmit,
  onCancel
}, ref) => {
  const [formData, setFormData] = useState<EditOrderFormData>({
    orderNumber: initialData?.orderNumber || '',
    customerId: initialData?.customerId || '',
    serviceId: initialData?.serviceId || '',
    weight: initialData?.weight || '0',
    status: initialData?.status || 'Menunggu',
    orderDate: initialData?.orderDate || new Date().toISOString().split('T')[0],
    estimatedCompletion: initialData?.estimatedCompletion || '',
    notes: initialData?.notes || ''
  });

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    onSubmit?.(formData);
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      onSubmit?.(formData);
    }
  }));

  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Edit size={20} style={{ color: '#6b7280' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Edit Data Pesanan
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Nomor Pesanan (Read-only) */}
          <TextField
            label="Nomor Pesanan"
            value={formData.orderNumber}
            fullWidth
            disabled
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#374151',
                backgroundColor: '#f3f4f6'
              }
            }}
          />

          {/* Nama Pelanggan */}
          <FormControl fullWidth>
            <InputLabel>Nama Pelanggan</InputLabel>
            <Select
              value={formData.customerId}
              label="Nama Pelanggan"
              onChange={(e) => setFormData(prev => ({ ...prev, customerId: e.target.value }))}
            >
              {customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Layanan Dipilih */}
          <FormControl fullWidth>
            <InputLabel>Layanan Dipilih</InputLabel>
            <Select
              value={formData.serviceId}
              label="Layanan Dipilih"
              onChange={(e) => setFormData(prev => ({ ...prev, serviceId: e.target.value }))}
            >
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
            value={formData.weight}
            onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
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

          {/* Status Pesanan */}
          <FormControl fullWidth>
            <InputLabel>Status Pesanan</InputLabel>
            <Select
              value={formData.status}
              label="Status Pesanan"
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            >
              {ORDER_STATUS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Tanggal Pesanan */}
          <TextField
            label="Tanggal Pesanan"
            type="date"
            value={formData.orderDate}
            onChange={(e) => setFormData(prev => ({ ...prev, orderDate: e.target.value }))}
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

          {/* Estimasi Selesai */}
          <TextField
            label="Estimasi Selesai"
            type="date"
            value={formData.estimatedCompletion}
            onChange={(e) => setFormData(prev => ({ ...prev, estimatedCompletion: e.target.value }))}
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

          {/* Catatan Tambahan */}
          <TextField
            label="Catatan Tambahan"
            placeholder="Pakaian putih pisahkan dari yang berwarna"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
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

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
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
              type="submit"
              variant="contained"
              startIcon={<Check size={16} />}
              sx={{
                backgroundColor: '#6b7280',
                '&:hover': {
                  backgroundColor: '#4b5563'
                }
              }}
            >
              Simpan Perubahan
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});

EditOrderForm.displayName = 'EditOrderForm';

export default EditOrderForm;

