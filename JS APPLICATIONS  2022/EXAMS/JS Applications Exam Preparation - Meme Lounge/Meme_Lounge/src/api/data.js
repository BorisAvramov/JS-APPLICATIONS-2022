import * as api from './api.js'


    export const login = await api.login;
    export const register = await api.register;
    export const logout = await api.logout;

    const endpoints ={
        allMemes: '/data/memes?sortBy=_createdOn%20desc',
        memeById : '/data/memes/',
        createMeme: '/data/memes',
        furnitureByOwnerId : (ownerId) =>  `/data/memes?where=_ownerId%3D%22${ownerId}%22&sortBy=_createdOn%20desc`,
        
    }


    export async function loadAllMemes () {

        return api.get(endpoints.allMemes);
    }

    export async function loadMemeById (id){

        return api.get(endpoints.memeById + id);
    }

    export async function editMeme (id, data){

        return api.put(endpoints.memeById + id, data);
    }
    export async function deleteMeme(id){

        return api.del(endpoints.memeById + id);
    }
    export async function createMeme (data){

        return api.post(endpoints.createMeme, data);

    }

    export async function loadAllMemesByOwnerId (ownerID){
        return api.get(endpoints.furnitureByOwnerId(ownerID)); 
    }

   