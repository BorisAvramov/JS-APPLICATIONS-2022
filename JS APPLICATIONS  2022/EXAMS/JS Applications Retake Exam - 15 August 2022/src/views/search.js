import { searchPairShoes } from '../api/data.js';
import {html, page} from '../lib.js'
import { getUserData, setUserData } from '../util.js';


const searchTemp = (shoes, onSearch, queryString) => html ` <section id="search">
<h2>Search by Brand</h2>

<form @submit=${onSearch} class="search-wrapper cf">
  <input
    id="#search-input"
    type="text"
    name="search"
    placeholder="Search here..."
    required
    .value =${queryString || ''}
  />
  <button type="submit">Search</button>
</form>

<h3>Results:</h3>

<div id="search-container">
  <ul class="card-wrapper">
    <!-- Display a li with information about every post (if any)-->
    ${shoes.length > 0
    ? html`${shoes.map(pairCardTemp)}`
    : html `<h2>There are no results found.</h2>`}

  <!-- Display an h2 if there are no posts -->
  <!-- <h2>There are no results found.</h2> -->
</div>
</section>`


const pairCardTemp = (pair) => html `
<li class="card">
<img src=${pair.imageUrl} alt="travis" />
<p>
  <strong>Brand: </strong><span class="brand">${pair.brand}</span>
</p>
<p>
  <strong>Model: </strong
  ><span class="model">${pair.model}</span>
</p>
<p><strong>Value:</strong><span class="value">${pair.value}</span>$</p>
${pair.isUser 
    ? html`<a class="details-btn" href="/details/${pair._id}">Details</a>`
    : html``}
</li>`


export  async function showSearch (ctx){
    
    const queryString = ctx.querystring.split('=')[1];
    console.log(ctx.querystring);
    let shoes = [];

    if(queryString){

        shoes = await searchPairShoes(queryString);

    }

    shoes.map((s) =>{
        if(getUserData()){

            s.isUser = true

        }
        else{
            s.isUser = false;
        }
    })


    ctx.render (searchTemp(shoes, onSearch, queryString));

    async function onSearch(e){

        e.preventDefault();

        const formData = new FormData (e.target);
        const searchInputValue = formData.get('search');
        console.log(searchInputValue);


        page.redirect(`/search?query=${encodeURIComponent(searchInputValue)}`)
    }   
}