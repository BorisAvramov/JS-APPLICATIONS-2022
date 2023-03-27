console.log('check');
import {towns as townsNames} from './towns.js'
import {html, render} from './node_modules/lit-html/lit-html.js'
const root = document.getElementById('towns');
const input = document.getElementById('searchText');

const searchBtn = document.getElementsByTagName('button')[0];
searchBtn.addEventListener('click', onSearch);
let result = document.getElementById('result');


const towns = townsNames.map(t =>  ({name : t, match : false}));
console.log(towns);

const townsTemplate = (towns) => html`
<ul>
   ${towns.map(t => html`<li class = ${t.match == true ? 'active' : ''}>${t.name}</li>`)}
</ul>`;

update();   


function onSearch(){

   const match = input.value.trim().toLocaleLowerCase();

   let countMatches = 0;  
   for (const town of towns) {
         if(match && town.name.toLocaleLowerCase().includes(match)){
            town.match = true;
            countMatches ++;
         }
         else {

            town.match = false;
         }

   }
   // const countMathes = towns.filter(t => match && t.name.toLocaleLowerCase().includes(match)).map(t => t.match = true).length;

   result.textContent = `${countMatches} matches found`

   update();


}



function update () {

   render (townsTemplate(towns), root);
}
