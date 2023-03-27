import { creteMovie } from '../api/data.js';
import {html, page} from '../lib.js';

const createTemplate = (onSubmit) => html`<section id="add-movie" class="view-section">
<form @submit=${onSubmit}
  id="add-movie-form"
  class="text-center border border-light p-5"
  action="#"
  method=""
>
  <h1>Add Movie</h1>
  <div class="form-group">
    <label for="title">Movie Title</label>
    <input
      id="title"
      type="text"
      class="form-control"
      placeholder="Title"
      name="title"
      value=""
    />
  </div>
  <div class="form-group">
    <label for="description">Movie Description</label>
    <textarea
      class="form-control"
      placeholder="Description"
      name="description"
    ></textarea>
  </div>
  <div class="form-group">
    <label for="imageUrl">Image url</label>
    <input
      id="imageUrl"
      type="text"
      class="form-control"
      placeholder="Image Url"
      name="img"
      value=""
    />
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</section>`;

export function createPage (ctx){
ctx.render(createTemplate(onSbmit));

async function onSbmit(e){
  e.preventDefault();

  const formData = new FormData (e.target);
  const title = formData.get('title');
  const description = formData.get('description');
  const img = formData.get('img');

  await creteMovie({title, description, img});
  page.redirect('/home');


}

}