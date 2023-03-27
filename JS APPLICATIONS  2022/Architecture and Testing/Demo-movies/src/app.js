import {showSection, elGenerator} from './dom.js';
import {showHomeView} from './home.js';
import { showCatalogView } from './catalog.js';
import {showAboutView} from './aboutUs.js';
import {showLoginView} from './login.js';
import {showRegisterView} from './register.js';
import { logout } from './API/data.js';




document.getElementById('logoutBtn').addEventListener('clcik', onLogout);
document.querySelector('nav').addEventListener('click', onNavigate);


    const links = {

        'homeBtn': 'home',
        'catalogBtn': 'catalog',
        'aboutBtn': 'about',
        'loginBtn': 'login',
        'registerBtn': 'register',
    }

    const views = {
        'home': showHomeView,
        'catalog': showCatalogView,
        'about': showAboutView,
        'login': showLoginView,
        'register': showRegisterView     

    }

    let ctx = {
        updateNav,
        goTo,
        showSection

    }


    function onNavigate(event){
        
        
         if(event.target.tagName == 'A'){
            const name = links[event.target.id];
            if(name){
                event.preventDefault();

                goTo(name);

            }
          
         }

    }

    function goTo (name, ...params){
        const view = views[name];
        if(typeof view == 'function'){
            view(ctx,...params);

        }

    }

    updateNav();


    //Start app in home view
    goTo('home');


    export function updateNav(){

        const userData = JSON.parse(localStorage.getItem('userData'));
        if(userData != null){
        
            
            document.getElementById('userNav').style.display = 'inline-block';
            document.getElementById('guestNav').removeAttribute('display');
        
        }
        else {
        
        
            document.getElementById('userNav').removeAttribute('display');
            document.getElementById('guestNav').style.display = 'inline-block';
        
        }
    }
    
    async function onLogout(event){
        event.stopImmediatePropagation();
        await logout();

        // const userData = JSON.parse (localStorage.getItem('userData'));

        // const res = await fetch('http://localhost:3030/users/logout', {
        //     method: 'get',
        //     headers:{
        //         'X-Authorization': userData.token
        //     }


        // });
        // localStorage.removeItem('userData');
        updateNav();
 
        goTo ('home');


    }


// function onNavigate (event) {

//     if(event.target.tagName == 'BUTTON') {

//         switch (event.target.id) {
//             case 'homeBtn':
//                 showSection('homeSection');
//                 break;
//             case 'catalogBtn':
//                 showSection('catalogSection');
//                 break;
//             case 'aboutBtn':
//                 showSection('aboutSection');
//                 break;
//             default:
//                 break;
//         }

//     }
// }

