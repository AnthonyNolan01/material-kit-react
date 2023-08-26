// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'log out',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'new application',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  {
    title: 'Profile Settings',
    path: '/dashboard/settings',
    icon: icon('ic_disabled'),
  },

  {
    title: 'Saved Applications',
    path: '/dashboard/saved',
    icon: icon('ic_blog'),
  },

  {
    title: 'Home',
    path: 'https://www.phdinsiders.com/',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
