import {cats} from './catSeeder.js';
import {render, html} from './node_modules/lit-html/lit-html.js';

console.log(cats[0]);

const section = document. getElementById('allCats');
const ulCats = document.createElement('ul');
section.appendChild(ulCats);


const catTemplate = (cat) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button @click=${() => toggle(cat)} class="showBtn">${cat.info ? 'Hide' : 'Show'} status code</button>
        ${cat.info ? html `
        <div class="status"  id=${cat.id}>
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>` : null}
    </div>
</li>`;
function toggle(cat){
    
cat.info = !cat.info
update();


}
const result = html`${cats.map(catTemplate)}`;
cats.forEach(c => c.info = false);

update();


function update(){

    render(html`${cats.map(catTemplate)}`, ulCats)
}
