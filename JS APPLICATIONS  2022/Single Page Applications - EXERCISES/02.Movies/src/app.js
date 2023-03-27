import {} from ''

// create placeholders modules for views X  

//configure and test navigation

//implement modules

//- create async functions for request

//- implement DOM logic

import { showHomeSection } from "./home.js";
import { showLoginSection } from "./login.js";
import { showRegisterSection } from "./register.js";


showHomeSection();
updateNav();


const views = {
   'homeLink': showHomeSection,
   'loginLink': showLoginSection,
   'registerLink': showRegisterSection,
  
}


document.querySelector('nav').addEventListener('click', onNavigation);
document.getElementById('logoutBtn').addEventListener('click', onLogout)

function onNavigation(event){

  if(event.target.tagName == 'A') {
    const view = views[event.target.id]
    if(typeof view == 'function'){
      event.preventDefault();
      view();
    }

  }


}

export function updateNav (){

  const userData = JSON.parse ( sessionStorage.getItem('userData'));

  if(userData != null){
    document.querySelectorAll('.user').forEach(e => e.style.display = 'inline-block');
    document.querySelectorAll('.guest').forEach(e => e.style.display = 'none')
    document.getElementById('welcome-msg').textContent = `Welcome, ${userData.email}`;


  }
  else{
    document.querySelectorAll('.user').forEach(e => e.style.display = 'none');
    document.querySelectorAll('.guest').forEach(e => e.style.display = 'inline-block')
    document.getElementById('welcome-msg').textContent = `Welcome, guest`;

  }


}
async function onLogout(e){
e.preventDefault();
e.stopImmediatePropagation();
  const options = {method: 'get', headers: {}}
const userData = JSON.parse(sessionStorage.getItem('userData'));

if(userData !== null){
options.headers['X-Authorization'] = userData.token
}

const res = await fetch('http://localhost:3030/users/logout',options);

if(res.status == 403){
showLoginSection();
updateNav();
return;
  
}

sessionStorage.removeItem('userData');

showLoginSection();
updateNav();



}
//Order of views:
// - catalog (home view) X
// - login
// - register
// - logout
// - create 
// - details
// - likes
// - edit (load to edit / populate form / validation / async requeest)
// - delete

