"use client";

import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  SettingsSidebar,
  ProfilePhotoSection,
  UserDetailsForm,
} from '@/components/modules/settings-page';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <>
            <ProfilePhotoSection />
            <UserDetailsForm />
          </>
        );
      case 'account':
        return (
          <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
            Account settings coming soon...
          </Box>
        );
      case 'billing':
        return (
          <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
            Billing settings coming soon...
          </Box>
        );
      case 'subscriptions':
        return (
          <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
            Subscription settings coming soon...
          </Box>
        );
      case 'notifications':
        return (
          <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
            Notification settings coming soon...
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: '#f3f4f6',
        minHeight: 'calc(100vh - 120px)',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <Box
        sx={{
          flex: 1,
          pl: 4,
          pt:2,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default SettingsPage;