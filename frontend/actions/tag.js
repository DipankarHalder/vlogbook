import fetch from 'isomorphic-fetch';
import { API } from '../config';

// create tag
export const create = (tag, token) => {
    return fetch(`${API}/tag`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tag)
    })
    .then(res => { return res.json(); })
    .catch(err => console.log(err));
};


// get all tags
export const getTags = () => {
    return fetch(`${API}/tags`, {
        method: 'GET'
    })
    .then(res => { return res.json(); })
    .catch(err => console.log(err));
};


// single tag
export const singleTag = (slug) => {
    return fetch(`${API}/tag/${slug}`, {
        method: 'GET'
    })
    .then(res => { return res.json(); })
    .catch(err => console.log(err));
};


// create tag
export const removeTag = (slug, token) => {
    return fetch(`${API}/tag/${slug}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => { return res.json(); })
    .catch(err => console.log(err));
};