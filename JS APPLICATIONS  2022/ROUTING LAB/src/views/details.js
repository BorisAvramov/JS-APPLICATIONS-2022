import {html, until, page} from '../lib.js';
import {loadMovieById} from '../api/data.js';
import { getUserData } from '../util.js';
import { deleteMovie } from '../api/data.js';

const detailsTemplate = (movieDetailsPromies) => html`<section id="movie-example" class="view-section">
${until(movieDetailsPromies, html`<p>Loading ...</p>`)}
</section>`;

const movieDetailsTemplate = (movie, onDelete) => html`<div class="container">
<div class="row bg-light text-dark">
  <h1>Movie title: ${movie.title}</h1>

  <div class="col-md-8">
    <img
      class="img-thumbnail"
      src=${movie.img}
      alt="Movie"
    />
  </div>
  <div class="col-md-4 text-center">
    <h3 class="my-3">Movie Description</h3>
    <p>
      ${movie.description}
    </p>
    ${movie.isOwner 
        ? html `<a class="btn btn-danger" href="#" @click=${onDelete}>Delete</a>
                <a class="btn btn-warning" href=${`/edit/${movie._id}`}>Edit</a>`
        : html `<a class="btn btn-primary" href="#">Like</a>`}
    
    
    <span class="enrolled-span">Liked 1</span>
  </div>
</div>
</div>`;

export function detailsPage(ctx){
    // const  movieId = ctx.params.id;
    ctx.render(detailsTemplate(loadMOvie(ctx)));

}

async function loadMOvie(ctx){

  const movie = await ctx.moviePromise;
  // const movie =  await loadMovieById(id)
  const movieId = movie._id
  const userData = getUserData();
  if(userData && userData.id == movie._ownerId){
    movie.isOwner = true;
  }

  return movieDetailsTemplate(movie, onDelete);

  async function onDelete(event){
    event.preventDefault();
    await deleteMovie(movieId);
    page.redirect('/home');

  }


}