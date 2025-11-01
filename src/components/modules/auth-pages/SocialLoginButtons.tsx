"use client";

import React from 'react';
import { Box, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

interface SocialLoginButtonsProps {
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onGoogleLogin,
  onAppleLogin,
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={onGoogleLogin}
        sx={{
          py: 1.5,
          borderColor: '#ddd',
          color: '#000',
          textTransform: 'none',
          '&:hover': {
            borderColor: '#bbb',
            bgcolor: '#f5f5f5',
          },
        }}
      >
        Log in with Google
      </Button>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<AppleIcon />}
        onClick={onAppleLogin}
        sx={{
          py: 1.5,
          borderColor: '#ddd',
          color: '#000',
          textTransform: 'none',
          '&:hover': {
            borderColor: '#bbb',
            bgcolor: '#f5f5f5',
          },
        }}
      >
        Log in with Apple
      </Button>
    </Box>
  );
};

export default SocialLoginButtons;

