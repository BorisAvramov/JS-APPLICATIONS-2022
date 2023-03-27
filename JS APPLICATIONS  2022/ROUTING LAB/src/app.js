
import {page, render} from  './lib.js'
import { decorateContext } from './midwares/decorateContext.js';
import { loadMOvie } from './midwares/loadMovie.js';
import { getUserData } from './util.js';
import {catalogPage} from  './views/catalog.js'
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout, register } from './api/data.js';


page(decorateContext);
page('/', catalogPage);
page('/home', catalogPage);
page('/create', createPage);
page('/details/:id',loadMOvie, detailsPage);
page('/edit/:id', loadMOvie, editPage);
page('/login', loginPage);
page('/register', registerPage);

updateNav();
page.start();
   


export function updateNav(){
    const userData = getUserData();
    if(userData){
        [...document.querySelectorAll('nav .user')].forEach(n => n.style.display = 'inline-block');
        [...document.querySelectorAll('nav .guest')].forEach(n => n.style.display = 'none');
    
        document.getElementById('welcome-msg').textContent = `Welcome, ${userData.email}`;
    }
    else{
        [...document.querySelectorAll('nav .user')].forEach(n => n.style.display = 'none');
        [...document.querySelectorAll('nav .guest')].forEach(n => n.style.display = 'block');
    }
    
    };

    document.getElementById('logoutBtn').addEventListener('click', onLogout);

    async function onLogout(e){


        await logout();
        updateNav();
        page.redirect('/home');

    }



