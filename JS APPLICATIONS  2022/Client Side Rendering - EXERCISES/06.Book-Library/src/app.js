import { showCatalog } from './catalog.js';
import { showCreate } from './create.js';
import { showUpdate } from './update.js';
import {render} from './utility.js';

console.log('My requests...')
// main module:
// init modules with dependacies
// - renerin    
// - comunication between modules
// 

const root = document.body;


const ctx = {
    update
};


update();

function update () {

    render([showCatalog(ctx),
        showCreate(ctx),
        showUpdate(ctx)], root)

}



 




