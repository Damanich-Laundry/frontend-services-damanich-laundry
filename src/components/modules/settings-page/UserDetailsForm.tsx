"use client";

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { Check, X } from 'lucide-react';

export default function UserDetailsForm() {
  const [formData, setFormData] = useState({
    firstName: 'Roma',
    lastName: 'Sipahutar',
    email: 'romasipahutar@example.com',
    phone: '+62 812-3456-7890',
    });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <>
      <Card sx={{ boxShadow: 0}}>
        <CardContent sx={{ p: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 3,
              color: 'text.primary',
            }}
          >
            User Details
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 2,
              }}
            >
              <TextField
                label="First Name"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange('firstName')}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Last Name"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange('lastName')}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange('email')}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange('phone')}
                fullWidth
                variant="outlined"
              />
            </Box>
            
            <Box sx={{ pt :4, display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Check size={16} />}
                sx={{
                  backgroundColor: '#1976d2',
                  textTransform: 'none',
                  py:1.5,
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                Simpan Perubahan
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      
      {showSuccess && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: '#10b981',
            color: 'white',
            px: 3,
            py: 2,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            boxShadow: 3,
            zIndex: 1300,
            minWidth: 400,
          }}
        >
          <Check size={20} />
          <Typography variant="body2" sx={{ flex: 1 }}>
            Successfully Saved. Your profile settings have been saved.
          </Typography>
          <Button
            onClick={() => setShowSuccess(false)}
            sx={{
              minWidth: 'auto',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <X size={16} />
          </Button>
        </Box>
      )}
    </>
  );
}

