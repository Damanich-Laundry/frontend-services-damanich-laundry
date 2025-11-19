"use client";

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
} from '@mui/material';
import SocialLoginButtons from './SocialLoginButtons';

interface LoginFormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
  forgotPasswordLink?: string;
  signUpLink?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onGoogleLogin,
  onAppleLogin,
  forgotPasswordLink = "#",
  signUpLink = "#",
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <Paper elevation={0} sx={{ width: '100%', maxWidth: 450 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 4, color: '#000' }}>
        Log In
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        {/* Email field */}
        <TextField
          fullWidth
          name="email" 
          label="Email Address"
          placeholder="Placeholder"
          variant="outlined"
          type="email"
          sx={{ mb: 3 }}
        />

        {/* Password field */}
        <TextField
          fullWidth
          name="password"  
          label="Password"
          type="password"
          placeholder="Placeholder"
          variant="outlined"
          sx={{ mb: 1 }}
        />
        <Typography variant="caption" sx={{ display: 'block', mb: 2, color: '#666' }}>
          It must be a combination of minimum 8 letters, numbers, and symbols.
        </Typography>

        {/* Remember me and Forgot password */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
          />
          <Link href={forgotPasswordLink} underline="hover" sx={{ color: '#1976d2' }}>
            Forgot Password?
          </Link>
        </Box>

        {/* Log In button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{
            mb: 3,
            py: 1.5,
            bgcolor: '#1976d2',
            '&:hover': {
              bgcolor: '#1565c0',
            },
          }}
        >
          Log In
        </Button>

        {/* Social login buttons */}
        <SocialLoginButtons 
          onGoogleLogin={onGoogleLogin}
          onAppleLogin={onAppleLogin}
        />

        {/* Sign up link */}
        <Typography sx={{ textAlign: 'center' }}>
          <Link href={signUpLink} underline="hover" sx={{ color: '#1976d2' }}>
            No account yet? Sign Up
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default LoginForm;

