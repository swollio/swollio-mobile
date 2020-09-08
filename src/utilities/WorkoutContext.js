import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";
import useApi from "./api";
import { UserContext } from "./UserContext";

export const WorkoutsContext = createContext({
  loaded: false,
  workouts: null,
  error: null,
});

export const WorkoutsContextProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [workouts, setWorkouts] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getWorkoutsForTeam } = useApi();

  const getWorkouts = async (id) => {
    setLoading(true);
    const result = await getWorkoutsForTeam(id);
    console.log(`${moment().utc().toISOString()}: WORKOUTS LOADED`);
    setWorkouts(result);
    setLoading(false);
  };

  useEffect(() => {
    if (user !== null && user.team_id) {
      getWorkouts(user.team_id);
    }
  }, [user]);

  const refresh = () => {
    getWorkouts(user.team_id);
  };

  return (
    <WorkoutsContext.Provider value={{ workouts, loading, refresh }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
