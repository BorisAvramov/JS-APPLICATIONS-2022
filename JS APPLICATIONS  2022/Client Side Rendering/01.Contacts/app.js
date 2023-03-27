import {contacts} from './contacts.js'
import {html, render} from  '../node_modules/lit-html/lit-html.js'
import {styleMap} from  '../node_modules/lit-html/directives/style-map.js'


// functional desicion without delegation                ********************************************

// const contactTemplate = (data, onDetails) => html`
//  <div class="contact card">
//             <div>
//                 <i class="far fa-user-circle gravatar"></i>
//             </div>
//             <div class="info">
//                 <h2>Name: ${data.name}</h2>
//                 <button class="detailsBtn" @click=${() => onDetails(data)}>${data.details ? 'Hide' : 'Details'}</button>
//                 <div class="details" id=${data.id} style=${styleMap({display: data.details ? 'block' : 'none'})}>
//                     <p>Phone number: ${data.phoneNumber}</p>
//                     <p>Email: ${data.email}</p>
//                 </div>
//             </div>
// </div>`


// start();

// function start(){

//     const container = document.getElementById('contacts')

//     onRender();


//     function onDetails(contact){

//         contact.details = !(contact.details);
         
//         onRender();

//     }


//     function onRender (){
        
//         render (contacts.map(c => contactTemplate(c, onDetails)), container); 

//     }
   
// }

// desicion with delegation  ********************************************


const contactTemplate = (data) => html`
 <div class="contact card">
            <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
            <div class="info">
                <h2>Name: ${data.name}</h2>
                <button class="detailsBtn">Details</button>
                <div class="details">
                    <p>Phone number: ${data.phoneNumber}</p>
                    <p>Email: ${data.email}</p>
                </div>
            </div>
</div>`

start();

function start(){


    const container = document.getElementById('contacts')
    container.addEventListener('click', onClick);

    onRender();
    
    function onClick(event){
        
        if(event.target.tagName == 'BUTTON'){

            
            if(event.target.parentNode.querySelector('.details').style.display == 'block'){

                event.target.parentNode.querySelector('.details').style.display = 'none'

            }
            else {
                event.target.parentNode.querySelector('.details').style.display = 'block'

            }


        }


    }

    function onRender (){
        
                render (contacts.map(c => contactTemplate(c)), container); 
        
            }

}