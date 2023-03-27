function attachEvents() {
    console.log('TODO...');

    const btnbtnLoadEl = document.getElementById('btnLoad').addEventListener('click', onLOadPhonebookEntries);
    const btnCreate = document.getElementById('btnCreate').addEventListener('click',createEntry );


}

const phonebookUlEl = document.getElementById('phonebook');
let personInputElValue = document.getElementById('person').value;
let phoneInputElValue = document.getElementById('phone').value;



async function onLOadPhonebookEntries () {

    phonebookUlEl.innerHTML = '';

const dataArrEntries = await getPhoneBookEntries();

dataArrEntries.map(p => createLIElEntire(p, phonebookUlEl));


}

async function createEntry (){
    let personInputElValue = document.getElementById('person');
    let phoneInputElValue = document.getElementById('phone');

    // if(personInputElValue.value == '' || phoneInputElValue.value == ''){
    //     return;
    // }

let url = 'http://localhost:3030/jsonstore/phonebook';
const res = await fetch (url,{
    method: 'post',
    'Content-Type': 'application/json',
    body: JSON.stringify({'person': personInputElValue.value, 'phone': phoneInputElValue.value})

});

    const data = await res.json();
    personInputElValue.value = '';
    phoneInputElValue.value = '';
    onLOadPhonebookEntries();
    return data;

}

async function deleteEntry (e) {

    const id = e.target.parentNode.id
    // console.log(e.target.parentNode.textContent);

    const url = 'http://localhost:3030/jsonstore/phonebook/' + id;

    const res = await fetch (url, {
        method: 'delete',
        'Content-Type': 'application/json',

    });

    const data = await res.json();
    onLOadPhonebookEntries();
    return data;


}

function createLIElEntire (p) {

const element = document.createElement('li');
const btnDelete = document.createElement('button');
btnDelete.textContent = 'Delete';
btnDelete.addEventListener('click', deleteEntry);
element.textContent = `${p.person}: ${p.phone}`;
element.setAttribute('id', p._id);
element.appendChild(btnDelete);
phonebookUlEl.appendChild(element);


}

async function getPhoneBookEntries () {

const url = 'http://localhost:3030/jsonstore/phonebook';

const res = await fetch (url);

const data = await res.json(); 

const dataEntries = Object.values (data);

return  dataEntries


}

attachEvents();