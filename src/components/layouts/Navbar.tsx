"use client";

import { 
  Bell, 
  ChevronDown,
  Menu
} from "lucide-react";
import { Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { SearchInput } from "@/components/shared";

interface NavbarProps {
  pageTitle: string;
  onMenuToggle: () => void;
}

export default function Navbar({ pageTitle, onMenuToggle }: NavbarProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            isIconOnly
            variant="light"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">{pageTitle}</h1>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <SearchInput 
            placeholder="Cari order, pelanggan..."
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Button 
            isIconOnly
            variant="light"
            className="relative"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button 
                variant="light"
                className="flex items-center space-x-2"
              >
                <Avatar 
                  name="AU"
                  size="sm"
                  className="bg-gray-300 text-gray-600"
                />
                <span className="hidden md:block text-sm font-medium text-gray-700">Admin User</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile menu">
              <DropdownItem key="profile">Profile</DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem key="logout" className="text-danger" color="danger">
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="md:hidden mt-4">
        <SearchInput 
          placeholder="Cari order, pelanggan..."
          className="w-full"
        />
      </div>
    </header>
  );
}
