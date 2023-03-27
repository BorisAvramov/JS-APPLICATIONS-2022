import { register } from '../api/data.js';
import {html, page} from '../lib.js'

const registerTemp = (onReg) => html `
    <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${onReg} class="login-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="#">Login</a></p>
            </form>
          </div>
        </section>`

export function showReg (ctx) {

    ctx.render (registerTemp(onReg));

    async function onReg (e){

        e.preventDefault();

        const formData = new FormData (e.target);

        const email = formData.get ('email');
        const password = formData.get ('password');
        const repass = formData.get ('re-password');

        if(email == '' || password == '' || repass == ''){
            return alert ('All fields are reqiored!');
        }
        if(repass !== password){
            return alert ('Passwords don\'t match!');

        }


        await register(email, password);

        ctx.updateNav();
        page.redirect ('/catalog');

    }

}

