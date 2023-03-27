import {html, until} from '../lib.js';
import {loadAllMemes} from '../api/data.js';

const mmemesTemplate = (memes) => html` <section id="meme-feed">
<h1>All Memes</h1>
<div id="memes">
    ${memes.length > 0 
    ? memes.map(memeCardTemplate)
    : html `<p class="no-memes">No memes in database.</p>`}
    
    <!-- Display : All memes in database ( If any ) -->
  
    <!-- Display : If there are no memes in database -->
</div>
</section>`


const memeCardTemplate = (meme) => html` <div class="meme">
<div class="card">
    <div class="info">
        <p class="meme-title">${meme.title}</p>
        <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
    </div>
    <div id="data-buttons">
        <a class="button" href="/details/${meme._id}">Details</a>
    </div>
</div>
</div>`;



export  async function showAllMemesPage(ctx){
    
    const memmes = await loadAllMemes();
        ctx.render(mmemesTemplate(memmes));

    }   


// async function loadAll(){
    
//     const memmes = await loadAllMemes();
//     console.log(memmes);
//     return memmes.map(memeCardTemplate);

// }
