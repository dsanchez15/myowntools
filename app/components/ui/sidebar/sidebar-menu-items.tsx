import { Home, Layers, Calculator } from 'lucide-react';

export const menuItems = [
  {
    icon: Home,
    label: 'Inicio', 
    href: '/tools/dashboard'
  },
  {
    icon: Layers,
    label: 'Proyectos',
    submenus: [
      { label: 'Pomodoro', href: '/tools/pomodoro' }
    ]
  },
  {
    icon: Calculator,
    label: 'Calculadoras',
    submenus: [
      { label: '4x1000', href: '/tools/calculadora/4x100' }
    ]
  }
];