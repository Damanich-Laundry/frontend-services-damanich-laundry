"use client";

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { StatusBadge } from '@/components/shared';
import { Customer } from './types';

interface CustomerTableProps {
  customer: Customer[];
  onEdit?: (CustomerId: string) => void;
  onView?: (CustomerId: string) => void;
  onDelete?: (CustomerId: string) => void;
}

export default function CustomerTable({
  customer,
  onEdit,
  onView,
  onDelete
}: CustomerTableProps) {
  const handleEdit = (CustomerId: string) => {
    onEdit?.(CustomerId);
  };

  const handleView = (CustomerId: string) => {
    onView?.(CustomerId);
  };

  const handleDelete = (CustomerId: string) => {
    onDelete?.(CustomerId);
  };

  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Nama Pelanggan</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Nomor Telepon</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Alamat</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Total Transaksi</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Tanggal Terdaftar</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customer.map((customer) => (
              <TableRow key={customer.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {customer.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {customer.phone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {customer.address}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {customer.totalTransaction}
                  </Typography>
                </TableCell>
                <TableCell>
                  <StatusBadge 
                    status={customer.registeredDate} 
                    size="sm"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Edit">
                      <IconButton 
                        size="small"
                        onClick={() => handleEdit(customer.id)}
                        sx={{ color: '#6366f1' }}
                      >
                        <Edit size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Lihat Detail">
                      <IconButton 
                        size="small"
                        onClick={() => handleView(customer.id)}
                        sx={{ color: '#3b82f6' }}
                      >
                        <Eye size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton 
                        size="small"
                        onClick={() => handleDelete(customer.id)}
                        sx={{ color: '#ef4444' }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

