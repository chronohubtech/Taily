import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { onAuthStateChangedListener } from '@/utils/firebase/firebase.utils.js';

function PrivateRoute() {
  const [isUserAuth, setIsUserAuth] = useState(true);

  useEffect(() => {
    return onAuthStateChangedListener((user) => {
      setIsUserAuth(user !== null);
    });
  }, []);

  return isUserAuth ? <Outlet /> : <Navigate to={'/login'} />;
}

export default PrivateRoute;
