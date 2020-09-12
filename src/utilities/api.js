import { useContext } from "react";
import { decode as atob } from "base-64";
import { TokenContext } from "./TokenContext";

import config from "../config.json";

export default function useApi() {
  const { token, setToken, removeToken } = useContext(TokenContext);

  const signup = async (user) => {
    const result = await fetch(`${config.api}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (result.status === 200) {
      setToken(await result.text());
    } else {
      throw (await result.json()).error;
    }
  };

  const login = async (email, password) => {
    const result = await fetch(`${config.api}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (result.status === 200) {
      setToken(await result.text());
    } else {
      throw (await result.json()).error;
    }
  };

  const tokenPayload = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  const currentUserId = () => {
    if (!token) return null;
    return tokenPayload(token).user_id;
  };

  const get = async (route) => {
    const result = await fetch(`${config.api}/${route}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache",
      },
    });
    if (result.status === 200) {
      return result.json();
    }
    if (result.status === 401) {
      return removeToken();
    }
    throw (await result.json()).error;
  };

  const post = async (route, body) => {
    const result = await fetch(`${config.api}/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (result.status === 200) {
      return result.json();
    }
    if (result.status === 401) {
      return removeToken();
    }
    throw (await result.json()).error;
  };

  /**
   * Make a POST request to the swollio server using the credentials
   * of the user that is currently logged in. This function throws
   * an error if the response does not have a status code of 200.
   *
   * @param {string} route - the route to query
   */
  const put = async (route, body) => {
    const result = await fetch(`${config.api}/${route}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (result.status === 200) {
      return result.json();
    }
    if (result.status === 401) {
      return removeToken();
    }
    throw (await result.json()).error;
  };

  const currentUser = () => {
    return get(`users/${currentUserId()}`);
  };

  const getWorkoutsForAthlete = (athlete_id) => {
    return get(`athletes/${athlete_id}/workouts`);
  };

  const getTodaysWorkoutsForAthlete = (athlete_id) => {
    return get(`athletes/${athlete_id}/workouts?date=today`);
  };

  const getAssignmentsForTeamWorkout = (team_id, workout_id) => {
    return get(`teams/${team_id}/workouts/${workout_id}`);
  };

  const getAssignmentsForWorkout = (athlete_id, workout_id) => {
    return get(`athletes/${athlete_id}/workouts/${workout_id}`);
  };

  const getWorkoutForTeam = (team_id, workout_id) => {
    return get(`athletes/${team_id}/workouts/${workout_id}`);
  };

  const getWorkoutsForTeam = (team_id) => {
    return get(`teams/${team_id}/workouts`);
  };

  const createAthlete = (athlete) => {
    return post("athletes/", athlete);
  };
  const createTeam = (team) => {
    return post("teams/", team);
  };

  const getAthletesForTeam = (team_id) => {
    return get(`teams/${team_id}/athletes`);
  };

  const getTeamData = (team_id) => {
    return get(`teams/${team_id}`);
  };

  const searchExercisesByName = (name) => {
    return get(`exercises?search=${name}`);
  };

  const postWorkoutForTeam = (team_id, workout) => {
    return post(`teams/${team_id}/workouts`, workout);
  };

  const postWorkoutForAthlete = (athlete_id, workout) => {
    console.log(athlete_id);
    return post(`athletes/${athlete_id}/workouts`, workout);
  };

  const updateWorkoutForTeam = (team_id, workout) => {
    return put(`teams/${team_id}/workouts`, workout);
  };

  const updateWorkoutForAthlete = (athlete_id, workout) => {
    console.log(athlete_id);

    return put(`athletes/${athlete_id}/workouts`, workout);
  };

  const postAthleteWorkoutResult = (athlete_id, workout_id, results) => {
    return post(`athletes/${athlete_id}/results/${workout_id}`, results);
  };

  const getAlternativesForExercises = (exercise_id) => {
    return get(`exercises/${exercise_id}/similar`);
  };

  const postPostWorkoutSurvey = (athlete_id, workout_id, surveyResult) => {
    return post(`athletes/${athlete_id}/surveys/${workout_id}`, surveyResult);
  };

  const getStatisticsForAthlete = (athlete_id) => {
    return get(`athletes/${athlete_id}/exercises`);
  };

  const postAthleteTeamTag = (athlete_id, team_tag_id) => {
    return post(`teams/tags/${athlete_id}/${team_tag_id}`);
  };

  const getFeedForAthlete = (athlete_id) => {
    return get(`athletes/${athlete_id}/feed`);
  };

  const getTagsForTeam = (team_id) => {
    return get(`teams/${team_id}/tags`);
  };

  const getAthleteTags = (athlete_id, team_id) => {
    return get(`teams/${team_id}/athletes/${athlete_id}/tags`);
  };

  const postTeamTag = (team_id, tag) => {
    return post(`teams/${team_id}/tags/${tag}`);
  };

  const createCustomExerciseForTeam = (team_id, exercise) => {
    return post(`teams/${team_id}/exercises`, exercise);
  };
  const getMusclesList = () => {
    return [
      {
        id: 1,
        name: "quadriceps",
        nickname: "quads",
        region: "leg",
      },
      {
        id: 2,
        name: "hamstrings",
        nickname: "hamstrings",
        region: "leg",
      },
      {
        id: 3,
        name: "calves",
        nickname: "calves",
        region: "leg",
      },
      {
        id: 4,
        name: "pectorals",
        nickname: "pecs",
        region: "chest",
      },
      {
        id: 5,
        name: "latissimus dorsi",
        nickname: "lats",
        region: "back",
      },
      {
        id: 6,
        name: "deltoids",
        nickname: "delts",
        region: "shoulder",
      },
      {
        id: 7,
        name: "trapezius",
        nickname: "traps",
        region: "shoulder",
      },
      {
        id: 8,
        name: "triceps",
        nickname: "triceps",
        region: "arm",
      },
      {
        id: 9,
        name: "gluteus",
        nickname: "glutes",
        region: "leg",
      },
      {
        id: 10,
        name: "biceps",
        nickname: "biceps",
        region: "arm",
      },
      {
        id: 11,
        name: "forearms",
        nickname: "forearms",
        region: "arm",
      },
      {
        id: 12,
        name: "abdominals",
        nickname: "abs",
        region: "abs",
      },
    ];
  };

  return {
    signup,
    login,
    tokenPayload,
    currentUserId,
    currentUser,
    getWorkoutsForAthlete,
    getTodaysWorkoutsForAthlete,
    getAssignmentsForTeamWorkout,
    getAssignmentsForWorkout,
    getWorkoutForTeam,
    createAthlete,
    createTeam,
    getAthletesForTeam,
    getTeamData,
    searchExercisesByName,
    postWorkoutForTeam,
    updateWorkoutForTeam,
    postAthleteWorkoutResult,
    getAlternativesForExercises,
    postPostWorkoutSurvey,
    getStatisticsForAthlete,
    getWorkoutsForTeam,
    getMusclesList,
    createCustomExerciseForTeam,
    postWorkoutForAthlete,
    updateWorkoutForAthlete,
    getFeedForAthlete,
  };
}
