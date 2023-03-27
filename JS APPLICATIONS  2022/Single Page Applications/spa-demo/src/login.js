import {showSection, elGenerator} from './dom.js';
import { showHomeView } from './home.js';
import {updateNav} from './app.js';




const userData = localStorage.getItem('userData');
if(userData && userData.token !== null){

    document.getElementById('registerBtn').style.display = 'none';
    document.getElementById('loginBtn').style.display = 'none';

}
else {

    document.getElementById('logoutBtn').style.display = 'none';



}



const loginSectionRef = document.getElementById('loginSection');
loginSectionRef.remove();

const form = loginSectionRef.querySelector('form');
form.addEventListener('submit', onSubmit);

export function showLoginView (){

    showSection (loginSectionRef);
    


}

async function onSubmit(event){

    event.preventDefault(); 
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        
        const res = await fetch('http://localhost:3030/users/login',{
            method: 'post',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email, password})


        });

        if(res.ok !== true){
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        const userData = {
            email: data.email,
            username: data.username,
            id: data._id,
            token: data.accessToken,
        }

        localStorage.setItem('userData', JSON.stringify(userData));
        
        	updateNav();
        showHomeView();

    } catch (er) {
        alert(er.message);
    }

}