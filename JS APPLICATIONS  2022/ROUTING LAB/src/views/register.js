import { register } from '../api/data.js';
import {html, page} from '../lib.js';

const registerTemplate = (onSubmit) => html`  <section id="form-sign-up" class="view-section">
<form
  id="register-form"
  class="text-center border border-light p-5"
  action=""
  method=""
  @submit =${onSubmit}
>
  <div class="form-group">
    <label for="email">Email</label>
    <input
      id="email"
      type="email"
      class="form-control"
      placeholder="Email"
      name="email"
      value=""
    />
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      class="form-control"
      placeholder="Password"
      name="password"
      value=""
    />
  </div>

  <div class="form-group">
    <label for="repeatPassword">Repeat Password</label>
    <input
      id="repeatPassword"
      type="password"
      class="form-control"
      placeholder="Repeat-Password"
      name="repeatPassword"
      value=""
    />
  </div>

  <button type="submit" class="btn btn-primary">Register</button>
</form>
</section>`;

export function registerPage(ctx){

    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event){

      event.preventDefault();

      const formData = new FormData(event.target);
      const email = formData.get('email');
      const password = formData.get('password');
      const repass = formData.get('repeatPassword');

      if(!formData || !email){
          
       return alert('All fields are required!');

      }

      if(password != repass){
        return alert('Passwords don\'t match!');
      }
      
      await register(email, password);
      page.redirect('/home');



    }

}