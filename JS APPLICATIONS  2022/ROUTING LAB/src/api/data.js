import * as api from './api.js'


    export const login = await api.login;
    export const register = await api.register;
    export const logout = await api.logout;

    const endpoints ={
        allMovies: '/data/movies',
        movieById : '/data/movies/',
        
    }


    export async function getAllMOvies () {

        return api.get(endpoints.allMovies);
    }

    export async function loadMovieById (id){

        return api.get(endpoints.movieById + id);
    }

    export async function editMovie (id, data){

        return api.put(endpoints.movieById + id, data);
    }
    export async function deleteMovie(id){

        return api.del(endpoints.movieById + id);
    }
    export async function creteMovie (data){

        return api.post(endpoints.allMovies, data);

    }