import { deleteMeme, loadMemeById } from '../api/data.js';
import {html, until, page} from '../lib.js';
import { getUserData } from '../util.js';


const detailsTemplate = (meme, isOwner, onDelete) => html`<section id="meme-details">
<h1>Meme Title: ${meme.title}

</h1>
<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src=${meme.imageUrl}>
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>
            ${meme.description}
        </p>

        <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
        ${isOwner 
        ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
        <button class="button danger" @click=${onDelete}>Delete</button>`
        : html ``}
        
        
    </div>
</div>
</section>`


export async function showDetailsPage (ctx){
    
    const meme = await loadMemeById(ctx.params.id);
    let isOwner = false;
    const userData = getUserData();
    if(userData && userData.id == meme._ownerId){
        isOwner = true;
    }

    ctx.render(detailsTemplate(meme, isOwner, onDelete));

    async function onDelete(e){
        e.preventDefault()

        await deleteMeme(meme._id)

        page.redirect('/allmemes')

    }

}