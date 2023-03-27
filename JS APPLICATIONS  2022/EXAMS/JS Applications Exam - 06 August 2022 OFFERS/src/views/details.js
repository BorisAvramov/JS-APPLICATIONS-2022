import { applyOfferById, deleteOffer, getAllApplicationsForOfferId, getMyApplicationsByOfferId, loadOfferById } from '../api/data.js';
import {html, page} from '../lib.js'
import { getUserData } from '../util.js';


const detailsTemp = (offer, isUser, isOwner, applications, showApplyButton, onApply, onDel) => html `
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${offer.imageUrl} alt="example1" />
  <p id="details-title">${offer.title}</p>
  <p id="details-category">
    Category: <span id="categories">${offer.category}</span>
  </p>
  <p id="details-salary">
    Salary: <span id="salary-number">${offer.salary}</span>
  </p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Description</h4>
      <span
        >${offer.description}</span
      >
    </div>
    <div id="details-requirements">
      <h4>Requirements</h4>
      <span
        >${offer.requirements}</span
      >
    </div>
  </div>
  <p>Applications: <strong id="applications">${applications}</strong></p>
    <!--Edit and Delete are only for creator-->
    <div id="action-buttons">
        ${offerControlsForEditDelete (offer, isUser, isOwner, onDel)}
        ${applyButtonControl(showApplyButton, onApply)}


             
    </div>
</div>
</section>`


const offerControlsForEditDelete = (offer, isUser, isOwner, onDel) => {

if(isUser && isOwner) {
    return html `
    <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
    <a @click=${onDel} href="javascript:void(0)" id="delete-btn">Delete</a>`;
}
else {
    return null;
}


}

const applyButtonControl = (showApplyButton, onApply) => {

    if(showApplyButton) {
        return html `<a @click=${onApply} href="" id="apply-btn">Apply</a>`
    }
    else{
        return null;
    }
}



export async function showDetails (ctx){

    const userData = getUserData();


    const [offer, aplications, hasMyApplication] = await Promise.all([
        loadOfferById(ctx.params.id),
         getAllApplicationsForOfferId(ctx.params.id),
        userData ? getMyApplicationsByOfferId(ctx.params.id, userData.id) : 0
    ])
      
    let isUser = false;
    let isOwner = false

    if(userData){

        isUser = true;

        if(offer._ownerId == userData.id){
            isOwner = true;

        }

    }
   
    const showApplyButton = userData && isOwner == false && hasMyApplication == 0



    ctx.render (detailsTemp(offer, isUser, isOwner, aplications, showApplyButton, onApply, onDel));


    async function onApply(e) {
        e.preventDefault();

        await applyOfferById(offer._id);

        page.redirect(`/details/${offer._id}`);

    }

    async function onDel (e) {
    e.preventDefault();

    if(confirm("Really Delete this offer?")){
        await deleteOffer(offer._id);
        page.redirect('/catalog');
    }
    
   

    }

}