import { html, until, page } from "../lib.js";
import { deleteFurn, loadFurnitureById } from "../api/data.js";
import { getUserData } from "../util.js";


const detailsTemplate = (furnDetailsPromise) => html`<div class="container">
${until(furnDetailsPromise, html`<p>Loading...</p>`)}
</div>`

const furnitureDetailsTemplate = (furniture, onDelete) => html`<div class="row space-top">
<div class="col-md-12">
    <h1>Furniture Details</h1>
</div>
</div>
<div class="row space-top">
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${furniture.img} />
        </div>
    </div>
</div>
<div class="col-md-4">
    <p>Make: <span>${furniture.make}</span></p>
    <p>Model: <span>${furniture.model}</span></p>
    <p>Year: <span>${furniture.year}</span></p>
    <p>Description: <span>${furniture.description}</span></p>
    <p>Price: <span>${furniture.price}</span></p>
    <p>Material: <span>${furniture.material}</span></p>
    ${furniture.isOwner 
        ? html`<div>
        <a href=${`/edit/${furniture._id}`} class="btn btn-info">Edit</a>
        <a href=”#” class="btn btn-red" @click=${onDelete}>Delete</a>
    </div>`
        : html ``}
    
</div>
</div>`


export function showDetails(ctx){
    
    ctx.render(detailsTemplate(loadFurn(ctx)));

}

async function loadFurn (ctx){
    const furniture = await loadFurnitureById(ctx.params.id);
    // return await loadFurnitureById(ctx.params.id);

    const userData = getUserData();
    if(userData && userData.id == furniture._ownerId){
        furniture.isOwner = true;
    }


    return furnitureDetailsTemplate(furniture, onDelete);

    async function onDelete(event){
        event.preventDefault();
        alert('Confirm deleting item!');
        await deleteFurn(furniture._id);
        page.redirect('/');
    }

}