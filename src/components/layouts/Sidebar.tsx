"use client";

import { 
  BarChart3, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Package, 
  Settings, 
  User, 
  FileText,
  X
} from "lucide-react";
import { Button, Avatar, Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: BarChart3, label: "Dashboard", active: true },
  { icon: ShoppingCart, label: "Order", active: false },
  { icon: Users, label: "Pelanggan", active: false },
  { icon: DollarSign, label: "Keuangan", active: false },
  { icon: Package, label: "Inventory", active: false },
  { icon: Settings, label: "Layanan", active: false },
  { icon: User, label: "Staff", active: false },
  { icon: FileText, label: "Laporan", active: false },
  { icon: Settings, label: "Pengaturan", active: false },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64
      `}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          p: 3, 
          borderBottom: '1px solid #e5e7eb' 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar 
              sx={{
                width: 32,
                height: 32,
                backgroundColor: '#1976d2',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 'bold'
              }}
            >
              DL
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Damanich Laundry
            </Typography>
          </Box>
          <Button 
            onClick={onToggle}
            sx={{ 
              display: { xs: 'block', lg: 'none' },
              minWidth: 'auto',
              p: 1
            }}
          >
            <X size={20} style={{ color: '#6b7280' }} />
          </Button>
        </Box>

        <Box sx={{ flex: 1, p: 2 }}>
          <List sx={{ p: 0 }}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    sx={{
                      borderRadius: 1,
                      height: 48,
                      backgroundColor: item.active ? '#1976d2' : 'transparent',
                      color: item.active ? 'white' : '#374151',
                      '&:hover': {
                        backgroundColor: item.active ? '#1565c0' : '#f3f4f6',
                      },
                      px: 2,
                    }}
                  >
                    <ListItemIcon sx={{ 
                      minWidth: 40,
                      color: item.active ? 'white' : '#6b7280'
                    }}>
                      <Icon size={20} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: item.active ? 600 : 400,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </div>
    </>
  );
}
