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
  imageUrl = "/assets/Logo.png",
  imageAlt = "Auth illustration"
}) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left side - Logo / Image section */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: { md: '50%' },
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent', // ❌ no gray background
          position: 'relative',
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={imageAlt}
          sx={{
            width: '70%',
            height: 'auto',
            objectFit: 'contain', // ✅ prevents stretching or background fill
            backgroundColor: 'transparent', // ✅ keep transparent
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
