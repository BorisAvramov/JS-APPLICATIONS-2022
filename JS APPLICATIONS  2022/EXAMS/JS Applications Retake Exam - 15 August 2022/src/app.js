
import { decorateContext } from "./midwares/decorateContext.js";
import { page } from "./lib.js";
import { getUserData } from "./util.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { logout } from "./api/data.js";
import { showRegister } from "./views/register.js";
import { showCatalog } from "./views/catalog.js";
import { showAddPair } from "./views/addPair.js";
import { showDetails } from "./views/details.js";
import { showEditPair } from "./views/edit.js";
import { showSearch } from "./views/search.js";
// import { showLogin } from "./views/login.js";
// import { logout } from "./api/api.js";
// import { showReg } from "./views/register.js";
// import { showCatalog } from "./views/catalog.js";
// import { showHome } from "./views/home.js";
// import { showCreate } from "./views/create.js";
// import { showDetails } from "./views/details.js";
// import { showEdit } from "./views/edit.js";



page(decorateContext)
page('/catalog', showCatalog);
page('/home', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/addPair', showAddPair);
page('/details/:id', showDetails);
page('/edit/:id', showEditPair);
page('/',  showHome);
page('/search', showSearch);


updateNav();
page.start();



export function updateNav(){
    

    const userData = getUserData();
    if(userData){

        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
        
        

    
    }
    else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';

    }
    
    };

    document.querySelector('#wrapper > header > nav > div.user > a:nth-child(2)').addEventListener('click', async (e) => {

        e.preventDefault();

        await logout();
        updateNav();
        page.redirect('/catalog')

    })