import { editBook, loadBookById } from '../api/data.js';
import {html, page} from '../lib.js'


const editTempl = (book, onEdit) => html `<section id="edit-page" class="edit">
<form @submit=${onEdit} id="edit-form" action="#" method="">
    <fieldset>
        <legend>Edit my Book</legend>
        <p class="field">
            <label for="title">Title</label>
            <span class="input">
                <input type="text" name="title" id="title" value="A Court of Thorns and Roses" .value=${book.title}>
            </span>
        </p>
        <p class="field">
            <label for="description">Description</label>
            <span class="input">
                <textarea name="description"
                    id="description">${book.description}</textarea>
            </span>
        </p>
        <p class="field">
            <label for="image">Image</label>
            <span class="input">
                <input type="text" name="imageUrl" id="image" .value=${book.imageUrl}>
            </span>
        </p>
        <p class="field">
            <label for="type">Type</label>
            <span class="input">
                <select id="type" name="type" .value=${book.type}>
                    <option value="Fiction" selected>Fiction</option>
                    <option value="Romance">Romance</option>
                    <option value="Mistery">Mistery</option>
                    <option value="Classic">Clasic</option>
                    <option value="Other">Other</option>
                </select>
            </span>
        </p>
        <input class="button submit" type="submit" value="Save">
    </fieldset>
</form>
</section>`

export async function showEdit (ctx) {

const book = await loadBookById (ctx.params.id);

ctx.render (editTempl(book, onEdit));

async function onEdit(e){
    console.log('in');
    e.preventDefault();

    const formData = new FormData (e.target);
    
    const title = formData.get('title');
    const description = formData.get('description');
    const imageUrl = formData.get('imageUrl');
    const type = formData.get('type');


    const params = [title,description,imageUrl,type];
    if(params.some(p => p == '')){
        return alert('All fields are required!')
    }

    await editBook(book._id, {title,description,imageUrl,type});

    page.redirect(`/details/${book._id}`);

}

}


