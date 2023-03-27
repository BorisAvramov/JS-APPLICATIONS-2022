import { getAllMOvies } from '../api/data.js';
import {html, until} from '../lib.js';

const catalogTemplate = (moviesPromise) => html`<section id="home-page" class="view-section">
<div
  class="jumbotron jumbotron-fluid text-light"
  style="background-color: #343a40"
>
  <img
    src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
    class="img-fluid"
    alt="Responsive image"
    style="width: 150%; height: 200px"
  />
  <h1 class="display-4">Movies</h1>
  <p class="lead">
    Unlimited movies, TV shows, and more. Watch anywhere. Cancel
    anytime.
  </p>
</div>

<h1 class="text-center">Movies</h1>

<section id="add-movie-button" class="user">
  <a href="/create" class="btn btn-warning">Add Movie</a>
</section>

<section id="movie">
  <div class="mt-3">
    <div class="row d-flex d-wrap">
      <div id="movies-list" class="card-deck d-flex justify-content-center">
        ${until(moviesPromise, html`<p>Loading &hellip;</p>`)}
        <!-- movie list -->
      </div>
    </div>
  </div>
</section>
</section>`;

const movieCard = (movie) => html`
<div class="card mb-4">
  <img class="card-img-top" src=${movie.img} alt="Card image cap" width="400">
  <div class="card-body">
    <h4 class="card-title">${movie.title}</h4>
  </div>
  <div class="card-footer">
    <a href=${`/details/${movie._id}`}> 
        <button type="button" class="btn btn-info">Details</button>
    </a>
  </div>
</div>`; 

export function catalogPage (ctx){
  
ctx.render(catalogTemplate(loadMovies()));

}

async function loadMovies (){

 const movies =  await getAllMOvies();
 return movies.map(m => movieCard(m));

}