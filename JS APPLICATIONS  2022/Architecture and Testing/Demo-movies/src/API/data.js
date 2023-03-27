import * as api from './api.js';


export const login = await api.login;
export const register = await api.register;
export const logout = await api.logout;

const endpoints = {
    movies: '/data/movies'
};
export async function getAllMovies (){
 return api.get(endpoints.movies);

}