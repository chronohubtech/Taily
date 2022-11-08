import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root.jsx';
import './global.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
