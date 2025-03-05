import { Home, Layers, Calculator } from 'lucide-react';

export const menuItems = [
  {
    icon: Home,
    label: 'Inicio', 
    href: '/'
  },
  {
    icon: Layers,
    label: 'Proyectos',
    submenus: [
      { label: 'Pomodoro', href: '/pomodoro' }
    ]
  },
  {
    icon: Calculator,
    label: 'Calculadoras',
    submenus: [
      { label: '4x1000', href: '/calculadora/4x100' }
    ]
  }
];