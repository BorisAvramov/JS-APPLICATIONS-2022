import {html} from '../lib.js'
import {loadAllBooks} from '../api/data.js'

const catalogTempl = (books) => html`<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
<!-- Display ul: with list-items for All books (If any) -->
${books.length > 0
? html`<ul class="other-books-list">
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

export async function showCatalog(ctx){

    
  
      const  books = await loadAllBooks();

    


    ctx.render (catalogTempl(books));

}