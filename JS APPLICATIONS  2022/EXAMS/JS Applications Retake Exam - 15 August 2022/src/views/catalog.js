import { login } from '../api/api.js';
import { loadAllShoes } from '../api/data.js';
import {html, page} from '../lib.js'


const catalogTemp = (shoes) => html `  <!-- Dashboard page -->
<section id="dashboard">
  <h2>Collectibles</h2>
  <ul class="card-wrapper">
    <!-- Display a li with information about every post (if any)-->
    ${shoes.length > 0
    ? html `${shoes.map(pairCardTemp)}`
    : html `<h2>There are no items added yet.</h2>`}
  </ul>

  <!-- Display an h2 if there are no posts -->
  
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
<a class="details-btn" href="/details/${pair._id}">Details</a>
</li>`


export  async function showCatalog (ctx){

    const shoes = await loadAllShoes();

    ctx.render (catalogTemp(shoes));
}