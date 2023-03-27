import { createMeme } from '../api/data.js';
import {html, until, page} from '../lib.js';
import { notification } from '../notification.js';


const createTemplate = (onCreate) => html `<section id="create-meme">
<form @submit=${onCreate} id="create-form">
    <div class="container">
        <h1>Create Meme</h1>
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title">
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description"></textarea>
        <label for="imageUrl">Meme Image</label>
        <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
        <input type="submit" class="registerbtn button" value="Create Meme">
    </div>
</form>
</section>`


export function showCreatePage (ctx){

    

    ctx.render (createTemplate(onCreate));

    async function onCreate (e){
        e.preventDefault();

        const formData = new FormData (e.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        if (title == '' || description == '' || imageUrl == ''){
            // return alert ('All fields are required!');
            return notification ('All fields are required!');
        }

        await createMeme({title, description, imageUrl});
        ctx.updateNav();
        page.redirect('/allmemes');

    }
}

