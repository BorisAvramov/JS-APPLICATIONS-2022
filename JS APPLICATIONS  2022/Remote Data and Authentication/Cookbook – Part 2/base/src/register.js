window.addEventListener('load', async () => {
    
    const form = document.querySelector('form');
    form.addEventListener('submit', onRegister);

});


async function onRegister (event) {
    const url = 'http://localhost:3030/users/register';
    event.preventDefault();

    const form = event.target;
    const formData = new FormData (form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass = formData.get('rePass').trim();

    

    try {
        const res =  await fetch(url, {

            method: 'post',
            headers: {
    
                'Content-Type': 'application/json'
    
            },
            body: JSON.stringify({email, password})
    
        });
    
        if (res.ok != true){
            const error = await res.json();
            throw new Error(error.message);
    
        }

        const data = await res.json();

        const token = data.accessToken;
        console.log(token);
        localStorage.setItem('token', token);

        window.location = '/index.html';

    } catch (error) {
        alert(error.message);
    }

   



}