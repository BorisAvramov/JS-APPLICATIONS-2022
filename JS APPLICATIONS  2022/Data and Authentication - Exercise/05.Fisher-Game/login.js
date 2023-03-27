window.addEventListener('DOMContentLoaded',()=>{

    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData == null) {

        document.getElementById('user').style.display = 'none';
    }
    else {
        document.getElementById('guest').style.display = 'none';
    }

    const form =  document.querySelector('form');
    form.addEventListener('submit', onLogin);

    

})

async function onLogin(event){
    event.preventDefault();
    const formdata = new FormData(event.target);

    const email = formdata.get('email');
    const password = formdata.get('password');
try {
    const res = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({email, password})


    });

    if(res.ok == false){
        const error = await res.json();
        throw new Error(error.messge);
    }
    const data = await res.json();

    const userData = {
        email: data.email,
        id: data._id,
        token: data.accessToken
    }

    // const token = data.accessToken // !!!!!!!!!!!!!!!!!!!!!!!!!!TOKEN!!!!!!!!!!!!!!!!!!!!!

    localStorage.setItem('userData', JSON.stringify(userData));
    window.location = ('index.html');

} catch (error) {
    alert(error.messge);
}
   


}