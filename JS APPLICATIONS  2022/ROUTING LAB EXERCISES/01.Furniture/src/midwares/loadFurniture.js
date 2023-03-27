import {loadFurnitureById  } from "../api/data.js";

export function loadFurniture(ctx, next){

     ctx.moviePromise = loadFurnitureById(ctx.params.id);

    next();

}