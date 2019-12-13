import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import { API } from '../config';

// Sign Up
export const signup = user => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => { return res.json(); })
    .catch(err => console.log(err));
};

// Sign In
export const signin = user => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => { return res.json(); })
    .catch(err => console.log(err));
};

// Sign Out
export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
    
    return fetch(`${API}/signout`, { method: 'GET' })
    .then(res => console.log('Signout Success'))
    .catch(err => console.log(err));
}

// Set Cookie
export const setCookie = (key, value) => {
    if(process.browser){
        cookie.set(key, value, {
            expires: 1
        });
    }
}

// Remove Cookie
export const removeCookie = key => {
    if(process.browser){
        cookie.remove(key, {
            expires: 1
        });
    }
}

// Get Cookie
export const getCookie = key => {
    if(process.browser){
        return cookie.get(key);
    }
}

// Set Localstorage
export const setLocalStorage = (key, value) => {
    if(process.browser){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

// Remove Localstorage
export const removeLocalStorage = (key, value) => {
    if(process.browser){
        localStorage.removeItem(key)
    }
}

// Authenticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
}

// isAuthenticate user or not
export const isAuth = () => {
    if(process.browser){
        const cookieChecked = getCookie('token');
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
}

