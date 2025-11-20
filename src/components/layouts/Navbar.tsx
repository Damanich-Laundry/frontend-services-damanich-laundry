"use client";

import { 
  Bell, 
  ChevronDown,
  Menu as MenuIcon
} from "lucide-react";
import { Button, Avatar, Box, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import { SearchInput } from "@/components/shared";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  pageTitle: string;
  onMenuToggle: () => void;
}

export default function Navbar({ pageTitle, onMenuToggle }: NavbarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // -----------------------------
  // 👇 HANDLE LOGOUT (FINAL)
  // -----------------------------
  const handleLogout = () => {
    // Hapus cookie token
    document.cookie = "token=; Max-Age=0; path=/;";

    // Tutup menu
    handleClose();

    // Redirect ke login
    router.push("/auth/login");
  };
  // -----------------------------

  return (
    <Box component="header" sx={{ 
      backgroundColor: 'white', 
      borderBottom: '1px solid #e5e7eb', 
      px: { xs: 2, lg: 3 }, 
      py: 2 
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            onClick={onMenuToggle}
            sx={{ 
              display: { xs: 'block', lg: 'none' },
              color: '#6b7280'
            }}
          >
            <MenuIcon size={20} />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {pageTitle}
          </Typography>
        </Box>

        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          flex: 1, 
          maxWidth: 'md', 
          mx: 2 
        }}>
          <SearchInput 
            placeholder="Cari order, pelanggan..."
            className="w-full"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton sx={{ position: 'relative' }}>
            <Bell size={20} style={{ color: '#6b7280' }} />
            <Box
              sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                width: 8,
                height: 8,
                backgroundColor: '#ef4444',
                borderRadius: '50%'
              }}
            />
          </IconButton>

          <Button
            onClick={handleClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textTransform: 'none',
              color: '#374151',
              '&:hover': {
                backgroundColor: '#f3f4f6'
              }
            }}
          >
            <Avatar 
              sx={{
                width: 32,
                height: 32,
                backgroundColor: '#d1d5db',
                color: '#6b7280',
                fontSize: '0.875rem'
              }}
            >
              AU
            </Avatar>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 500,
                display: { xs: 'none', md: 'block' }
              }}
            >
              Admin User
            </Typography>
            <ChevronDown size={16} style={{ color: '#9ca3af' }} />
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >

            {/* 🔥 LOGOUT */}
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <Box sx={{ 
        display: { xs: 'block', md: 'none' }, 
        mt: 2 
      }}>
        <SearchInput 
          placeholder="Cari order, pelanggan..."
          className="w-full"
        />
      </Box>
    </Box>
  );
}
