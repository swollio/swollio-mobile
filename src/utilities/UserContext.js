import React, {useState, useEffect, createContext} from 'react';
import * as api from './api';

export const UserContext = createContext({});

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);
    const result = await api.currentUser();
    console.log('USER LOADED');
    setUser(result);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [api.currentUserId()]);

  return (
    <UserContext.Provider value={{user, loading}}>
      {children}
    </UserContext.Provider>
  );
};
