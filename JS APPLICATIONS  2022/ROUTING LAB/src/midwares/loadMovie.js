import { loadMovieById } from "../api/data.js";

export function loadMOvie(ctx, next){

     ctx.moviePromise = loadMovieById(ctx.params.id);

    next()

}