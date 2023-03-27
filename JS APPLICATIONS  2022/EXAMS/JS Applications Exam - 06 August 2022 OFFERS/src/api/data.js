import * as api from './api.js'


    export const login = await api.login;
    export const register = await api.register;
    export const logout = await api.logout;

    const endpoints ={
        allOffers: '/data/offers?sortBy=_createdOn%20desc',
        offerById : '/data/offers/',
        createOffer: '/data/offers',
        bookByOwnerId : (userId) =>  `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,

        
        
    }


    export async function loadAllOffers () {

        return api.get(endpoints.allOffers);
    }

    export async function loadOfferById (id){

        return api.get(endpoints.offerById + id);
    }

    export async function editOffer (id, data){

        return api.put(endpoints.offerById + id, data);
    }
    export async function deleteOffer(id){

        return api.del(endpoints.offerById + id);
    }
    export async function createOffer (data){

        return api.post(endpoints.createOffer, data);

    }

    // export async function loadAllBooksByOwnerId (ownerID){
    //     return api.get(endpoints.bookByOwnerId(ownerID)); 
    // }


    // // LIKE FUNCTIONS


    export async function applyOfferById (offerId) {

        return api.post('/data/applications', {
           
            offerId 
        
        });

    }

    export async function getAllApplicationsForOfferId (offerId){

        return api.get (`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`);

    }

    export async function getMyApplicationsByOfferId (offerId, userId) {

        return api.get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);

    }

    // window.likeBookById = likeBookById;
    // window.getAllLikesForBookById = getAllLikesForBookById;
    // window.getMyLikeByBookId = getMyLikeByBookId;
   