
import { loadAllFurnituresByOwnerId } from "../api/data.js";
import { until, html} from "../lib.js";
import { getUserData } from "../util.js";


const myFurnitureTemplate = (loadMyFurniturePromise) => html` <div class="container">
<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
${until(loadMyFurniturePromise, html`<p>Loading &hellip;</p>`)}

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



export function showMyFrniture (ctx){

    ctx.render(myFurnitureTemplate(loadFurnitures()));

}


async function loadFurnitures () {

    const userData = getUserData();
    const furnitures = await loadAllFurnituresByOwnerId(userData.id);

    return furnitures.map(f => furnitureCardTEmplate(f));

}