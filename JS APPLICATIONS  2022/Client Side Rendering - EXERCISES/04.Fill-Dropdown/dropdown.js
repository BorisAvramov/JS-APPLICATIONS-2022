import {html, render} from './node_modules/lit-html/lit-html.js'
const root = document.getElementById('menu');
const form = document.querySelector('form');
const textToAdd = document.getElementById('itemText');

const templateSelect = (textsData) => html`${textsData.map(t => html`<option value=${t._id}>${t.text}</option>`)}`;


// start:
// add event listener
// call getData

start();

function start () {

    form.addEventListener('submit', addItem);

    getData();


}




// getData : 
//fetch and parse data
// call update
async function getData () {

    const res = await fetch ('http://localhost:3030/jsonstore/advanced/dropdown');

    let data = await res.json();
    data =  Object.values(data);

    update (data);

}

// update:
//render template

function update (data) {
    render (templateSelect(data), root);

}


// addItem
//  read input 
// make post request
// on success,
// call getData 




async function addItem(e) {
    e.preventDefault();
   
    const formData = new FormData ();

    if(textToAdd.value == ''){
        return;
    }

    const res  = await fetch ('http://localhost:3030/jsonstore/advanced/dropdown', {

        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: textToAdd.value})

    });

    getData();

    textToAdd.value = '';

}





 







