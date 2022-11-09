import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Routes

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
