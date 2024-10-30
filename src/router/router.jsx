import { createBrowserRouter } from 'react-router-dom';
import { Layout, AuthLayout } from '@/layouts';
import { Login, Start } from '@/views';
import { Register } from '../views/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Start />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <Login/>
      },
      {
        path: '/auth/register',
        element: <Register/>
      }
    ]
  }
])