import { login } from '../api/api.js';
import { deletePair, loadAllShoes, loadPairById } from '../api/data.js';
import {html, page} from '../lib.js'
import { getUserData } from '../util.js';


const detailsTemp = (pair, isUser, isOwner, onDel) => html `
  <section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src=${pair.imageUrl} alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${pair.brand}</span></p>
              <p>
                Model: <span id="details-model">${pair.model}</span>
              </p>
              <p>Release date: <span id="details-release">${pair.release}</span></p>
              <p>Designer: <span id="details-designer">${pair.designer}</span></p>
              <p>Value: <span id="details-value">${pair.value}</span></p>
            </div>
            ${controBtnsEditDelete(pair, isUser,isOwner, onDel)}
            <!--Edit and Delete are only for creator-->
           
          </div>
        </section>`

    const controBtnsEditDelete = (pair, isUser, isOwner, onDel) => {

        if (isUser && isOwner) {

            return html ` 
        <div id="action-buttons">
            <a href="/edit/${pair._id}" id="edit-btn">Edit</a>
            <a @click=${onDel} href="javascript:void(0)" id="delete-btn">Delete</a>
        </div>`;

        }
        else{
            return null;
        }

    }



export  async function showDetails (ctx){

    const userData = getUserData();

    let isUser = false;
    let isOwner = false;

    const pair = await loadPairById(ctx.params.id);

    if(userData && pair._ownerId == userData.id){

        isUser = true;
        isOwner = true;

    }
   

    ctx.render (detailsTemp(pair, isUser, isOwner, onDel));

    async function onDel(e){
        e.preventDefault();

        await deletePair(pair._id);

        page.redirect('/catalog')

    }


}