import { register } from '../api/data.js';
import {html, page} from '../lib.js';
import { notification } from '../notification.js';


const regTEmplateForm = (onReg) => html `<section id="register">
<form @submit=${onReg} id="register-form">
    <div class="container">
        <h1>Register</h1>
        <label for="username">Username</label>
        <input id="username" type="text" placeholder="Enter Username" name="username">
        <label for="email">Email</label>
        <input id="email" type="text" placeholder="Enter Email" name="email">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password">
        <label for="repeatPass">Repeat Password</label>
        <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
        <div class="gender">
            <input type="radio" name="gender" id="female" value="female">
            <label for="female">Female</label>
            <input type="radio" name="gender" id="male" value="male" checked>
            <label for="male">Male</label>
        </div>
        <input type="submit" class="registerbtn button" value="Register">
        <div class="container signin">
            <p>Already have an account?<a href="/login">Sign in</a>.</p>
        </div>
    </div>
</form>
</section>`;

 export function showRegPage (ctx){



    ctx.render(regTEmplateForm(onReg));

    async function onReg(e){

        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const username = formData.get('username');
        const repass = formData.get('password');
        let gender = undefined;
        const radioButtonFemale = e.target.querySelector('#female');
        if(radioButtonFemale.checked){
            gender = 'female'
        }
        else{
            gender = 'male'
        }


        if (email == '' || password == '' || username == '' || repass == ''){
          return  notification ('All fields are required!');
        //   return  alert ('All fields are required!');

        }
        if(repass != password){
           return notification('Passwords don\'t match!');
        //    return alert('Passwords don\'t match!');
        }

        
        await register(username, email, password, gender);
        
        ctx.updateNav();
        page.redirect('/allmemes');
    }
}