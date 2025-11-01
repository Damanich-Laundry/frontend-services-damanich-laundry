"use client";

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Typography
} from '@mui/material';
import { X, Plus, Check } from 'lucide-react';
import { Service } from './types';

interface ServiceFormProps {
  initialData?: Partial<Service> & { isPopular?: boolean };
  onSubmit?: (data: Omit<Service, 'id'> & { isPopular?: boolean }) => void;
  onCancel?: () => void;
  isEditMode?: boolean;
  onFormChange?: (data: Partial<Service> & { isPopular?: boolean }) => void;
}

const TIME_UNITS = [
  { value: 'Hari', label: 'Hari' },
  { value: 'Jam', label: 'Jam' }
];

const STATUS_OPTIONS = [
  { value: 'Aktif', label: 'Aktif' },
  { value: 'Nonaktif', label: 'Nonaktif' }
];

export default function ServiceForm({
  initialData,
  onSubmit,
  onCancel,
  isEditMode = false,
  onFormChange
}: ServiceFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    estimatedTimeValue: initialData?.estimatedTime 
      ? parseInt(initialData.estimatedTime.split(' ')[0]) || 2
      : 2,
    estimatedTimeUnit: initialData?.estimatedTime 
      ? initialData.estimatedTime.split(' ')[1] || 'Hari'
      : 'Hari',
    pricePerKg: initialData?.pricePerKg 
      ? initialData.pricePerKg.replace('Rp ', '').replace(/\./g, '') || ''
      : '',
    status: initialData?.status || 'Aktif',
    isPopular: initialData?.isPopular || false
  });

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: string } }
  ) => {
    const newFormData = {
      ...formData,
      [field]: e.target.value
    };
    setFormData(newFormData);
    
    // Emit changes for live preview
    if (onFormChange) {
      const previewData: Partial<Service> & { isPopular?: boolean } = {
        name: newFormData.name,
        description: newFormData.description,
        estimatedTime: `${newFormData.estimatedTimeValue} ${newFormData.estimatedTimeUnit}`,
        pricePerKg: `Rp ${parseInt(newFormData.pricePerKg.replace(/\D/g, '') || '0').toLocaleString('id-ID')}`,
        status: newFormData.status as 'Aktif' | 'Nonaktif',
        isPopular: newFormData.isPopular
      };
      onFormChange(previewData);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = {
      ...formData,
      isPopular: e.target.checked
    };
    setFormData(newFormData);
    
    // Emit changes for live preview
    if (onFormChange) {
      const previewData: Partial<Service> & { isPopular?: boolean } = {
        name: newFormData.name,
        description: newFormData.description,
        estimatedTime: `${newFormData.estimatedTimeValue} ${newFormData.estimatedTimeUnit}`,
        pricePerKg: `Rp ${parseInt(newFormData.pricePerKg.replace(/\D/g, '') || '0').toLocaleString('id-ID')}`,
        status: newFormData.status as 'Aktif' | 'Nonaktif',
        isPopular: newFormData.isPopular
      };
      onFormChange(previewData);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean price input - remove any non-digit characters
    const priceValue = formData.pricePerKg.replace(/\D/g, '') || '0';
    const priceNumber = parseInt(priceValue);
    
    const serviceData: Omit<Service, 'id'> & { isPopular?: boolean } = {
      name: formData.name,
      description: formData.description,
      estimatedTime: `${formData.estimatedTimeValue} ${formData.estimatedTimeUnit}`,
      pricePerKg: `Rp ${priceNumber.toLocaleString('id-ID')}`,
      status: formData.status as 'Aktif' | 'Nonaktif',
      isPopular: formData.isPopular
    };

    onSubmit?.(serviceData);
  };

  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {isEditMode ? 'Form Edit Layanan' : 'Form Tambah Layanan'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isEditMode ? 'Perbarui data layanan yang sudah ada' : 'Lengkapi informasi layanan laundry baru'}
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Nama Layanan */}
          <TextField
            label="Nama Layanan"
            placeholder="Contoh: Cuci Kering, Cuci Setrika, Express 1 Hari"
            value={formData.name}
            onChange={handleChange('name')}
            fullWidth
            required
            variant="outlined"
          />

          {/* Deskripsi Singkat */}
          <TextField
            label="Deskripsi Singkat"
            placeholder="Contoh: Cuci dan keringkan pakaian standar"
            value={formData.description}
            onChange={handleChange('description')}
            fullWidth
            multiline
            rows={4}
            required
            variant="outlined"
          />

          {/* Estimasi Waktu */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Estimasi Waktu"
              type="number"
              value={formData.estimatedTimeValue}
              onChange={(e) => {
                const newFormData = {
                  ...formData,
                  estimatedTimeValue: parseInt(e.target.value) || 0
                };
                setFormData(newFormData);
                
                // Emit changes for live preview
                if (onFormChange) {
                  const previewData: Partial<Service> & { isPopular?: boolean } = {
                    name: newFormData.name,
                    description: newFormData.description,
                    estimatedTime: `${newFormData.estimatedTimeValue} ${newFormData.estimatedTimeUnit}`,
                    pricePerKg: `Rp ${parseInt(newFormData.pricePerKg.replace(/\D/g, '') || '0').toLocaleString('id-ID')}`,
                    status: newFormData.status as 'Aktif' | 'Nonaktif',
                    isPopular: newFormData.isPopular
                  };
                  onFormChange(previewData);
                }
              }}
              required
              sx={{ flex: 1 }}
              inputProps={{ min: 1 }}
              variant="outlined"
            />
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Satuan Waktu</InputLabel>
              <Select
                value={formData.estimatedTimeUnit}
                label="Satuan Waktu"
                onChange={(e) => {
                  const newFormData = {
                    ...formData,
                    estimatedTimeUnit: e.target.value
                  };
                  setFormData(newFormData);
                  
                  // Emit changes for live preview
                  if (onFormChange) {
                    const previewData: Partial<Service> & { isPopular?: boolean } = {
                      name: newFormData.name,
                      description: newFormData.description,
                      estimatedTime: `${newFormData.estimatedTimeValue} ${newFormData.estimatedTimeUnit}`,
                      pricePerKg: `Rp ${parseInt(newFormData.pricePerKg.replace(/\D/g, '') || '0').toLocaleString('id-ID')}`,
                      status: newFormData.status as 'Aktif' | 'Nonaktif',
                      isPopular: newFormData.isPopular
                    };
                    onFormChange(previewData);
                  }
                }}
              >
                {TIME_UNITS.map((unit) => (
                  <MenuItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Harga per Kg */}
          <TextField
            label="Harga per Kg"
            value={formData.pricePerKg}
            onChange={handleChange('pricePerKg')}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography>Rp</Typography>
                </InputAdornment>
              ),
            }}
            placeholder="10000"
            variant="outlined"
          />

          {/* Status Layanan */}
          <FormControl fullWidth>
            <InputLabel>Status Layanan</InputLabel>
            <Select
              value={formData.status}
              label="Status Layanan"
              onChange={(e) => {
                const newFormData = {
                  ...formData,
                  status: e.target.value
                };
                setFormData(newFormData);
                
                // Emit changes for live preview
                if (onFormChange) {
                  const previewData: Partial<Service> & { isPopular?: boolean } = {
                    name: newFormData.name,
                    description: newFormData.description,
                    estimatedTime: `${newFormData.estimatedTimeValue} ${newFormData.estimatedTimeUnit}`,
                    pricePerKg: `Rp ${parseInt(newFormData.pricePerKg.replace(/\D/g, '') || '0').toLocaleString('id-ID')}`,
                    status: newFormData.status as 'Aktif' | 'Nonaktif',
                    isPopular: newFormData.isPopular
                  };
                  onFormChange(previewData);
                }
              }}
            >
              {STATUS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Tandai sebagai Layanan Populer */}
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isPopular}
                onChange={handleCheckboxChange}
              />
            }
            label="Tandai sebagai Layanan Populer"
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
              startIcon={isEditMode ? <Check size={16} /> : <Plus size={16} />}
              sx={{
                backgroundColor: isEditMode ? '#6b7280' : '#1976d2',
                '&:hover': {
                  backgroundColor: isEditMode ? '#4b5563' : '#1565c0'
                }
              }}
            >
              {isEditMode ? 'Simpan Perubahan' : 'Tambahkan Layanan'}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

