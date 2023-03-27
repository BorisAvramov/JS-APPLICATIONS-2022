

// initialization
// - find relevant section
// - detach section from DOM

import { e, showViewSection } from "./dom.js";

const detailsSection = document.getElementById('movie-example');
detailsSection.remove();

// display logic

export function showDetailsSection (movieID) {

    showViewSection(detailsSection);
    getMovie(movieID);

}

async function getMovie(id){

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const request = [
  fetch ('http://localhost:3030/data/movies/' + id),
  fetch (`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`)
];

const userData = JSON.parse(sessionStorage.getItem('userData'));

if(userData !== null){
  request.push(fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userData.id}%22`));
}


const [movieRes, likeRes, hasLikedRes] = await Promise.all(request);

const[movieData, likesData, hasLikedData] = await Promise.all(
  [
    movieRes.json(),
    likeRes.json(),
    hasLikedRes && hasLikedRes.json()

  ]
);


    // const res = await fetch('http://localhost:3030/data/movies/' + id);
    // const data = await res.json();

    detailsSection.replaceChildren(createDetails(movieData, likesData, hasLikedData));


}
function createDetails(movie, likes, hasLIked){

  const controls =  e('div', {className: 'col-md-4 text-center'}, 
          e('h3', {className: 'my-3'},'Movie Description'),
          e('p', {}, movie.description),

);

  const userData = JSON.parse ( sessionStorage.getItem('userData'));  
  if(userData !== null){
    if(userData.id == movie._ownerId){
        controls.appendChild(e('a', {className: 'btn btn-danger', href: '#'},'Delete'));
        controls.appendChild(e('a', {className: 'btn btn-warning', href: '#'},'Edit'));

    }
    else{
      if(hasLIked.length > 0){
        controls.appendChild(e('a', {className: 'btn btn-primary', href: '#', onClick: onUnlike},'Unlike'));

      }
      else{
        
        controls.appendChild(e('a', {className: 'btn btn-primary', href: '#', onClick: onLIke},'Like'));

      }

    }

  }

  controls.appendChild(e ('span', {className: 'enrolled-span'}, `Liked ${likes}`));

  // <a class="btn btn-danger" href="#">Delete</a>
  //   <a class="btn btn-warning" href="#">Edit</a>
  //    <a class="btn btn-primary" href="#">Like</a>
  //    <span class="enrolled-span">Liked 1</span>



const element = e('div', {className: 'container'},
      e('div', {className: 'row bg-light text-dark'},
          e('h1', {}, `Movie title: ${movie.title}`),
          e('div', {className: 'col-md-8'}, 
                e('img', {className: 'img-thumbnail', src: movie.img, alt: 'Movie'})
          ),
          controls
         

       )
  );

  return element;

  
async function onLIke(e){

  await fetch (`http://localhost:3030/data/likes`, {
    method: 'post',
    headers: {
      'Content-Type':'application/json',
      'X-Authorization': userData.token,
    },
    body: JSON.stringify({movieId : movie._id})
  });

  showDetailsSection(movie._id);

}

async function onUnlike(){
  const likeID = hasLIked[0]._id;
  await fetch(`http://localhost:3030/data/likes/` + likeID, {
    method: 'delete',
    headers:{
      'Content-Type':'application/json',
      'X-Authorization': userData.token,
    }
  });

showDetailsSection(movie._id);
}

}

/*
  <div class="col-md-4 text-center">
    <h3 class="my-3">Movie Description</h3>
    <p>
      Natasha Romanoff aka Black Widow confronts the darker parts of
      her ledger when a dangerous conspiracy with ties to her past
      arises. Comes on the screens 2020.
    </p>
    <a class="btn btn-danger" href="#">Delete</a>
    <a class="btn btn-warning" href="#">Edit</a>
    <a class="btn btn-primary" href="#">Like</a>
    <span class="enrolled-span">Liked 1</span>
  </div>
</div>
</div> */