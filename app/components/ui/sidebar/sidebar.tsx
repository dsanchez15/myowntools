'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { menuItems } from './sidebar-menu-items';
import { SidebarThemeToggle } from './sidebar-theme-toggle';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [theme, setTheme] = useState('dark');

  // Efectos anteriores de tema se mantienen igual...

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMenu = (index: number) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <div 
      className={`
        h-screen 
        bg-white 
        dark:bg-gray-900 
        border-r 
        dark:border-gray-700 
        transition-all 
        duration-300 
        fixed 
        left-0 
        top-0 
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Menú principal */}
        <div className="flex-grow">
          <div className="p-4 flex items-center justify-between">
            {!isCollapsed && (
              <h2 className="text-xl font-bold dark:text-white">Mi App</h2>
            )}
            <button 
              onClick={toggleCollapse} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
          </div>

          <nav className="px-4">
            {menuItems.map((item, index) => (
              <div key={item.label}>
                {item.submenus ? (
                  // Lógica existente para elementos con submenús
                  <>
                    <button
                      onClick={() => toggleMenu(index)}
                      className={`
                        w-full 
                        flex 
                        items-center 
                        p-2 
                        rounded 
                        hover:bg-gray-100 
                        dark:hover:bg-gray-700
                        ${activeMenu === index ? 'bg-gray-200 dark:bg-gray-800' : ''}
                      `}
                    >
                      <item.icon className="mr-3" />
                      {!isCollapsed && (
                        <span className="flex-grow">{item.label}</span>
                      )}
                      {!isCollapsed && activeMenu === index && (
                        <ChevronRight className="ml-auto" size={16} />
                      )}
                    </button>

                    {!isCollapsed && activeMenu === index && (
                      <div className="pl-4 mt-2">
                        {item.submenus.map((submenu) => (
                          <Link
                            key={submenu.label}
                            href={submenu.href}
                            className="
                              block 
                              py-1 
                              hover:bg-gray-100 
                              dark:hover:bg-gray-700 
                              rounded
                            "
                          >
                            {submenu.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // Nueva lógica para elementos sin submenús
                  <Link
                    href={item.href || '#'}
                    className={`
                      w-full 
                      flex 
                      items-center 
                      p-2 
                      rounded 
                      hover:bg-gray-100 
                      dark:hover:bg-gray-700
                    `}
                  >
                    <item.icon className="mr-3" />
                    {!isCollapsed && (
                      <span className="flex-grow">{item.label}</span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Menú de configuración (sin cambios) */}
        <div className="p-4 border-t dark:border-gray-700">
          <SidebarThemeToggle 
            theme={theme} 
            setTheme={setTheme} 
            isCollapsed={isCollapsed} 
          />
        </div>
      </div>
    </div>
  );
};