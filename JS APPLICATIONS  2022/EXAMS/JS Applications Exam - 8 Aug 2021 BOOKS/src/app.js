import { decorateContext } from "./midwares/decorateContext.js";
import { page } from "./lib.js";
import { getUserData } from "./util.js";
import { showCatalog } from "./views/catalog.js";
import { login, logout } from "./api/data.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showAddBook } from "./views/addbook.js";
import { showDetails } from "./views/details.js";
import { showMyBooks } from "./views/mybooks.js";
import { showEdit } from "./views/edit.js";




page(decorateContext)
page('/catalog', showCatalog);
page('/mybooks', showMyBooks);
page('/login', showLogin);
page('/register', showRegister);
page('/addbook', showAddBook);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/',  showCatalog);


updateNav();
page.start();



export function updateNav(){
    

    const userData = getUserData();
    if(userData){

        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`;
        
        

    
    }
    else{
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';

    }
    
    };

    document.querySelector('#user > a:nth-child(4)').addEventListener('click', async (e) => {

        e.preventDefault();

        await logout();
        updateNav();
        page.redirect('/catalog')

    })