import * as api from './api.js'


    export const login = await api.login;
    export const register = await api.register;
    export const logout = await api.logout;

    const endpoints ={
        allBooks: '/data/books?sortBy=_createdOn%20desc',
        bookById : '/data/books/',
        createBook: '/data/books',
        bookByOwnerId : (userId) =>  `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,

        
        
    }


    export async function loadAllBooks () {

        return api.get(endpoints.allBooks);
    }

    export async function loadBookById (id){

        return api.get(endpoints.bookById + id);
    }

    export async function editBook (id, data){

        return api.put(endpoints.bookById + id, data);
    }
    export async function deleteBook(id){

        return api.del(endpoints.bookById + id);
    }
    export async function createBook (data){

        return api.post(endpoints.createBook, data);

    }

    export async function loadAllBooksByOwnerId (ownerID){
        return api.get(endpoints.bookByOwnerId(ownerID)); 
    }


    // LIKE FUNCTIONS


    export async function likeBookById (bookId) {

        return api.post('/data/likes', {
           
            bookId 
        
        });

    }

    export async function getAllLikesForBookById (bookId){

        return api.get (`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);

    }

    export async function getMyLikeByBookId (bookId, userId) {

        return api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);

    }

    // window.likeBookById = likeBookById;
    // window.getAllLikesForBookById = getAllLikesForBookById;
    // window.getMyLikeByBookId = getMyLikeByBookId;
   