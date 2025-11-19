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
import { Service } from './types';

interface ServicesTableProps {
  services: Service[];
  onEdit?: (serviceId: string) => void;
  onView?: (serviceId: string) => void;
  onDelete?: (serviceId: string) => void;
}

export default function ServicesTable({
  services,
  onEdit,
  onView,
  onDelete
}: ServicesTableProps) {
  const handleEdit = (serviceId: string) => {
    onEdit?.(serviceId);
  };

  const handleView = (serviceId: string) => {
    onView?.(serviceId);
  };

  const handleDelete = (serviceId: string) => {
    onDelete?.(serviceId);
  };

  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Nama Layanan</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Deskripsi Singkat</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Estimasi Waktu</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Harga per Kg</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {service.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {service.estimatedTime}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {service.pricePerKg}
                  </Typography>
                </TableCell>
                <TableCell>
                  <StatusBadge 
                    status={service.status} 
                    size="sm"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Edit">
                      <IconButton 
                        size="small"
                        onClick={() => handleEdit(service.id)}
                        sx={{ color: '#6366f1' }}
                      >
                        <Edit size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Lihat Detail">
                      <IconButton 
                        size="small"
                        onClick={() => handleView(service.id)}
                        disabled
                        sx={{ color: '#3b82f6' }}
                      >
                        <Eye size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton 
                        size="small"
                        onClick={() => handleDelete(service.id)}
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

