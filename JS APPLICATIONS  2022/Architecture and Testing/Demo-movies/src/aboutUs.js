import {showSection} from './dom.js';

const aboutUsSectionRef = document.getElementById('aboutSection');
aboutUsSectionRef.remove();

export function showAboutView(ctx){

ctx.showSection(aboutUsSectionRef);

}