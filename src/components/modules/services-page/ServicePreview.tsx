"use client";

import React from 'react';
import { Box, Card, CardContent, Typography, List, ListItem } from '@mui/material';
import { StatusBadge } from '@/components/shared';
import { Service } from './types';

interface ServicePreviewProps {
  service: Partial<Service> & { isPopular?: boolean };
}

export default function ServicePreview({ service }: ServicePreviewProps) {
  const { name, description, pricePerKg, estimatedTime, status, isPopular } = service;

  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Preview Layanan
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {name || 'Nama Layanan'}
            </Typography>
            {status && (
              <StatusBadge status={status} size="sm" />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description || 'Deskripsi layanan akan ditampilkan di sini'}
          </Typography>
        </Box>

        <List sx={{ p: 0 }}>
          {pricePerKg && (
            <ListItem sx={{ px: 0, py: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Harga per Kg:</strong> {pricePerKg}
              </Typography>
            </ListItem>
          )}
          {estimatedTime && (
            <ListItem sx={{ px: 0, py: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Estimasi:</strong> {estimatedTime}
              </Typography>
            </ListItem>
          )}
          <ListItem sx={{ px: 0, py: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Status:</strong> {isPopular ? 'Populer' : 'Biasa'}
            </Typography>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

