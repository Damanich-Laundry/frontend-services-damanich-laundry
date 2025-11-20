"use client";

import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { User, CreditCard, Bell, FileText, Edit } from 'lucide-react';

interface SettingsMenuItem {
  label: string;
  value: string;
  icon: React.ComponentType<{ size?: number }>;
}

const settingsMenuItems: SettingsMenuItem[] = [
  { label: 'Edit Profile', value: 'profile', icon: Edit },
  { label: 'Account', value: 'account', icon: User },
  { label: 'Billing', value: 'billing', icon: CreditCard },
  { label: 'Subscriptions', value: 'subscriptions', icon: FileText },
  { label: 'Notifications', value: 'notifications', icon: Bell },
];

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {
  return (
      <Box
        sx={{
          width: 240,
          bgcolor: 'background.paper',
          borderRight: '1px solid',
          borderColor: '#e5e7eb',
          height: '100%',
          p: 2,
        }}
      >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 3,
          color: 'text.primary',
          px: 2,
        }}
      >
        Settings
      </Typography>
      <List sx={{ p: 0 }}>
        {settingsMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.value;
          
          return (
            <ListItem key={item.value} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => onTabChange(item.value)}
                sx={{
                  borderRadius: 1,
                  height: 48,
                  backgroundColor: isActive ? '#1976d2' : 'transparent',
                  color: isActive ? 'white' : '#374151',
                  '&:hover': {
                    backgroundColor: isActive ? '#1565c0' : '#f3f4f6',
                  },
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    minWidth: 40,
                    display: 'flex',
                    alignItems: 'center',
                    color: isActive ? 'white' : '#6b7280',
                  }}
                >
                  <Icon size={20} />
                </Box>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

