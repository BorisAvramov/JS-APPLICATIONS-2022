// initialization
// - find relevant section
// - detach section from DOM

import { showCreateSection } from "./create.js";
import { e, showViewSection } from "./dom.js";
import { showDetailsSection } from "./details.js";
import { updateNav } from "./app.js";


const homeSection = document.getElementById('home-page');
const movieList = homeSection.querySelector('#movies-list');

const userData = sessionStorage.getItem('userData');

homeSection.querySelector('#createLink').addEventListener('click',(e) => {
    e.preventDefault();
    showCreateSection();
  
  } )
homeSection.remove();

// display logic

export function showHomeSection () {

    showViewSection(homeSection);
    updateNav();
    getMovies();

}
async function getMovies(){
    // const movieList = homeSection.querySelector('')
    const res = await fetch ('http://localhost:3030/data/movies')
    const data = await res.json();

    movieList.replaceChildren(...data.map(m => createMovieCard(m)));


}
function createMovieCard(movie){

    const element = e('li', {className: 'card mb-4'} )
    element.innerHTML = `
    <img class="card-img-top" src="${movie.img}" 
    alt="Card image cap" width=400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a data-id = ${movie._id} href="#/details/6lOxMFSMKML09wux6sAF">
            <button type="button" class="btn btn-info">Details</button>
        </a>
    </div>`
    return element;
}

movieList.addEventListener('click', (e) => {
    
    e.preventDefault();
    let target = e.target;
    if(e.target.tagName == 'BUTTON'){
        target = target.parentNode;
    }   
    if (target.tagName == 'A'){

        const id = target.dataset.id;
        showDetailsSection( id);
          
    }

})
