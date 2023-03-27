import { editMeme, loadMemeById } from '../api/data.js';
import {html, until, page} from '../lib.js';
import { notification } from '../notification.js';


const editTEmpl = (meme, onEdit) => html `<section id="edit-meme">
<form @submit=${onEdit} id="edit-form">
    <h1>Edit Meme</h1>
    <div class="container">
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}>
           
            </textarea>
        <label for="imageUrl">Image Url</label>
        <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
        <input type="submit" class="registerbtn button" value="Edit Meme">
    </div>
</form>
</section>`

export async function  showEditPage (ctx) {

    const meme = await loadMemeById(ctx.params.id);
    ctx.render (editTEmpl(meme, onEdit));

    async function onEdit (e){

        e.preventDefault();

        const formData = new FormData (e.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        if (title == '' || description == '' || imageUrl == ''){
            // return alert ('All fields are required!');
            return notification ('All fields are required!');
        }

        await editMeme(meme._id, {title, description, imageUrl});

        page.redirect(`/details/${meme._id}`)

    }

}
