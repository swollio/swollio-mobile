const api = 'http://localhost:8080'
let jwt = '';

function tokenPayload (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export function currentUser() {
    return tokenPayload(jwt).user_id;
}

export function get(route) {
    return fetch(`${api}/${route}`, {
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

export function signup(user) {
    return fetch(`${api}/auth/signup`, {
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

export function login(user) {
    return fetch(`${api}/auth/login`, {
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

export function athletes() {
    return get('athletes').then(result => result.json())
}

export function current_athlete() {
    return get(`athletes/${currentUser()}`).then(result => result.json())
}

export function current_athlete_workouts() {
    return get(`athletes/${currentUser()}/workouts`).then(result => result.json())
}
