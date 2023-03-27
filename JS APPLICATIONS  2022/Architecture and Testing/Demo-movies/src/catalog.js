import { updateNav } from './app.js';
import {showSection, elGenerator} from './dom.js';
import { showHomeView } from './home.js';
import { showLoginView } from './login.js';
import * as api from './API/api.js'; // architecture
const catalogSectionRef = document.getElementById('catalogSection');
catalogSectionRef.remove();


export function showCatalogView (ctx){

    ctx.showSection (catalogSectionRef);
    loadMOvies();


}

export async function loadMOvies () {

    // architecture
    catalogSectionRef.querySelector ('ul').replaceChildren('Loading...');

    const movies = await api.get('/data/movies');

    catalogSectionRef.querySelector ('ul').replaceChildren(...movies.map(m => createMOvieCard(m)));


        // const userData = JSON.parse( localStorage.getItem('userData'));

        // if(userData == null){
        //     alert('You have to login!');
        //     showLoginView();
        //     updateNav();

        //     return;
        // }

            

        // const options = {method: 'get', headers: {}};
       
        //     options.headers['X-Authorization'] = userData.token;
    
        
    
        // const res = await fetch('http://localhost:3030/data/movies', options);

    
    
        // if(res.status == 403){
    
        //     localStorage.removeItem('userData');
        //     showLoginView();
        //     updateNav();

    
        // }
        // const movies = await res.json();
    
   
   


}

 export function createMOvieCard (movie){

    const element = elGenerator('li', {}, movie.title);

    return  element;
    

}
