"use client";

import {
  BarChart3,
  ShoppingCart,
  Users,
  Settings,
  User,
  X,
  Layers,
} from "lucide-react";
import {
  Button,
  Avatar,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface MenuItem {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { icon: BarChart3, label: "Dashboard", href: "/" },
  { icon: ShoppingCart, label: "Pesanan", href: "/orders" },
  { icon: Users, label: "Pelanggan", href: "/customers" },
  { icon: Layers, label: "Layanan", href: "/services" },
  { icon: User, label: "Staff", href: "/staffs" },
  { icon: Settings, label: "Pengaturan", href: "/settings" },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div
        className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
        w-64
      `}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 3,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Image
              src="/assets/Logo.png"
              alt="Logo"
              width={80}
              height={80}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Damanich Laundry
            </Typography>
          </Box>
          <Button
            onClick={onToggle}
            sx={{
              display: { xs: "block", lg: "none" },
              minWidth: "auto",
              p: 1,
            }}
          >
            <X size={20} style={{ color: "#6b7280" }} />
          </Button>
        </Box>

        <Box sx={{ flex: 1, p: 2 }}>
          <List sx={{ p: 0 }}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              // For root path, match exactly. For other paths, match exactly or if it's a nested route
              const isActive = item.href === "/" 
                ? pathname === "/" 
                : pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    component={Link}
                    href={item.href}
                    sx={{
                      borderRadius: 1,
                      height: 48,
                      backgroundColor: isActive ? "#1976d2" : "transparent",
                      color: isActive ? "white" : "#374151",
                      "&:hover": {
                        backgroundColor: isActive ? "#1565c0" : "#f3f4f6",
                      },
                      px: 2,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: isActive ? "white" : "#6b7280",
                      }}
                    >
                      <Icon size={20} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: "0.875rem",
                        fontWeight: isActive ? 600 : 400,
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
