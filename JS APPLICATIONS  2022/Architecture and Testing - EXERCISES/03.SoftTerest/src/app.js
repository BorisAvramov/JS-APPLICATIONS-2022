// console.log('efwfew');
import { logout } from './api/data.js'
import {showSection} from './dom.js'
import { showCatalogPage } from "./views/catalog.js"
import { showCreatePage } from "./views/create.js"
import { showDetailsPage } from "./views/details.js"
import { showHomePage } from "./views/home.js"
import { showLoginPage } from "./views/login.js"
import { showRegisterPage } from "./views/register.js"

// // import * as api from './api/api.js'
// import * as api from './api/data.js'
// // set api's funcs to global window makes possible using in browser's console
// window.api = api;

// id : nameView

const links = {
    'homeLink': 'home',
    'getStartedLink':'catalog',
    'catalogLink': 'catalog',
    'loginLink': 'login',
    'registerLink': 'register',
    'createLink': 'create',

}
  
// nameView: function show section
const views = {

    'home': showHomePage,
    'catalog': showCatalogPage,
    'login': showLoginPage,
    'register': showRegisterPage,
    'create': showCreatePage,
    'details': showDetailsPage,

}

const nav = document.querySelector('nav');
nav.addEventListener('click', onNavigate);

document.getElementById('logoutBtn').addEventListener('click',  async (e) => {
    e.preventDefault()
    await logout();
    updateNav();
    goTo('home');


})

const ctx = {
    showSection,
    goTo,
    updateNav,


}

updateNav();
// Start with homePage

goTo('home'); 

function  onNavigate (event) {

    const nameView = links[event.target.id];

    if(nameView){
        event.preventDefault();
        goTo(nameView);
    }

}   

function goTo (nameView, ...params){

    const view = views[nameView];

    if(typeof view == 'function'){
        view(ctx, ...params);
    }

}
function updateNav(){

     const userData = JSON.parse(sessionStorage.getItem('userData'));

     if(userData !== null) {

            [...nav.querySelectorAll('.user')].forEach(l => l.style.display = 'block' );
            [...nav.querySelectorAll('.guest')].forEach(l => l.style.display = 'none');
     }
     else{
        [...nav.querySelectorAll('.user')].forEach(l => l.style.display = 'none' );
        [...nav.querySelectorAll('.guest')].forEach(l => l.style.display = 'block');    
     }

}