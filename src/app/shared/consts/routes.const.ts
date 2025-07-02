import { LogOut, User, UserCheck } from 'lucide-angular';

const routes = [
  {
    icon: User,
    label: 'Clientes',
    href: '/customers',
  },
  {
    icon: UserCheck,
    label: 'Clientes selecionados',
    href: '/selected',
  },
  {
    icon: LogOut,
    label: 'Sair',
    href: '/login',
  },
];

export default routes;
