import * as api from './api.js'


    export const login = await api.login;
    export const register = await api.register;
    export const logout = await api.logout;

    const endpoints ={
        allFirnitures: '/data/catalog',
        furnitureById : '/data/catalog/',
        furnitureByOwnerId : (ownerId) =>  `/data/catalog?where=_ownerId%3D%22${ownerId}%22`,
        
    }


    export async function loadAllFurnitures () {

        return api.get(endpoints.allFirnitures);
    }

    export async function loadFurnitureById (id){

        return api.get(endpoints.furnitureById + id);
    }

    export async function editFurniture (id, data){

        return api.put(endpoints.furnitureById + id, data);
    }
    export async function deleteFurn(id){

        return api.del(endpoints.furnitureById + id);
    }
    export async function createFurniture (data){

        return api.post(endpoints.allFirnitures, data);

    }

    export async function loadAllFurnituresByOwnerId (ownerID){
        return api.get(endpoints.furnitureByOwnerId(ownerID)); 
    }

   