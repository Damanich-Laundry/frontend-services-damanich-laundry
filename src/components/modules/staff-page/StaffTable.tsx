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
  Pagination,
  Chip
} from '@mui/material';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { UserRecord } from '@/services/staffService';
import { formatDate } from '@/utils/date';

interface StaffTableProps {
  staff: UserRecord[];
  onEdit?: (staffId: string | number) => void;
  onView?: (staffId: string | number) => void;
  onDelete?: (staffId: string | number) => void;
}

const ITEMS_PER_PAGE = 10;

export default function StaffTable({
  staff,
  onEdit,
  onView,
  onDelete
}: StaffTableProps) {
  const [page, setPage] = useState(1);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleEdit = (staffId: string | number) => {
    onEdit?.(staffId);
  };

  const handleView = (staffId: string | number) => {
    onView?.(staffId);
  };

  const handleDelete = (staffId: string | number) => {
    onDelete?.(staffId);
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: '#ef4444',
      staff: '#6366f1',
      kasir: '#10b981',
      operator: '#f59e0b',
      kurir: '#06b6d4'
    };
    return colors[role.toLowerCase()] || '#6b7280';
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedStaff = staff.slice(startIndex, endIndex);
  const totalPages = Math.ceil(staff.length / ITEMS_PER_PAGE);

  if (staff.length === 0) {
    return (
      <Card sx={{ boxShadow: 1 }}>
        <CardContent>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="body1" color="text.secondary">
              Belum ada data staff
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Username</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Nama Lengkap</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Nomor Telepon</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Bergabung</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', textAlign: 'center' }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStaff.map((staffMember) => (
                <TableRow 
                  key={staffMember.id} 
                  hover
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: '#f9fafb'
                    }
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#111827' }}>
                      {staffMember.username}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {staffMember.full_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {staffMember.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {staffMember.phone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={staffMember.role.toUpperCase()}
                      size="small"
                      sx={{
                        backgroundColor: `${getRoleColor(staffMember.role)}15`,
                        color: getRoleColor(staffMember.role),
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        height: '24px',
                        textTransform: 'capitalize'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={staffMember.is_active ? 'Aktif' : 'Non-Aktif'}
                      size="small"
                      sx={{
                        backgroundColor: staffMember.is_active ? '#10b98115' : '#ef444415',
                        color: staffMember.is_active ? '#10b981' : '#ef4444',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        height: '24px'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(staffMember.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                      <Tooltip title="Lihat Detail" arrow>
                        <IconButton 
                          size="small"
                          disabled
                          onClick={() => handleView(staffMember.id)}
                          sx={{ 
                            color: '#3b82f6',
                            '&:hover': {
                              backgroundColor: '#3b82f615'
                            }
                          }}
                        >
                          <Eye size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit" arrow>
                        <IconButton 
                          size="small"
                          onClick={() => handleEdit(staffMember.id)}
                          sx={{ 
                            color: '#f59e0b',
                            '&:hover': {
                              backgroundColor: '#f59e0b15'
                            }
                          }}
                        >
                          <Edit size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Hapus" arrow>
                        <IconButton 
                          size="small"
                          onClick={() => handleDelete(staffMember.id)}
                          sx={{ 
                            color: '#ef4444',
                            '&:hover': {
                              backgroundColor: '#ef444415'
                            }
                          }}
                        >
                          <Trash2 size={18} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          px: 3,
          py: 2,
          borderTop: '1px solid #e5e7eb'
        }}>
          <Typography variant="body2" color="text.secondary">
            Menampilkan <strong>{startIndex + 1}-{Math.min(endIndex, staff.length)}</strong> dari <strong>{staff.length}</strong> staff
          </Typography>
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              size="medium"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#6b7280',
                  fontWeight: 500,
                  '&.Mui-selected': {
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                  },
                  '&:hover': {
                    backgroundColor: '#f3f4f6'
                  }
                },
              }}
            />
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}