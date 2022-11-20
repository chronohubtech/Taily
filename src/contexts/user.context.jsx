import { createContext, useEffect, useState } from 'react';
import { createUserDocument, onAuthStateChangedListener } from '@/utils/firebase/firebase.utils.js';

export const UserContext = createContext({ setCurrentUser: () => null, currentUser: null });

export const AuthProvider = ({ children }) => {
  const [currentUserAuth, setCurrentUserAuth] = useState(null);
  const value = { currentUser: currentUserAuth, setCurrentUser: setCurrentUserAuth };

  useEffect(() => {
    return onAuthStateChangedListener((user) => {
      console.log(user);
      if (user) {
        createUserDocument(user).catch((error) => console.log(error));
      }

      setCurrentUserAuth(user);
    });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
