import {html} from '../lib.js'
import {loadAllBooksByOwnerId} from '../api/data.js'
import { getUserData } from '../util.js';

const myBooksTempl = (books) => html`<section id="my-books-page" class="my-books">
<h1>My Books</h1>
<!-- Display ul: with list-items for All books (If any) -->
${books.length > 0
? html`<ul class="my-books-list">
   ${books.map(bookCard)}
   </ul>`
: html`<p class="no-books">No books in database!</p>
`}

<!-- Display paragraph: If there are no books in the database -->
</section>`


const bookCard = (book) => html `<li class="otherBooks">
<h3>${book.title}</h3>
<p>Type: ${book.type}</p>
<p class="img"><img src=${book.imageUrl}></p>
<a class="button" href="/details/${book._id}">Details</a>
</li>`

export async function showMyBooks(ctx){

    console.log(getUserData().id);
    
      const  books = await loadAllBooksByOwnerId(getUserData().id);



    ctx.render (myBooksTempl(books));

}