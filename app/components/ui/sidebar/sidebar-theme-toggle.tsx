'use client';

import React from 'react';
import { Moon, Sun, Settings } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
  isCollapsed: boolean;
}

export const SidebarThemeToggle: React.FC<ThemeToggleProps> = ({ 
  theme, 
  setTheme, 
  isCollapsed 
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        className="
          w-full 
          flex 
          items-center 
          p-2 
          rounded 
          hover:bg-gray-100 
          dark:hover:bg-gray-700
        "
      >
        <Settings className="mr-3" />
        {!isCollapsed && <span>Configuración</span>}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Tema</DropdownMenuLabel>
        <DropdownMenuItem 
          onClick={() => setTheme('light')}
          className="flex items-center"
        >
          <Sun className="mr-2" /> Tema Claro
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          className="flex items-center"
        >
          <Moon className="mr-2" /> Tema Oscuro
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};