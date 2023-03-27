import {html, render, page} from './lib.js';
import { decorateContext } from './midwares/decorateContext.js';
import { showCatalog } from './views/catalog.js';
import { getUserData } from './util.js';
import { showLogin } from './views/login.js';
import {  logout } from './api/data.js';
import { showRegister } from './views/register.js';
import { showCreate } from './views/create.js';
import { showMyFrniture } from './views/myfurniture.js';
import { showDetails } from './views/details.js';
import { loadFurniture } from './midwares/loadFurniture.js';
import { showEditForm } from './views/edit.js';



page(decorateContext)
page('/', showCatalog)
page('/create', showCreate)

page('/details/:id', showDetails)
page('/edit/:id', showEditForm)
page('/login', showLogin)
page('/register', showRegister)
page('/my-furniture', showCatalog)

page.start(); 
updateNav();


export function updateNav(){
    
    const userData = getUserData();
    if(userData){

        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
      
    
    }
    else{
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
    
    };

    document.getElementById('logoutBtn').addEventListener('click', onLogout);

    async function onLogout(e){

        await logout();
        updateNav();
        page.redirect('/');

    }