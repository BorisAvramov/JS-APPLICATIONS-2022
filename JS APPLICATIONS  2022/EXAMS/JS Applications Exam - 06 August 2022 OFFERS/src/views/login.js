import { login } from '../api/data.js';
import {html, page} from '../lib.js'

const loginTemp = (onLogin) => html `
<section id="login">
<div class="form">
  <h2>Login</h2>
  <form @submit=${onLogin} class="login-form">
    <input type="text" name="email" id="email" placeholder="email" />
    <input
      type="password"
      name="password"
      id="password"
      placeholder="password"
    />
    <button type="submit">login</button>
    <p class="message">
      Not registered? <a href="#">Create an account</a>
    </p>
  </form>
</div>
</section>`

export function showLogin (ctx) {

    ctx.render (loginTemp(onLogin));

    async function onLogin (e){

        e.preventDefault();

        const formData = new FormData (e.target);

        const email = formData.get ('email');
        const password = formData.get ('password');

        if(email == '' || password == ''){
            return alert ('All fields are reqiored!');
        }


        await login(email, password);

        ctx.updateNav();
        page.redirect ('/catalog');

    }

}

