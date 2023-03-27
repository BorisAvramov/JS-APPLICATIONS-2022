import { login } from '../api/data.js';
import { updateNav } from '../app.js';
import {html, page} from '../lib.js';

const loginTemplate = (onSubmit, errorMessage) => html`<div class="container">
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
            ${errorMessage ? html`<div class="error" class="form-group">${errorMessage}</div>` : null}
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>
</div>`;

export function showLogin (ctx){

    update();

    function update(errorMessage){
        ctx.render(loginTemplate(onSubmit, errorMessage));
    }


    async function onSubmit(e){

        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {

            if(!email || !password ){
                throw new Error('All fields are required!');
            }
    
           

            await login(email, password);

            ctx.updateNav();
            page.redirect('/');

        } catch (error) {
            update(error.message);
        }
     
        

    }

}

