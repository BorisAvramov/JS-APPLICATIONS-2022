import {showSection, elGenerator} from './dom.js';
import {updateNav} from './app.js';

    
 const homeSectionRef = document.getElementById('homeSection');
homeSectionRef.remove();

export function showHomeView(ctx){

    ctx.showSection(homeSectionRef)


}

