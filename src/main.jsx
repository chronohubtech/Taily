import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Contexts
import { AuthProvider } from '@/contexts/user.context.jsx';
// Static asset
import './styles/global.css';
// Routes
import CreateAccount from '@routes/create-account/create-account.route.jsx';
import LoginAccount from '@routes/login/login.route.jsx';
import Home from '@routes/home/home.route.jsx';
import ProtectedRoute from '@routes/private-route/private-route.route.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/home',
        element: <Home />
      }
    ]
  },

  {
    path: '/create-account',
    element: <CreateAccount />
  },
  {
    path: '/login',
    element: <LoginAccount />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
