
import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/admin/dashboard',
  },
  {
    title: 'Patients',
    icon: 'file-text-outline',
    link: '/admin/patient',
    home: false,
  },
  // {
  //   title: 'Earthquake',
  //   icon: 'map-outline',
  //   link: '/admin/quake',
  //   home: false,
  // },

];
