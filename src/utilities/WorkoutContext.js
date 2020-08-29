import React, {useState, useEffect, useContext, createContext} from 'react';
import * as api from './api';
import {UserContext} from './UserContext';

export const WorkoutsContext = createContext({
  loaded: false,
  workouts: null,
  error: null,
});

export const WorkoutsContextProvider = ({children}) => {
  const {user} = useContext(UserContext);
  const [workouts, setWorkouts] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWorkouts = async (id) => {
    setLoading(true);
    const result = await api.getWorkoutsForTeam(id);
    console.log('WORKOUTS LOADED');
    setWorkouts(result);
    setLoading(false);
  };

  useEffect(() => {
    if (user !== null && user.team_id) {
      getWorkouts(user.team_id);
    }
  }, [user]);

  return (
    <WorkoutsContext.Provider value={{workouts, loading}}>
      {children}
    </WorkoutsContext.Provider>
  );
};
