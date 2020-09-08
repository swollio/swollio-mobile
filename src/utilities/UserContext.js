import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";
import useApi from "./api";
import { TokenContext } from "./TokenContext";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const { token } = useContext(TokenContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useApi();

  const getUser = async () => {
    setLoading(true);
    const result = await currentUser();
    console.log(`${moment().utc().toISOString()}: USER LOADED`);
    setUser(result);
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      getUser();
    } else {
      setUser(null);
    }
  }, [token]);

  const refreshUser = () => {
    if (token) {
      getUser();
    }
  };
  return (
    <UserContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
