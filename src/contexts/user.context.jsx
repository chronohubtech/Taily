import { createContext, useEffect, useState } from 'react';
import { createUserDocument, onAuthStateChangedListener } from '@/utils/firebase/firebase.utils.js';
import PropTypes from 'prop-types';

export const UserContext = createContext({ currentUserAuth: null, setCurrentUserAuth: () => null });

export const AuthProvider = ({ children }) => {
  const [currentUserAuth, setCurrentUserAuth] = useState(null);
  const value = { currentUserAuth, setCurrentUserAuth };

  useEffect(() => {
    return onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocument(user).catch((error) => console.log(error));
      }

      setCurrentUserAuth(user);
    });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
