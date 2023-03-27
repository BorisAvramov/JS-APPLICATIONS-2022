
import {html, until, page} from '../lib.js'
import {editFurniture, loadFurnitureById} from '../api/data.js'

const editTemplate = (loadFormPromise) => html `  <div class="container">
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
${until(loadFormPromise, html`<p>Loading &hellip;</p>`)}
</div>`


const formDetailsTemplate = (furniture,onSubmit, invalid) => html`<form @submit=${onSubmit}>
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-make">Make</label>
            <input class=${'form-control' + (invalid.make ? ' is-invalid' : ' is-valid')} id="new-make" type="text" name="make" .value=${furniture.make}>
        </div>
        <div class="form-group has-success">
            <label class="form-control-label" for="new-model">Model</label>
            <input class=${'form-control' + (invalid.model ? ' is-invalid' : ' is-valid')} id="new-model" type="text" name="model" .value=${furniture.model}>
        </div>
        <div class="form-group has-danger">
            <label class="form-control-label" for="new-year">Year</label>
            <input class=${'form-control' + (invalid.year ? ' is-invalid' : ' is-valid')} id="new-year" type="number" name="year" .value=${furniture.year}>
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-description">Description</label>
            <input class=${'form-control' + (invalid.description ? ' is-invalid' : ' is-valid')} id="new-description" type="text" name="description" .value=${furniture.description}>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-price">Price</label>
            <input class=${'form-control' + (invalid.price ? ' is-invalid' : ' is-valid')} id="new-price" type="number" name="price" .value=${furniture.price}>
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-image">Image</label>
            <input class=${'form-control' + (invalid.img ? ' is-invalid' : ' is-valid')} id="new-image" type="text" name="img" .value=${furniture.img}>
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-material">Material (optional)</label>
            <input class="form-control is-valid" id="new-material" type="text" name="material" .value=${furniture.material}>
        </div>
        <input type="submit" class="btn btn-info" value="Edit" />
    </div>
</div>
</form>`;

let update;

export function showEditForm (ctx){


    update = (invalid) => ctx.render(editTemplate(loadFurniture(ctx, invalid)));
    update(false);
    

}

async function loadFurniture (ctx, invalid){
    
    const furniture = await loadFurnitureById(ctx.params.id);
    return formDetailsTemplate(furniture, onSubmit, invalid);

    async function onSubmit(e){

        e.preventDefault();

        let invalid = {
            'make': false,
            'model': false,
            'year': false,
            'description': false,
            'price': false,
            'img': false,
            
        }

        const formData = new FormData(e.target);

        const make = formData.get('make');
        const model = formData.get('model');
        const year = Number(formData.get('year'));
        const description = formData.get('description');
        const price = Number(formData.get('price'));
        const img = formData.get('img');
        const material = formData.get('material');


        if(make.length < 4 || make == ''){
            
            invalid.make = true;

        }
        if(model.length < 4 || make == ''){
            
            invalid.model = true;

        }
        if(year <= 1950 || year >= 2050){
            
            invalid.year = true;

        }
        if(description.length <= 10){
            
            invalid.description = true;

        }
        if(price <= 0){
            
            invalid.price = true;

        }
        if( img == ''){
            
            invalid.img = true;

        }

       if(Object.values(invalid).some(v => v == true)){

        update(invalid);

       }
       else {
        
        
        await editFurniture(furniture._id, {make, model, year, description, price, img, material});
        page.redirect('/');

       }



    }

}