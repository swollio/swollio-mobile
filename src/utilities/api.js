import {decode as atob} from 'base-64';
import config from '../config.json';
import store from './store';

/**
 * Create a new user with the basic information gathered from
 * the signup form and log in as the newly created user.
 *
 * @param {
 *  first_name: string,
 *  last_name: string,
 *  email: string,
 *  password: string
 * } user
 */
export function signup(user) {
  return fetch(`${config.api}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((result) => {
    if (result.status === 200) {
      return result.text();
    } else {
      throw result.text();
    }
  });
}

/**
 * Log in as the user with the given email and password. After calling
 * this method successfully, all protected endpoints will be called with
 * the credentials of this user.
 *
 * @param {
 *  email: string,
 *  password: string
 * } user
 */
export function login(email, password) {
  return fetch(`${config.api}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  }).then((result) => {
    if (result.status === 200) {
      return result.text();
    } else {
      throw result.text();
    }
  });
}

/**
 * I dont know how this works... only that it does...
 * @param {*} token
 * @return a javascript object containing the payload of the store.getState().user.token of the user
 *         that is currently signed in.
 */
function tokenPayload(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

/**
 * Returns the user_id of the user that is currently logged in.
 * This assumes that the user is currently logged in and the store.getState().user.token is
 * valid.
 */
export function currentUserId() {
  return tokenPayload(store.getState().user.token).user_id;
}

/**
 * Make a GET request to the swollio server using the credentials
 * of the user that is currently logged in. This function throws
 * an error if the response does not have a status code of 200.
 *
 * @param {string} route - the route to query
 */
export function get(route) {
  return fetch(`${config.api}/${route}`, {
    headers: {
      Authorization: 'Bearer ' + store.getState().user.token,
      'Cache-Control': 'no-cache',
    },
  }).then((result) => {
    if (result.status === 200) {
      return result;
    } else {
      throw result.text();
    }
  });
}

/**
 * Make a POST request to the swollio server using the credentials
 * of the user that is currently logged in. This function throws
 * an error if the response does not have a status code of 200.
 *
 * @param {string} route - the route to query
 */
export function post(route, body) {
  return fetch(`${config.api}/${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + store.getState().user.token,
    },
    body: JSON.stringify(body),
  }).then((result) => {
    if (result.status === 200) {
      return result;
    } else {
      throw result.text();
    }
  });
}

/**
 * Make a POST request to the swollio server using the credentials
 * of the user that is currently logged in. This function throws
 * an error if the response does not have a status code of 200.
 *
 * @param {string} route - the route to query
 */
export function put(route, body) {
  return fetch(`${config.api}/${route}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + store.getState().user.token,
    },
    body: JSON.stringify(body),
  }).then((result) => {
    if (result.status === 200) {
      return result;
    } else {
      throw result.text();
    }
  });
}

export function currentUser() {
  return get(`users/${currentUserId()}`).then((result) => result.json());
}

export function getWorkoutsForAthlete(athlete_id) {
  return get(`athletes/${athlete_id}/workouts`).then((result) => result.json());
}

export function getTodaysWorkoutsForAthlete(athlete_id) {
  return get(`athletes/${athlete_id}/workouts?date=today`).then((result) =>
    result.json(),
  );
}

export function getAssignmentsForTeamWorkout(team_id, workout_id) {
  return get(`teams/${team_id}/workouts/${workout_id}`).then((result) =>
    result.json(),
  );
}

export function getAssignmentsForWorkout(athlete_id, workout_id) {
  return get(`athletes/${athlete_id}/workouts/${workout_id}`).then((result) =>
    result.json(),
  );
}

export function getWorkoutForTeam(team_id, workout_id) {
  return get(`athletes/${team_id}/workouts/${workout_id}`).then((result) =>
    result.json(),
  );
}

export function getWorkoutsForTeam(team_id) {
  return get(`teams/${team_id}/workouts`).then((result) => result.json());
}

export function createAthlete(athlete) {
  return post('athletes/', athlete);
}

export function createTeam(team) {
  return post('teams/', team);
}

export function getAthletesForTeam(team_id) {
  return get(`teams/${team_id}/athletes`)
    .then((result) => result.json())
    .then((result) => {
      return result;
    });
}

export function getTeamData(team_id) {
  return get(`teams/${team_id}`).then((result) => result.json());
}

export function searchExercisesByName(name) {
  return get(`exercises?search=${name}`).then((result) => result.json());
}

export function postWorkoutForTeam(team_id, workout) {
  return post(`teams/${team_id}/workouts`, workout);
}

export function updateWorkoutForTeam(team_id, workout) {
  return put(`teams/${team_id}/workouts`, workout);
}

export function postAthleteWorkoutResult(athlete_id, workout_id, results) {
  return post(`athletes/${athlete_id}/results/${workout_id}`, results);
}

export function getAlternativesForExercises(exercise_id) {
  return get(`exercises/${exercise_id}/similar`).then((result) =>
    result.json(),
  );
}

export function postPostWorkoutSurvey(athlete_id, workout_id, surveyResult) {
  return post(
    `athletes/${athlete_id}/surveys/${workout_id}`,
    surveyResult,
  ).then((result) => result.text());
}

export function getStatisticsForAthlete(athlete_id) {
  return get(`athletes/${athlete_id}/exercises`).then((result) =>
    result.json(),
  );
}

export function postAthleteTeamTag(athlete_id, team_tag_id) {
  return post(`teams/tags/${athlete_id}/${team_tag_id}`).then((result) =>
    result.text(),
  );
}

export function getTagsForTeam(team_id) {
  return get(`teams/${team_id}/tags`).then((result) => result.json());
}

export function getAthleteTags(athlete_id, team_id) {
  return get(`teams/${team_id}/athletes/${athlete_id}/tags`).then((result) =>
    result.json(),
  );
}

export function postTeamTag(team_id, tag) {
  return post(`teams/${team_id}/tags/${tag}`).then((result) => result.text());
}

export function createCustomExerciseForTeam(team_id, exercise) {
  return post(`teams/${team_id}/exercises`, exercise).then((result) =>
    result.json(),
  );
}
export function getMusclesList() {
  return [
    {
      id: 1,
      name: 'quadriceps',
      nickname: 'quads',
      region: 'leg',
    },
    {
      id: 2,
      name: 'hamstrings',
      nickname: 'hamstrings',
      region: 'leg',
    },
    {
      id: 3,
      name: 'calves',
      nickname: 'calves',
      region: 'leg',
    },
    {
      id: 4,
      name: 'pectorals',
      nickname: 'pecs',
      region: 'chest',
    },
    {
      id: 5,
      name: 'latissimus dorsi',
      nickname: 'lats',
      region: 'back',
    },
    {
      id: 6,
      name: 'deltoids',
      nickname: 'delts',
      region: 'shoulder',
    },
    {
      id: 7,
      name: 'trapezius',
      nickname: 'traps',
      region: 'shoulder',
    },
    {
      id: 8,
      name: 'triceps',
      nickname: 'triceps',
      region: 'arm',
    },
    {
      id: 9,
      name: 'gluteus',
      nickname: 'glutes',
      region: 'leg',
    },
    {
      id: 10,
      name: 'biceps',
      nickname: 'biceps',
      region: 'arm',
    },
    {
      id: 11,
      name: 'forearms',
      nickname: 'forearms',
      region: 'arm',
    },
    {
      id: 12,
      name: 'abdominals',
      nickname: 'abs',
      region: 'abs',
    },
  ];
}
