window.addEventListener('DOMContentLoaded', start);

async function start() {
    

    let recipes = await getAllRecipesTitles();

    let main = document.querySelector('main');
    main.innerHTML = '';
    recipes.map(r => createTitleElement(r)).forEach(r => main.appendChild(r));
    console.log(recipes);





}

async function toggleTitleElement (id, oldTitleElement){

    oldTitleElement.querySelector('h2').textContent = 'Loading...';
    let recipe = await getRecipeDetailsById(id);
    if(oldTitleElement.children.length == 2) {
        oldTitleElement.innerHTML = `<h2>${recipe.name}</h2>
        <div class="band">
            <div class="thumb">
                <img src=${recipe.img}>
            </div>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${recipe.ingredients.map(i => `<li>${i}</li>`).join('\n')}
                   
                </ul>
            </div>
        </div>
        <div class="description">
            <h3>Preparation:</h3>
            ${recipe.steps.map(s => `<p>${s}</p>`).join('\n')}
           
        </div>`;

        toggled = true;
    }
    else {

        oldTitleElement.innerHTML = `<div class="title">
        <h2>${recipe.name}</h2>
    </div>
    <div class="small">
        <img src=${recipe.img}>
    </div>`;

        toggled = false;


    }




}


 function createTitleElement(recipe) {
    let article = document.createElement('article');
    article.setAttribute('class', 'preview');
    article.innerHTML = `<div class="title">
    <h2>${recipe.name}</h2>
</div>
<div class="small">
    <img src=${recipe.img}>
</div>`;


    article.addEventListener('click',  () =>  toggleTitleElement(recipe._id, article) );

    return article;

}

async function getAllRecipesTitles() {

    let urlRecipes = 'http://localhost:3030/jsonstore/cookbook/recipes';
    let res =
        await fetch(urlRecipes);
    let data = await res.json();

    return Object.values(data);


}

async function getRecipeDetailsById (id){

    let url = `http://localhost:3030/jsonstore/cookbook/details/` + `${id}`;
    let res = await fetch (url);
    console.log(res);
    let data = await res.json();

    return data;


}