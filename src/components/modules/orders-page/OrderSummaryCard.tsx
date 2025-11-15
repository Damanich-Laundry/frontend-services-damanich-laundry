"use client";

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider
} from '@mui/material';
import { Receipt } from 'lucide-react';
import { StatusBadge } from '@/components/shared';

interface OrderSummaryCardProps {
  customerName?: string;
  itemQuantity?: string;
  totalBill?: string;
  paymentStatus?: string;
}

export default function OrderSummaryCard({
  customerName = '-',
  itemQuantity = '-',
  totalBill = 'Rp 0',
  paymentStatus = 'Belum Dibayar'
}: OrderSummaryCardProps) {
  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Receipt size={20} style={{ color: '#6b7280' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Ringkasan Pesanan
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Nama Pelanggan */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Nama Pelanggan
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {customerName}
            </Typography>
          </Box>

          <Divider />

          {/* Jumlah Item */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Jumlah Item
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {itemQuantity}
            </Typography>
          </Box>

          <Divider />

          {/* Total Tagihan */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Total Tagihan
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {totalBill}
            </Typography>
          </Box>

          <Divider />

          {/* Status Pembayaran */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Status Pembayaran
            </Typography>
            <StatusBadge status={paymentStatus} size="sm" />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

