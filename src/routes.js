import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/LogOut';
import DashboardAppPage from './pages/DashboardAppPage';
import ProfileSettings from './pages/ProfileSettings';
import HomeLink from './pages/HomeLink';
import Maps from './pages/SavedApps';
import SignUp from './pages/SignUp';
import InterestSelection from './pages/InterestSelection';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'settings', element: <ProfileSettings /> },
        { path: 'home', element: <HomeLink /> },
        { path: 'saved', element: <Maps /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },

    {
      path: 'sign-up',
      element: <SignUp />,
    },

    {
      path: 'interest',
      element: <InterestSelection />,
    },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },

    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
