import { login } from '../api/data.js';
import {html, page} from '../lib.js';
import { notification } from '../notification.js';


const logTEmplateForm = (onLogin) => html ` <section id="login">
<form @submit=${onLogin} id="login-form">
    <div class="container">
        <h1>Login</h1>
        <label for="email">Email</label>
        <input id="email" placeholder="Enter Email" name="email" type="text">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password">
        <input type="submit" class="registerbtn button" value="Login">
        <div class="container signin">
            <p>Dont have an account?<a href="/register">Sign up</a>.</p>
        </div>
    </div>
</form>
</section>`;

 export function showLoginPage (ctx){



    ctx.render(logTEmplateForm(onLogin));

    async function onLogin(e){

        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();


        if (email == '' || password == ''){
            // return  alert ('All fields are required!');

           return  notification ('All fields are required!');
        }
        
        await login(email, password);
        
        ctx.updateNav();
        page.redirect('/allmemes');
    }
}