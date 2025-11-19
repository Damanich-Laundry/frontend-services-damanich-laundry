"use client";

import React, { useState } from 'react';
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
  Tooltip,
  Stack,
  Pagination
} from '@mui/material';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { StatusBadge } from '@/components/shared';
import { Staff } from './types';

interface StaffTableProps {
  staff: Staff[];
  onEdit?: (staffId: string) => void;
  onView?: (staffId: string) => void;
  onDelete?: (staffId: string) => void;
}

const ITEMS_PER_PAGE = 5;

export default function StaffTable({
  staff,
  onEdit,
  onView,
  onDelete
}: StaffTableProps) {
  const [page, setPage] = useState(1)

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

  const handleEdit = (staffId: string) => {
    onEdit?.(staffId);
  };

  const handleView = (staffId: string) => {
    onView?.(staffId);
  };

  const handleDelete = (staffId: string) => {
    onDelete?.(staffId);
  };

   const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedStaff = staff.slice(startIndex, endIndex);
  const totalPages = Math.ceil(staff.length / ITEMS_PER_PAGE);

  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Nama Staff</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Posisi</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Nomor Telepon</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Shift</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Tanggal Bergabung</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStaff.map((staff) => (
              <TableRow key={staff.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {staff.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {staff.position}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {staff.phone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {staff.shift}
                  </Typography>
                </TableCell>
                <TableCell>
                  <StatusBadge 
                    status={staff.status} 
                    size="sm"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {staff.joinDate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Edit">
                      <IconButton 
                        size="small"
                        onClick={() => handleEdit(staff.id)}
                        sx={{ color: '#6366f1' }}
                      >
                        <Edit size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Lihat Detail">
                      <IconButton 
                        size="small"
                        onClick={() => handleView(staff.id)}
                        sx={{ color: '#3b82f6' }}
                      >
                        <Eye size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton 
                        size="small"
                        onClick={() => handleDelete(staff.id)}
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Menampilkan {startIndex + 1}-{Math.min(endIndex, staff.length)} dari {staff.length} staff
          </Typography>
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="standard"
              shape="rounded"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#6b7280',
                  '&.Mui-selected': {
                    backgroundColor: '#6b7280',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#4b5563',
                    },
                  },
                },
              }}
            />
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

