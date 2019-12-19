import fetch from 'isomorphic-fetch';
import { API } from '../config';

// create category
export const create = (category, token) => {
    return fetch(`${API}/category`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(res => { return res.json(); })
    .catch(err => console.log(err));
};


// get all categories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
    .then(res => { return res.json(); })
    .catch(err => console.log(err));
};


// single category
export const singleCategory = (slug) => {
    return fetch(`${API}/category/${slug}`, {
        method: 'GET'
    })
    .then(res => { return res.json(); })
    .catch(err => console.log(err));
};


// create category
export const removeCategory = (slug, token) => {
    return fetch(`${API}/category/${slug}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => { return res.json(); })
    .catch(err => console.log(err));
};