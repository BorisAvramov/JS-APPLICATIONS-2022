import { updateNav } from "../app.js";
import { render } from "../lib.js";

const root = document.querySelector('main');


export function decorateContext (ctx, next) {
    ctx.render = (template) => render(template, root);
    ctx.updateNav = updateNav;    
    next();
}