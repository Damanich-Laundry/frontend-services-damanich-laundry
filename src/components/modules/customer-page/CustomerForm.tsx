"use client";

import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    InputAdornment,
    Typography
} from '@mui/material';
import { X, Plus, Check, Calendar } from 'lucide-react';
import { Customer } from './types';

interface CustomerFormProps {
    initialData?: Partial<Customer>;
    onSubmit?: (data: Omit<Customer, 'id'>) => void;
    onCancel?: () => void;
    isEditMode?: boolean;
    onFormChange?: (data: Partial<Customer>) => void;
}


export default function CustomerForm({
    initialData,
    onSubmit,
    onCancel,
    isEditMode = false,
    onFormChange
}: CustomerFormProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        phone: initialData?.phone || '',
        address: initialData?.address || '',
        registeredDate: initialData?.registeredDate || '',
        totalTransaction: initialData?.totalTransaction || '',
    });

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
                registeredDate: newFormData.registeredDate,
                totalTransaction: newFormData.totalTransaction,
            };
            onFormChange(previewData);
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const customerData: Omit<Customer, 'id'> = {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            registeredDate: formData.registeredDate,
            totalTransaction: formData.totalTransaction,
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

                    <TextField
                        label="Total Transaksi"
                        placeholder="Contoh: Rp 150.000"
                        value={formData.totalTransaction}
                        onChange={(e) => {
                            // simple currency normalization to 'Rp x.xxx'
                            const raw = (e.target.value || '').toString();
                            const digits = raw.replace(/\D/g, '');
                            const formatted = digits
                                ? `Rp ${parseInt(digits, 10).toLocaleString('id-ID')}`
                                : '';
                            handleChange('totalTransaction')({ target: { value: formatted } });
                        }}
                        fullWidth
                        required
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {/* visual prefix; value already includes Rp */}
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Tanggal Daftar"
                        type="date"
                        value={formData.registeredDate}
                        onChange={handleChange('registeredDate')}
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
                            {isEditMode ? 'Simpan Perubahan' : 'Tambahkan Pelanggan'}
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

