import { editOffer, loadOfferById } from '../api/data.js';
import {html, page} from '../lib.js'


const editTemp = (offer, onEdit) => html `<section id="edit">
<div class="form">
  <h2>Edit Offer</h2>
  <form @submit=${onEdit} class="edit-form">
    <input
      type="text"
      name="title"
      id="job-title"
      placeholder="Title"
      .value=${offer.title}
    />
    <input
      type="text"
      name="imageUrl"
      id="job-logo"
      placeholder="Company logo url"
      .value=${offer.imageUrl}

    />
    <input
      type="text"
      name="category"
      id="job-category"
      placeholder="Category"
      .value=${offer.category}

    />
    <textarea
      id="job-description"
      name="description"
      placeholder="Description"
      rows="4"
      cols="50"
    >${offer.description}</textarea>
    <textarea
      id="job-requirements"
      name="requirements"
      placeholder="Requirements"
      rows="4"
      cols="50"
    >${offer.requirements}</textarea>
    <input
      type="text"
      name="salary"
      id="job-salary"
      placeholder="Salary"
      .value=${offer.salary}
    />

    <button type="submit">post</button>
  </form>
</div>
</section>`


export async function showEdit (ctx) {

    const offer = await loadOfferById(ctx.params.id);

    ctx.render (editTemp(offer, onEdit));

    async function onEdit(e) {
        e.preventDefault ();

        const formData = new FormData (e.target);

        const title = formData.get('title');
        const imageUrl = formData.get('imageUrl');
        const category = formData.get('category');
        const description = formData.get('description');
        const requirements = formData.get('requirements');
        const salary = formData.get('salary');


        const params = [title, imageUrl, category, description, requirements, salary];

        if(params.some(p => p == '')){

            return alert ('All fields are reqiored!');
        }

        await editOffer(offer._id, {title, imageUrl, category, description, requirements, salary});

        page.redirect(`/details/${offer._id}`);


    }

}