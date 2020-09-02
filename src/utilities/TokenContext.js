import React, {useState, createContext} from 'react';

export const TokenContext = createContext({});

export const TokenContextProvider = ({children}) => {
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={{token, setToken}}>
      {children}
    </TokenContext.Provider>
  );
};
