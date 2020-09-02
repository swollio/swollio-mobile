import { useContext } from "react";
import { decode as atob } from "base-64";
import { TokenContext } from "./TokenContext";

import config from "../config.json";

export default function useApi() {
  const { token, setToken } = useContext(TokenContext);

  const signup = (user) => {
    return fetch(`${config.api}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((result) => {
        if (result.status === 200) {
          return result.text();
        }
        throw result.text();
      })
      .then((t) => setToken(t));
  };

  const login = (email, password) => {
    return fetch(`${config.api}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((result) => {
        if (result.status === 200) {
          return result.text();
        }
        throw result.text();
      })
      .then((t) => setToken(t));
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

  const get = (route) => {
    return fetch(`${config.api}/${route}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache",
      },
    }).then((result) => {
      if (result.status === 200) {
        return result;
      }
      throw result.text();
    });
  };

  const post = (route, body) => {
    return fetch(`${config.api}/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then((result) => {
      if (result.status === 200) {
        return result;
      }
      throw result.text();
    });
  };

  /**
   * Make a POST request to the swollio server using the credentials
   * of the user that is currently logged in. This function throws
   * an error if the response does not have a status code of 200.
   *
   * @param {string} route - the route to query
   */
  const put = (route, body) => {
    return fetch(`${config.api}/${route}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then((result) => {
      if (result.status === 200) {
        return result;
      }
      throw result.text();
    });
  };

  const currentUser = () => {
    return get(`users/${currentUserId()}`).then((result) => result.json());
  };

  const getWorkoutsForAthlete = (athlete_id) => {
    return get(`athletes/${athlete_id}/workouts`).then((result) =>
      result.json()
    );
  };

  const getTodaysWorkoutsForAthlete = (athlete_id) => {
    return get(`athletes/${athlete_id}/workouts?date=today`).then((result) =>
      result.json()
    );
  };

  const getAssignmentsForTeamWorkout = (team_id, workout_id) => {
    return get(`teams/${team_id}/workouts/${workout_id}`).then((result) =>
      result.json()
    );
  };

  const getAssignmentsForWorkout = (athlete_id, workout_id) => {
    return get(`athletes/${athlete_id}/workouts/${workout_id}`).then((result) =>
      result.json()
    );
  };

  const getWorkoutForTeam = (team_id, workout_id) => {
    return get(`athletes/${team_id}/workouts/${workout_id}`).then((result) =>
      result.json()
    );
  };

  const getWorkoutsForTeam = (team_id) => {
    return get(`teams/${team_id}/workouts`).then((result) => result.json());
  };

  const createAthlete = (athlete) => {
    return post("athletes/", athlete);
  };
  const createTeam = (team) => {
    return post("teams/", team);
  };

  const getAthletesForTeam = (team_id) => {
    return get(`teams/${team_id}/athletes`)
      .then((result) => result.json())
      .then((result) => {
        return result;
      });
  };

  const getTeamData = (team_id) => {
    return get(`teams/${team_id}`).then((result) => result.json());
  };

  const searchExercisesByName = (name) => {
    return get(`exercises?search=${name}`).then((result) => result.json());
  };

  const postWorkoutForTeam = (team_id, workout) => {
    return post(`teams/${team_id}/workouts`, workout);
  };

  const updateWorkoutForTeam = (team_id, workout) => {
    return put(`teams/${team_id}/workouts`, workout);
  };

  const postAthleteWorkoutResult = (athlete_id, workout_id, results) => {
    return post(`athletes/${athlete_id}/results/${workout_id}`, results);
  };

  const getAlternativesForExercises = (exercise_id) => {
    return get(`exercises/${exercise_id}/similar`).then((result) =>
      result.json()
    );
  };

  const postPostWorkoutSurvey = (athlete_id, workout_id, surveyResult) => {
    return post(
      `athletes/${athlete_id}/surveys/${workout_id}`,
      surveyResult
    ).then((result) => result.text());
  };

  const getStatisticsForAthlete = (athlete_id) => {
    return get(`athletes/${athlete_id}/exercises`).then((result) =>
      result.json()
    );
  };

  const postAthleteTeamTag = (athlete_id, team_tag_id) => {
    return post(`teams/tags/${athlete_id}/${team_tag_id}`).then((result) =>
      result.text()
    );
  };

  const getTagsForTeam = (team_id) => {
    return get(`teams/${team_id}/tags`).then((result) => result.json());
  };

  const getAthleteTags = (athlete_id, team_id) => {
    return get(`teams/${team_id}/athletes/${athlete_id}/tags`).then((result) =>
      result.json()
    );
  };

  const postTeamTag = (team_id, tag) => {
    return post(`teams/${team_id}/tags/${tag}`).then((result) => result.text());
  };

  const createCustomExerciseForTeam = (team_id, exercise) => {
    return post(`teams/${team_id}/exercises`, exercise).then((result) =>
      result.json()
    );
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
  };
}
