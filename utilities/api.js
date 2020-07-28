import {decode as atob, encode as btoa} from 'base-64'
import config from '../config.json';

/**
 * A global variable containing the JSON web token of the user that
 * is currently signed in. This is sent as a bearer token with every
 * API call.
 */
let jwt = '';

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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(result => {
        if (result.status === 200) {
            return result.text();
        } else {
            throw result.text();
        }
    })
    .then(token => jwt = token);
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
export function login(user) {
    return fetch(`${config.api}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(result => {
        if (result.status === 200) {
            return result.text();
        } else {
            throw result.text();
        }
    })
    .then(token => jwt = token);
}

/**
 * I dont know how this works... only that it does...
 * @param {*} token 
 * @return a javascript object containing the payload of the jwt of the user
 *         that is currently signed in.
 */
function tokenPayload (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

/**
 * Returns the user_id of the user that is currently logged in.
 * This assumes that the user is currently logged in and the jwt is
 * valid.
 */
export function currentUser() {
    return tokenPayload(jwt).user_id;
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
            'Authorization': 'Bearer ' + jwt
        },
    })
    .then(result => {
        if (result.status === 200) {
            return result;
        } else {
            throw result.text();
        }
    })
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
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify(body)
    })
    .then(result => {
        if (result.status === 200) {
            return result;
        } else {
            throw result.text();
        }
    })
}

export function current_user() {
    return get(`users/${currentUser()}`).then(result => result.json())
}

export function getWorkoutsForAthlete(athlete_id) {
    return get(`athletes/${athlete_id}/workouts`).then(result => result.json())
}

export function createAthlete(athlete) {
    return post(`athletes/`, athlete)
}