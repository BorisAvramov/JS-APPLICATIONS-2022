import {html, render, page} from './lib.js'
import * as api from './api/api.js';
import {getUserData} from './util.js';
import {decorateContext} from './midwares/decorateContext.js';
import {showHomePage} from './views/homePage.js';
import {showAllMemesPage} from './views/allmemesPage.js';
import { showLoginPage } from './views/login.js';
import { logout } from './api/data.js';
import { showRegPage } from './views/register.js';
import { showDetailsPage } from './views/details.Page.js';
import { showCreatePage } from './views/createPage.js';
import { shorMyProfile } from './views/myProfile.js';
import { showEditPage } from './views/edit.js';

// page('/',  () => console.log('home'))

page(decorateContext)

const userData = getUserData();
const showInitialPage = userData ? showAllMemesPage : showHomePage
page('/', showInitialPage)

page('/homepage', showHomePage);
page('/allmemes', showAllMemesPage);
page('/creatememe', showCreatePage);
page('/myprofile', shorMyProfile);
// page('/logout', () =>  console.log('logout'));
page('/login', showLoginPage);
page('/register', showRegPage);
page('/details/:id', showDetailsPage);
page('/edit/:id', showEditPage);


//start application
updateNav()
page.start();

window.api = api;  

export function updateNav(){
    

    const userData = getUserData();
    if(userData){

        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('profile span').textContent = `Welcome, ${userData.email}`;
        
        

    
    }
    else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';

    }
    
    };

    document.querySelector('#container > nav > div.user > div > a:nth-child(3)').addEventListener('click', async (e) =>{
        e.preventDefault();
        await logout();
        updateNav()
        page.redirect ('/homepage');

    })