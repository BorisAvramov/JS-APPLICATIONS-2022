import {html, page} from '../lib.js'


const homeTemp = (offers) => html `<section id="home">
<img
  src="./images/pngkey.com-hunting-png-6697165-removebg-preview.png"
  alt="home"
/>
<h2>Searching for a job?</h2>
<h3>The right place for a new career start!</h3>
</section>`


export async function showHome (ctx) {


    ctx.render (homeTemp()) 

}