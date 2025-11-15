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
    InputAdornment
} from '@mui/material';
import { X, Plus, Check, Calendar } from 'lucide-react';
import { Staff } from './types';
import { parseDate } from '@/utils/date';

interface StaffFormProps {
    initialData?: Partial<Staff>;
    onSubmit?: (data: Omit<Staff, 'id'>) => void;
    onCancel?: () => void;
    isEditMode?: boolean;
    onFormChange?: (data: Partial<Staff>) => void;
}


export default function StaffForm({
    initialData,
    onSubmit,
    onCancel,
    isEditMode = false,
    onFormChange
}: StaffFormProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        position: initialData?.position || '',
        phone: initialData?.phone || '',
        shift: initialData?.shift || '',
        status: initialData?.status || 'Aktif' as 'Aktif' | 'Non-Aktif' | 'Cuti',
        joinDate: initialData?.joinDate ? parseDate(initialData.joinDate) : '',
    });

    const handleChange = (field: string) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newFormData = {
            ...formData,
            [field]: e.target.value
        };
        setFormData(newFormData);

        if (onFormChange) {
            const previewData: Partial<Staff> = {
                name: newFormData.name,
                position: newFormData.position,
                phone: newFormData.phone,
                shift: newFormData.shift,
                status: newFormData.status as 'Aktif' | 'Non-Aktif' | 'Cuti',
                joinDate: newFormData.joinDate,
            };
            onFormChange(previewData);
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const staffData: Omit<Staff, 'id'> = {
            name: formData.name,
            position: formData.position,
            phone: formData.phone,
            shift: formData.shift,
            status: formData.status as 'Aktif' | 'Non-Aktif' | 'Cuti',
            joinDate: formData.joinDate,
        };

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
                        label="Nama Staff"
                        placeholder="Contoh: Budi Santoso"
                        value={formData.name}
                        onChange={handleChange('name')}
                        fullWidth
                        required
                        variant="outlined"
                    />

                    <TextField
                        label="Posisi"
                        placeholder="Contoh: Kasir, Operator, Kurir"
                        value={formData.position}
                        onChange={handleChange('position')}
                        fullWidth
                        required
                        variant="outlined"
                    />

                    <TextField
                        label="Nomor Telepon"
                        placeholder="Contoh: +62 812-3456-7890"
                        value={formData.phone}
                        onChange={handleChange('phone')}
                        fullWidth
                        required
                        variant="outlined"
                    />

                    <TextField
                        label="Shift"
                        select
                        value={formData.shift}
                        onChange={handleChange('shift')}
                        fullWidth
                        required
                        variant="outlined"
                    >
                        <MenuItem value="Pagi">Pagi</MenuItem>
                        <MenuItem value="Siang">Siang</MenuItem>
                        <MenuItem value="Malam">Malam</MenuItem>
                        <MenuItem value="Full">Full</MenuItem>
                    </TextField>

                    <TextField
                        label="Status"
                        select
                        value={formData.status}
                        onChange={handleChange('status')}
                        fullWidth
                        required
                        variant="outlined"
                    >
                        <MenuItem value="Aktif">Aktif</MenuItem>
                        <MenuItem value="Non-Aktif">Non-Aktif</MenuItem>
                        <MenuItem value="Cuti">Cuti</MenuItem>
                    </TextField>

                    <TextField
                        label="Tanggal Bergabung"
                        type="date"
                        value={formData.joinDate}
                        onChange={handleChange('joinDate')}
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
                            {isEditMode ? 'Simpan Perubahan' : 'Tambahkan Staff'}
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

