import{render, html} from './node_modules/lit-html/lit-html.js'
 
const root = document.querySelector('tbody');
const searchInput = document.getElementById('searchField');


const template  = (s) => html` 
<tr class=${s.match ? 'select' : ''}>
   <td>${s.item.firstName} ${s.item.lastName}</td>
   <td>${s.item.email}</td>
   <td>${s.item.course}</td>  
</tr>`;

start();

//start:
// getData
// get request
//fetch parse data
//add eent listener
// call update
let students;
async function start () {

   const res = await fetch('http://localhost:3030/jsonstore/advanced/table')
   const data = await res.json();
   students = Object.values(data).map(s => ({item: s, match: false}));
   update();
   document.getElementById('searchBtn').addEventListener('click', onSearch);

}

// update:
//render template

function update(){
   render(students.map(template), root);

}

// on search
//read input
//compare input with all data fields
//mark matching items
//call update

function onSearch(e) {

e.preventDefault();
   const match = searchInput.value.trim().toLocaleLowerCase();

  for (const s of students) {
   console.log(s.item);
      s.match = Object.values(s.item).some (x => x.toLocaleLowerCase().includes(match));
  }
   update();

}

//template:
// display item data
// highlite item based on match


   
