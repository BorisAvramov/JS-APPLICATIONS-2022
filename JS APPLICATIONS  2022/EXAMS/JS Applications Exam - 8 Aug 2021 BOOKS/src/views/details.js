import {html, page} from '../lib.js'
import {deleteBook, getAllLikesForBookById, getMyLikeByBookId, likeBookById, loadBookById} from '../api/data.js'
import { getUserData } from '../util.js'

const DetailsTempl = (book, onDel, likes, showLikeButton, onLike) => html`<section id="details-page" class="details">
<div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <div class="actions">
       
    ${bookControlsTemplate(book, onDel)}

    ${bookLikeControllTemplate(showLikeButton, onLike)}
    
    <div class="likes">
        <img class="hearts" src="/images/heart.png">
        <span id="total-likes">Likes: ${likes}</span>
    </div>
        
       
      


    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
</div>
</section>`


// ${book.isOwner
//     ? html `  <a class="button" href="/edit/${book._id}">Edit</a>
//     <a class="button" href="#" @click=${onDel}>Delete</a>` 
//     : html ` `}
//      ${book.isUser && !book.isOwner
//     ? html `<a class="button" href="#">Like</a>`
//     : html ``}
//     <div class="likes">
//         <img class="hearts" src="/images/heart.png">
//         <span id="total-likes">Likes: 0</span>
//     </div>



 const   bookControlsTemplate = (book, onDel) =>  {

    if(book.isOwner && book.isUser){
        return html `
        <a class="button" href="/edit/${book._id}">Edit</a>
        <a class="button" href="javascript:void(0)" @click=${onDel}>Delete</a>`
    }
    else{
        return null;
    }


}

const bookLikeControllTemplate  = (showLikeButton, onLike) => {

    if (showLikeButton){

        return html `<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`;
    }
    else{
        return null;
    }

}




export async function showDetails(ctx){

    // likes  ************************************* NB bonus

    const userData = getUserData();

    const [book, likes, hasMyLike] = await Promise.all ([

        loadBookById (ctx.params.id),
        getAllLikesForBookById(ctx.params.id),
        userData ? getMyLikeByBookId(ctx.params.id, userData.id) : 0

    ]);

    // const book = await loadBookById(ctx.params.id);

    book.isOwner = false;
    book.isUser = false

    if(userData){
        book.isUser = true;
    }
    if(userData && book._ownerId == userData.id){
        book.isOwner = true;
    }

    // LIKE BTN TO SHOW

    let showLikeButton = userData && book.isOwner == false && hasMyLike == 0;


    ctx.render (DetailsTempl(book, onDel, likes, showLikeButton, onLike));

    async function onDel(e){
        e.preventDefault();

        await deleteBook(book._id);
        page.redirect('/catalog');


    }

    async function onLike () {

        await likeBookById(ctx.params.id)

        page.redirect(`/details/${ctx.params.id}`);


    }
    

}