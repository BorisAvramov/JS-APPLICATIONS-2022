import { login } from '../api/api.js';
import { creatPair, loadAllShoes } from '../api/data.js';
import {html, page} from '../lib.js'


const addPairTemp = (onPost) => html `
<section id="create">
          <div class="form">
            <h2>Add item</h2>
            <form @submit=${onPost} class="create-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>`





export  async function showAddPair (ctx){


    ctx.render (addPairTemp(onPost));

    async function onPost (e) {

        e.preventDefault();

        const formData = new FormData(e.target);

        const brand = formData.get('brand');
        const model  = formData.get('model');
        const imageUrl  = formData.get('imageUrl');
        const release  = formData.get('release');
        const designer  = formData.get('designer');
        const value  = formData.get('value');

        const params = [brand, model, imageUrl, release, designer, value];

        if(params.some(p => p == '')){

           return alert ('All fields are required!');


        }

        await creatPair({brand, model, imageUrl, release, designer, value});
        page.redirect('/catalog');
       

    }

}