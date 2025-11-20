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
import { User, Phone, MapPin, Plus } from 'lucide-react';
import { Customer } from '@/datas/dummies';

interface CustomerInformationFormProps {
  customers: Customer[];
  selectedCustomerId?: string;
  onCustomerChange?: (customerId: string) => void;
  onAddNewCustomer?: () => void;
}

export default function CustomerInformationForm({
  customers,
  selectedCustomerId,
  onCustomerChange,
  onAddNewCustomer
}: CustomerInformationFormProps) {
  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <User size={20} style={{ color: '#6b7280' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Informasi Pelanggan
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Pilih Pelanggan */}
          <FormControl fullWidth>
            <InputLabel>Pilih Pelanggan</InputLabel>
            <Select
              value={selectedCustomerId || ''}
              label="Pilih Pelanggan"
              onChange={(e) => onCustomerChange?.(e.target.value)}
            >
              <MenuItem value="">
                <em>-- Pilih Pelanggan --</em>
              </MenuItem>
              {customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Nomor Telepon */}
          <TextField
            label="Nomor Telepon"
            value={selectedCustomer ? selectedCustomer.phone : 'Otomatis terisi'}
            fullWidth
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone size={16} style={{ color: '#9ca3af' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#9ca3af',
                backgroundColor: '#f3f4f6'
              }
            }}
          />

          {/* Alamat */}
          <TextField
            label="Alamat"
            value={selectedCustomer ? selectedCustomer.address : 'Otomatis terisi'}
            fullWidth
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MapPin size={16} style={{ color: '#9ca3af' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#9ca3af',
                backgroundColor: '#f3f4f6'
              }
            }}
          />

          {/* Tambah Pelanggan Baru */}
          <Button
            variant="outlined"
            startIcon={<Plus size={16} />}
            onClick={onAddNewCustomer}
            fullWidth
            sx={{
              borderColor: '#d1d5db',
              color: '#374151',
              mt: 1,
              '&:hover': {
                borderColor: '#9ca3af',
                backgroundColor: '#f9fafb'
              }
            }}
          >
            Tambah Pelanggan Baru
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

