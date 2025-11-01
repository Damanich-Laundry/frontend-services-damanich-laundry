"use client";

import React from 'react';
import { Box } from '@mui/material';

interface AuthImageSectionProps {
  imageUrl?: string;
  imageAlt?: string;
}

const AuthImageSection: React.FC<AuthImageSectionProps> = ({ 
  imageUrl = "https://placehold.co/800x1000/e0e0e0/ffffff?text=X",
  imageAlt = "Auth illustration"
}) => {
  return (
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
  );
};

export default AuthImageSection;

