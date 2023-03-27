const host = 'http://localhost:3030';

async function request (url, options){

try {
    const res = await fetch(host + url, options)
    if(res.ok !== true){
        if (res.status == 403) {

            localStorage.removeItem('userData')
              
        }
        const error = await  res.json()
        throw new Error (error.message);
    }

    if(res.status == 204){
        return res;

    }
    else{
        return await res.json();

    }
     
} catch (err) {
    alert(err.message)
    throw err;
}


}

function createOptions (method = 'get', data){
    const options = {
         method,
         headers: {}

    };
    if(data != undefined){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    const userData = JSON.parse(localStorage.getItem('userData'))
    if(userData !== null){
        options.headers['X-Authorization'] = userData.token;
    }
    return options;
}

export async function get (url){
    return request(url);
} 
export async function post(url, data){
    return request (url, createOptions('post', data));
}
export async function put(url, data){
    return request (url, createOptions('put', data));

}

export async function del (url){
    return request (url,createOptions('delete'));
}

  
export async function login (email, password) {

const res = await request ('/users/login', createOptions('post', {email, password}));
const userData = {
    email: res.email,
    id: res._id,
    token: res.accessToken

};

localStorage.setItem('userData', JSON.stringify(userData))
 
}
export async function register (email, password) {

    const res = await request ('/users/register', createOptions('post', {email, password}));
    const userData = {
        email: res.email,
        id: res._id,
        token: res.accessToken
    
    };
    
    localStorage.setItem('userData', JSON.stringify(userData))
    
    }
 
    export async function logout (){

        await request('/users/logout', createOptions());

        localStorage.removeItem('userData');

    }