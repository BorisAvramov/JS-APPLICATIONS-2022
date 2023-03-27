import { login } from '../api/api.js';
import { creatPair, editPair, loadAllShoes, loadPairById } from '../api/data.js';
import {html, page} from '../lib.js'


const editPairTemp = (pair, onEdit) => html `
<section id="edit">
<div class="form">
  <h2>Edit item</h2>
  <form @submit=${onEdit} class="edit-form">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"
      .value=${pair.brand}
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"
      .value=${pair.model}
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"
      .value=${pair.imageUrl}
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"
      .value=${pair.release}
    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      placeholder="Designer"
      .value=${pair.designer}
    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      placeholder="Value"
      .value=${pair.value}
    />

    <button type="submit">post</button>
  </form>
</div>
</section>`





export  async function showEditPair (ctx){

    const pair = await loadPairById(ctx.params.id)
    ctx.render (editPairTemp(pair, onEdit));

    async function onEdit (e) {

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

        await editPair(pair._id, {brand, model, imageUrl, release, designer, value});
        page.redirect(`/details/${pair._id}`);
       

    }

}