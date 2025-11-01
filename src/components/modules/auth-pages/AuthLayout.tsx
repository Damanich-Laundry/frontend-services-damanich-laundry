"use client";

import React from 'react';
import { Box } from '@mui/material';

interface AuthLayoutProps {
  children: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  imageUrl = "https://placehold.co/800x1000/e0e0e0/ffffff?text=X",
  imageAlt = "Auth illustration"
}) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: '#f5f5f5' }}>
      {/* Left side - Image placeholder */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: { md: '50%' },
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#e0e0e0',
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={imageAlt}
          sx={{
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Right side - Form content */}
      <Box
        sx={{
          display: 'flex',
          width: { xs: '100%', md: '50%' },
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#ffffff',
          px: { xs: 3, md: 4 },
          py: 4,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;

