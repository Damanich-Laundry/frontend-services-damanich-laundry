"use client";

import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography
} from '@mui/material';
import { X, Plus, Check } from 'lucide-react';
import { Customer } from './types';

export interface CustomerFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface CustomerFormProps {
  initialData?: Partial<Customer>;
  onSubmit?: (data: CustomerFormValues) => void;
  onCancel?: () => void;
  isEditMode?: boolean;
  onFormChange?: (data: Partial<Customer>) => void;
  loading?: boolean;
}

export default function CustomerForm({
  initialData,
  onSubmit,
  onCancel,
  isEditMode = false,
  onFormChange,
  loading = false
}: CustomerFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
  });

  useEffect(() => {
    setFormData({
      name: initialData?.name || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      address: initialData?.address || '',
    });
  }, [
    initialData?.name,
    initialData?.email,
    initialData?.phone,
    initialData?.address,
  ]);

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: string } }
  ) => {
    const newFormData = {
      ...formData,
      [field]: e.target.value
    };
    setFormData(newFormData);

    if (onFormChange) {
      const previewData: Partial<Customer> = {
        name: newFormData.name,
        phone: newFormData.phone,
        address: newFormData.address,
        email: newFormData.email,
      };
      onFormChange(previewData);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const customerData: CustomerFormValues = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    };

    onSubmit?.(customerData);
  };

    return (
        <Card sx={{ boxShadow: 1 }}>
            <CardContent sx={{ p: 4 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {isEditMode ? 'Form Edit Pelanggan' : 'Form Tambah Pelanggan Baru'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {isEditMode ? 'Perbarui data pelanggan yang sudah ada' : 'Lengkapi informasi pelanggan baru'}
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        label="Nama Pelanggan"
                        placeholder="Contoh: Rama Najibah"
                        value={formData.name}
                        onChange={handleChange('name')}
                        fullWidth
                        required
                        variant="outlined"
                    />

                    <TextField
                        label="Email"
                        placeholder="Contoh: nama@example.com"
                        value={formData.email}
                        onChange={handleChange('email')}
                        type="email"
                        fullWidth
                        required
                        variant="outlined"
                    />


                    <TextField
                        label="Nomor Telepon"
                        placeholder="Contoh: 085255225672"
                        value={formData.phone}
                        onChange={handleChange('phone')}
                        fullWidth
                        required
                        variant="outlined"
                    />

                    <TextField
                        label="Alamat Rumah"
                        placeholder="Contoh: Telukjambe Timur, Kabupaten Bandung Barat"
                        value={formData.address}
                        onChange={handleChange('address')}
                        fullWidth
                        multiline
                        rows={4}
                        required
                        variant="outlined"
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
                            disabled={loading}
                            sx={{
                                backgroundColor: isEditMode ? '#6b7280' : '#1976d2',
                                '&:hover': {
                                    backgroundColor: isEditMode ? '#4b5563' : '#1565c0'
                                }
                            }}
                        >
                            {loading ? 'Menyimpan...' : isEditMode ? 'Simpan Perubahan' : 'Tambahkan Pelanggan'}
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
