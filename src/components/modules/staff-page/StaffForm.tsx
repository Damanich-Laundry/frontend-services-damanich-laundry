"use client";

import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    MenuItem,
    Typography,
    FormControlLabel,
    Switch
} from '@mui/material';
import { X, Plus, Check } from 'lucide-react';
import { UserRecord } from '@/services/staffService';

interface StaffFormProps {
    initialData?: Partial<UserRecord>;
    onSubmit?: (data: StaffFormData) => void;
    onCancel?: () => void;
    isEditMode?: boolean;
    onFormChange?: (data: Partial<UserRecord>) => void;
    loading?: boolean;
}

export interface StaffFormData {
    username: string;
    email: string;
    password?: string;
    full_name: string;
    role: string;
    phone: string;
    is_active?: boolean;
}

export default function StaffForm({
    initialData,
    onSubmit,
    onCancel,
    isEditMode = false,
    onFormChange,
    loading = false
}: StaffFormProps) {
    const [formData, setFormData] = useState({
        username: initialData?.username || '',
        email: initialData?.email || '',
        password: '',
        full_name: initialData?.full_name || '',
        role: initialData?.role || 'staff',
        phone: initialData?.phone || '',
        is_active: initialData?.is_active !== undefined ? initialData.is_active : true,
    });

    const handleChange = (field: string) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = field === 'is_active' 
            ? (e.target as HTMLInputElement).checked 
            : e.target.value;

        const newFormData = {
            ...formData,
            [field]: value
        };
        setFormData(newFormData);

        if (onFormChange) {
            onFormChange(newFormData);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Untuk edit mode, password optional
        const staffData: StaffFormData = {
            username: formData.username,
            email: formData.email,
            full_name: formData.full_name,
            role: formData.role,
            phone: formData.phone,
            is_active: formData.is_active,
        };
        if (formData.password && formData.password.trim() !== '') {
            staffData.password = formData.password;
        }

        onSubmit?.(staffData);
    };

    return (
        <Card sx={{ boxShadow: 1 }}>
            <CardContent sx={{ p: 4 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {isEditMode ? 'Form Edit Staff' : 'Form Tambah Staff Baru'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {isEditMode ? 'Perbarui data staff yang sudah ada' : 'Lengkapi informasi staff baru'}
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        label="Username"
                        placeholder="Contoh: budi_santoso"
                        value={formData.username}
                        onChange={handleChange('username')}
                        fullWidth
                        required
                        variant="outlined"
                        helperText="Username untuk login"
                    />

                    <TextField
                        label="Nama Lengkap"
                        placeholder="Contoh: Budi Santoso"
                        value={formData.full_name}
                        onChange={handleChange('full_name')}
                        fullWidth
                        required
                        variant="outlined"
                    />

                    <TextField
                        label="Email"
                        type="email"
                        placeholder="Contoh: budi@example.com"
                        value={formData.email}
                        onChange={handleChange('email')}
                        fullWidth
                        required
                        variant="outlined"
                    />

                    <TextField
                        label={isEditMode ? "Password (Kosongkan jika tidak ingin mengubah)" : "Password"}
                        type="password"
                        placeholder="Masukkan password"
                        value={formData.password}
                        onChange={handleChange('password')}
                        fullWidth
                        required={!isEditMode}
                        variant="outlined"
                        helperText={isEditMode ? "Isi hanya jika ingin mengubah password" : "Minimal 6 karakter"}
                    />

                    <TextField
                        label="Nomor Telepon"
                        placeholder="Contoh: 08123456789"
                        value={formData.phone}
                        onChange={handleChange('phone')}
                        fullWidth
                        required
                        variant="outlined"
                    />

                    <TextField
                        label="Role"
                        select
                        value={formData.role}
                        onChange={handleChange('role')}
                        fullWidth
                        required
                        variant="outlined"
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="staff">Staff</MenuItem>
                        <MenuItem value="kasir">Kasir</MenuItem>
                        <MenuItem value="operator">Operator</MenuItem>
                        <MenuItem value="kurir">Kurir</MenuItem>
                    </TextField>

                    {isEditMode && (
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.is_active}
                                    onChange={handleChange('is_active')}
                                    color="primary"
                                />
                            }
                            label="Status Aktif"
                        />
                    )}
                    
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
                            disabled={loading}
                            startIcon={isEditMode ? <Check size={16} /> : <Plus size={16} />}
                            sx={{
                                backgroundColor: isEditMode ? '#6b7280' : '#1976d2',
                                '&:hover': {
                                    backgroundColor: isEditMode ? '#4b5563' : '#1565c0'
                                }
                            }}
                        >
                            {loading ? 'Memproses...' : (isEditMode ? 'Simpan Perubahan' : 'Tambahkan Staff')}
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}