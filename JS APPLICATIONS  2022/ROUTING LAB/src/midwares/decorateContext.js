import { updateNav } from "../app.js";
import { render } from "../../node_modules/lit-html/lit-html.js";

const root = document.getElementsByTagName('main')[0];


export function decorateContext (ctx, next) {
    ctx.render = (template) => render(template, root);
    ctx.updateNav = updateNav;    
    next();
}