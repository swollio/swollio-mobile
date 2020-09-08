import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";
import useApi from "./api";
import { UserContext } from "./UserContext";

export const AthletesContext = createContext({});

export const AthletesContextProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [athletes, setAthletes] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getAthletesForTeam } = useApi();

  const getAthletes = async (id) => {
    setLoading(true);
    const result = await getAthletesForTeam(id);
    console.log(`${moment().utc().toISOString()}: ATHLETES LOADED`);
    setAthletes(result);
    setLoading(false);
  };

  useEffect(() => {
    if (user !== null && user.team_id) {
      getAthletes(user.team_id);
    }
  }, [user]);

  return (
    <AthletesContext.Provider value={{ athletes, loading }}>
      {children}
    </AthletesContext.Provider>
  );
};
