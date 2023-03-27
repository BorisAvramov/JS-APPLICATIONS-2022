import { loadAllFurnitures, loadAllFurnituresByOwnerId } from "../api/data.js";
import { until, html     } from "../lib.js";
import { getUserData } from "../util.js";


const catalogTemplate = (loadFurPromise, userPageBool) => html`<div class="container">
<div class="row space-top">
    <div class="col-md-12">
        ${userPageBool 
        ? html`<h1>My Furniture</h1>
        <p>This is a list of your publications.</p>`
        : html`<h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>`}
    </div>
</div>
<div class="row space-top">
    ${until(loadFurPromise, html`<p>Loading &hellip;</p>`)}
    
</div>
</div>`;

const furnitureCardTEmplate = (furniture) => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                    <img src=${furniture.img} />
                    <p>Description here</p>
                    <footer>
                        <p>Price: <span>${furniture.price} $</span></p>
                    </footer> 
                    <div>
                        <a href=${`/details/${furniture._id}`} class="btn btn-info">Details</a>
                    </div>
            </div>
        </div>
    </div>`;



export function showCatalog (ctx){
    console.log(ctx);
    const userPageBool = ctx.pathname == '/my-furniture' 
    // console.log(userPageBool);   
    ctx.render(catalogTemplate(loadFurnitures(userPageBool, ctx), userPageBool));

}


async function loadFurnitures (userPageBool, ctx) {

    let furnitures = [];
    if(userPageBool){
        furnitures = await loadAllFurnituresByOwnerId(getUserData().id);
    }
    else {
        furnitures = await loadAllFurnitures()
    }


    return furnitures.map(f => furnitureCardTEmplate(f));

}