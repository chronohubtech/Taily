import { createContext, useEffect, useState } from 'react';
import { onAuthStateChangedListener } from '@/utils/firebase/firebase.utils.js';

export const UserContext = createContext({ setCurrentUser: () => null, currentUser: null });

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    return onAuthStateChangedListener((user) => {
      console.log(user);
    });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
