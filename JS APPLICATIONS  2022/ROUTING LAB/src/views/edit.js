import { editMovie } from '../api/data.js';
import {html, until, page} from '../lib.js';

const editTemplate = (editMoviePromisse) => html`<section id="edit-movie" class="view-section">
${until(editMoviePromisse, html `<p>Loading &hellip;</p>`)}
</section>`;



const editFormTemplate = (movie, onSubmit) => html `<form class="text-center border border-light p-5" action="#" method="" @submit=${onSubmit}>
<h1>Edit Movie</h1>
<div class="form-group">
  <label for="title" >Movie Title</label>
  <input
    id="title"
    type="text"
    class="form-control"
    placeholder="Movie Title"
    value=""
    name="title"
    .value=${movie.title}
  />
</div>
<div class="form-group">
  <label for="description">Movie Description</label>
  <textarea
    class="form-control"
    placeholder="Movie Description..."
    name="description"
    .value=${movie.description}
  ></textarea>
</div>
<div class="form-group">
  <label for="imageUrl">Image url</label>
  <input
    id="imageUrl"
    type="text"
    class="form-control"
    placeholder="Image Url"
    value=""
    name="img"
    .value=${movie.img}
  />
</div>
<button type="submit" class="btn btn-primary">Submit</button>
</form>`; 

export function editPage(ctx){

    ctx.render(editTemplate(loadMovie(ctx)));

}

async function loadMovie (ctx){

  const movie = await ctx.moviePromise;

  return editFormTemplate(movie, onSubmit);
 
  async function onSubmit (event){

    event.preventDefault();
    const formdata = new FormData (event.target);
    const id = movie._id;

    const title = formdata.get('title');
    const description = formdata.get('description');
    const img = formdata.get('img');

    await editMovie(id, {title, description, img})

    page.redirect('/home');


  }

}

