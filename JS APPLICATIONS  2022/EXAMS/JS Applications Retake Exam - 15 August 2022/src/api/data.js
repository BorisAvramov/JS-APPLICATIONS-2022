import * as api from './api.js'


    export const login = await api.login;
    export const register = await api.register;
    export const logout = await api.logout;

    const endpoints ={
        allShoes: '/data/shoes?sortBy=_createdOn%20desc',
        pairById : '/data/shoes/',
        createPair: '/data/shoes',
        // bookByOwnerId : (userId) =>  `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,

        
        
    }


    export async function loadAllShoes () {

        return api.get(endpoints.allShoes);
    }

    export async function loadPairById (id){

        return api.get(endpoints.pairById + id);
    }

    export async function editPair (id, data){

        return api.put(endpoints.pairById + id, data);
    }
    export async function deletePair(id){

        return api.del(endpoints.pairById + id);
    }
    export async function creatPair (data){

        return api.post(endpoints.createPair, data);

    }

    // export async function loadAllBooksByOwnerId (ownerID){
    //     return api.get(endpoints.bookByOwnerId(ownerID)); 
    // }


    // // LIKE FUNCTIONS BONUS NB


    // export async function applyOfferById (offerId) {

    //     return api.post('/data/applications', {
           
    //         offerId 
        
    //     });

    // }

    // export async function getAllApplicationsForOfferId (offerId){

    //     return api.get (`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`);

    // }

    // export async function getMyApplicationsByOfferId (offerId, userId) {

    //     return api.get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);

    // }

    // window.likeBookById = likeBookById;
    // window.getAllLikesForBookById = getAllLikesForBookById;
    // window.getMyLikeByBookId = getMyLikeByBookId;


    // SEARCH BONUS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! NB

    export  async function searchPairShoes (query) {

            return api.get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`)

    }
   