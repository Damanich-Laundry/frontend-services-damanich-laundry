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
  Pagination,
  Stack
} from '@mui/material';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { StatusBadge } from '@/components/shared';
import { Order } from './types';

interface OrdersTableProps {
  orders: Order[];
  onEdit?: (orderId: string) => void;
  onView?: (orderId: string) => void;
  onDelete?: (orderId: string) => void;
}

const ITEMS_PER_PAGE = 3;

export default function OrdersTable({
  orders,
  onEdit,
  onView,
  onDelete
}: OrdersTableProps) {
  const [page, setPage] = useState(1);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleEdit = (orderId: string) => {
    onEdit?.(orderId);
  };

  const handleView = (orderId: string) => {
    onView?.(orderId);
  };

  const handleDelete = (orderId: string) => {
    onDelete?.(orderId);
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedOrders = orders.slice(startIndex, endIndex);
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Daftar Pesanan
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Nomor Pesanan</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Nama Pelanggan</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Jenis Layanan</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status Pesanan</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Total Harga</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Tanggal Order</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {order.orderNumber}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {order.customerName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {order.serviceType}
                  </Typography>
                </TableCell>
                <TableCell>
                  <StatusBadge 
                    status={order.status} 
                    size="sm"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {order.totalPrice}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {order.orderDate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Lihat">
                      <IconButton 
                        size="small"
                        onClick={() => handleView(order.id)}
                        sx={{ color: '#6b7280' }}
                      >
                        <Eye size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton 
                        size="small"
                        onClick={() => handleEdit(order.id)}
                        sx={{ color: '#6b7280' }}
                      >
                        <Edit size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton 
                        size="small"
                        onClick={() => handleDelete(order.id)}
                        sx={{ color: '#6b7280' }}
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
            Menampilkan {startIndex + 1}-{Math.min(endIndex, orders.length)} dari {orders.length} pesanan
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

