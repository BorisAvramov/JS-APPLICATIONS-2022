import {showSection, elGenerator} from './dom.js';
import {showHomeView} from './home.js';
import { showCatalogView } from './catalog.js';
import {showAboutView} from './aboutUs.js';
import {showLoginView} from './login.js';
import {showRegisterView} from './register.js';




document.getElementById('logoutBtn').addEventListener('clcik', onLogout);
document.querySelector('nav').addEventListener('click', onNavigate);


    const sections = {

        'homeBtn': showHomeView,
        'catalogBtn': showCatalogView,
        'aboutBtn': showAboutView,
        'loginBtn': showLoginView,
        'registerBtn': showRegisterView,
    }

    function onNavigate(event){
        
        
         if(event.target.tagName == 'A'){

            if (event.target.id == 'logoutBtn'){
                onLogout();
                return;
            }
            const view = sections[event.target.id];
            if(typeof view == 'function'){
                event.preventDefault();
                view();

            }
         }

    }


    updateNav();


    //Start app in home view
    showHomeView();


    export function updateNav(){

        const userData = JSON.parse(localStorage.getItem('userData'));
        if(userData != null){
        
            
            document.getElementById('userNav').style.display = 'inline-block';
            document.getElementById('guestNav').style.display = 'none';
        
        }
        else {
        
        
            document.getElementById('userNav').style.display = 'none';
            document.getElementById('guestNav').style.display = 'inline-block';
        
        }
    }

    async function onLogout(event){
        
        console.log('dwqedqw');
        const userData = JSON.parse (localStorage.getItem('userData'));

        const res = await fetch('http://localhost:3030/users/logout', {
            method: 'get',
            headers:{
                'X-Authorization': userData.token
            }


        });
        localStorage.removeItem('userData');
        showHomeView();
        updateNav();


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

