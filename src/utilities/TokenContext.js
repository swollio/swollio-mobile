import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export const TokenContext = createContext({});

export const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    readTokenFromAsyncStorage();
  });

  const readTokenFromAsyncStorage = async () => {
    const t = await AsyncStorage.getItem("token");
    setToken(t);
  };

  const saveTokenToAsyncStorage = (t) => {
    AsyncStorage.setItem("token", t);
    setToken(t);
  };

  const removeTokenFromAsyncStorage = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
  };

  return (
    <TokenContext.Provider
      value={{
        token,
        removeToken: removeTokenFromAsyncStorage,
        setToken: saveTokenToAsyncStorage,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};
