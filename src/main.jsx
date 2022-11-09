import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root.jsx';
import './global.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Routes
import CreateAccount from '@routes/create-account/create-account.router.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/create-account',
    element: <CreateAccount />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
