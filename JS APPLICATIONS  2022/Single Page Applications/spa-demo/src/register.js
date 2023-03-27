import {showSection} from './dom.js';
import { showHomeView } from './home.js';
import {updateNav} from './app.js';


const registerSectionRef = document.getElementById('registerSection');
registerSectionRef.remove();

const form = registerSectionRef.querySelector('form');
form.addEventListener('submit', onSubmit);


export function showRegisterView (){

    showSection (registerSectionRef);
    


}

async function onSubmit(event){

    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repass = formData.get('repass').trim();


    if (password !== repass) {
        alert ('Passwords don\'t match');
        return;
    }
    try {
        
        const res = await fetch ('http://localhost:3030/users/register', {
            method: 'post',
            headers:{
                'Content-Type': 'application/json',
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


    } catch (err) {
        alert(err.message)
    }

}