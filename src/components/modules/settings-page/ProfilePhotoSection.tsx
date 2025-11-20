"use client";

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Upload } from 'lucide-react';

export default function ProfilePhotoSection() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleRemove = () => {
    setProfileImage(null);
  };

  return (
    <Card sx={{ boxShadow: 1, mb: 0 }}>
      <CardContent sx={{ pl: 0 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 3,
            color: 'text.primary',
          }}
        >
          Profile Photo
        </Typography>
          
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          <Avatar
            src={profileImage || undefined}
            sx={{
              width: 120,
              height: 120,
              bgcolor: '#e5e7eb',
              fontSize: '3rem',
            }}
          >
            {!profileImage && '👤'}
          </Avatar>
          
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<Upload size={16} />}
                onClick={handleUpload}
                sx={{
                  backgroundColor: '#1976d2',
                  textTransform: 'none',
                  alignSelf: 'flex-start',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                Upload Photo
              </Button>
            </Box>
            
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  mb: 1,
                  color: 'text.primary',
                }}
              >
                Image requirements:
              </Typography>
              <List sx={{ py: 0, pl: 0 }}>
                <ListItem sx={{ py: 0.5, px: 0 }}>
                  <ListItemText
                    primary="Min. 400 x 400px"
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      color: 'text.secondary',
                    }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5, px: 0 }}>
                  <ListItemText
                    primary="Max. 2MB"
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      color: 'text.secondary',
                    }}
                  />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

