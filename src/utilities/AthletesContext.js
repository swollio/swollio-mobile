import React, {useState, useEffect, useContext, createContext} from 'react';
import * as api from './api';
import {UserContext} from './UserContext';

export const AthletesContext = createContext({});

export const AthletesContextProvider = ({children}) => {
  const {user} = useContext(UserContext);
  const [athletes, setAthletes] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAthletes = async (id) => {
    setLoading(true);
    const result = await api.getAthletesForTeam(id);
    console.log('ATHLETES LOADED');
    setAthletes(result);
    setLoading(false);
  };

  useEffect(() => {
    if (user !== null && user.team_id) {
      getAthletes(user.team_id);
    }
  }, [user]);

  return (
    <AthletesContext.Provider value={{athletes, loading}}>
      {children}
    </AthletesContext.Provider>
  );
};