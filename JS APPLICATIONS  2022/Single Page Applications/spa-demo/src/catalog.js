import { updateNav } from './app.js';
import {showSection, elGenerator} from './dom.js';
import { showHomeView } from './home.js';
import { showLoginView } from './login.js';

const catalogSectionRef = document.getElementById('catalogSection');
catalogSectionRef.remove();


export function showCatalogView (){

    showSection (catalogSectionRef);
    loadMOvies();


}

export async function loadMOvies () {
    catalogSectionRef.querySelector ('ul').replaceChildren('Loading...');


        const userData = JSON.parse( localStorage.getItem('userData'));

        if(userData == null){
            alert('You have to login!');
            showLoginView();
            updateNav();

            return;
        }

            

        const options = {method: 'get', headers: {}};
       
            options.headers['X-Authorization'] = userData.token;
    
        
    
        const res = await fetch('http://localhost:3030/data/movies', options);

    
    
        if(res.status == 403){
    
            localStorage.removeItem('userData');
            showLoginView();
            updateNav();

    
        }
        const movies = await res.json();
    
        catalogSectionRef.querySelector ('ul').replaceChildren(...movies.map(m => createMOvieCard(m)));
   
   


}

 export function createMOvieCard (movie){

    const element = elGenerator('li', {}, movie.title);

    return  element;
    

}
