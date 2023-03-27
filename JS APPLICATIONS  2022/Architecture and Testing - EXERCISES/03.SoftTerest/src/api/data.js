import * as api from './api.js'


    export const login = await api.login;
    export const register = await api.register;
    export const logout = await api.logout;

    export async  function getAllIdeas(){

        return  api.get ('/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc')



    }

    export async function getIdeaDetailsById(id){


        return  api.get('/data/ideas/' + id);

    }

     export async function createIdea(idea){

        return  api.post('/data/ideas', idea);

     }

     export async function  deleteIdeaById(id){

        return  api.del('/data/ideas/' + id);
     } 