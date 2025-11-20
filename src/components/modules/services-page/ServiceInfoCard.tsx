"use client";

import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemIcon } from '@mui/material';
import { Info, Star } from 'lucide-react';

export default function ServiceInfoCard() {
  const infoItems = [
    {
      icon: Info,
      text: "Pastikan harga sesuai dengan standar pasar"
    },
    {
      icon: Info,
      text: "Estimasi waktu akan ditampilkan ke pelanggan"
    },
    {
      icon: Star,
      text: "Layanan populer akan ditampilkan di urutan teratas"
    }
  ];

  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Informasi Tambahan
        </Typography>

        <List sx={{ p: 0 }}>
          {infoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <ListItem key={index} sx={{ px: 0, py: 1, alignItems: 'flex-start' }}>
                <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                  <Icon size={18} style={{ color: '#6b7280' }} />
                </ListItemIcon>
                <Typography variant="body2" color="text.secondary">
                  {item.text}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}

