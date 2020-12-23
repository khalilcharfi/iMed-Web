
import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/admin/dashboard',
  },
  {
    title: 'Patients',
    icon: 'people-outline',
    link: '/admin/patient',
    home: false,
  },
  {
    title: 'Request',
    icon: 'phone-call-outline',
    link: '/admin/request',
    home: false,
  },
  {
    title: 'Rescuers',
    icon: 'car-outline',
    link: '/admin/rescuer',
    home: false,
  },
  // {
  //   title: 'Earthquake',
  //   icon: 'map-outline',
  //   link: '/admin/quake',
  //   home: false,
  // },

];
