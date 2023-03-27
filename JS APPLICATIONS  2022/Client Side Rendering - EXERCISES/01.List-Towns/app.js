import {html, render} from './node_modules/lit-html/lit-html.js'

// on submit:
// parse data
// render template

//tempelate:
//ul with li for each array item

const root = document.getElementById('root');

document.querySelector('form').addEventListener('submit', (event)=> {
    event.preventDefault();
   const towns = document.getElementById('towns').value.split(',').map(t => t.trim());

    render(template(towns), root );

});
const template = (towns) => html`
 <ul>
    ${towns.map(t => html`<li>${t}</li>`)}
</ul>`