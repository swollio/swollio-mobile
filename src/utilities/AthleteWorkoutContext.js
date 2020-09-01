import React, {useState, useEffect, useContext, createContext} from 'react';
import * as api from './api';
import {UserContext} from './UserContext';

export const AthleteWorkoutContext = createContext({});

export const AthleteWorkoutContextProvider = ({children}) => {
  const {user} = useContext(UserContext);
  const [workouts, setWorkouts] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWorkouts = async (id) => {
    setLoading(true);
    const result = await api.getWorkoutsForAthlete(id);
    setWorkouts(result);
    setLoading(false);
  };

  useEffect(() => {
    if (user !== null && user.athlete_id) {
      getWorkouts(user.athlete_id);
    }
  }, [user]);

  return (
    <AthleteWorkoutContext.Provider value={{workouts, loading}}>
      {children}
    </AthleteWorkoutContext.Provider>
  );
};