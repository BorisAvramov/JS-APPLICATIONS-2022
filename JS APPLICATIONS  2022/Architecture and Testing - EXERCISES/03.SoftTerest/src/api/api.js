// abstract module to manage CRUD requests
// api <=> REST service / api's jobs is to know how REST s. works

const host = 'http://localhost:3030';

// MAIN FUNCTION FOR ANY REQUEST
// abstract
async function request ( url, options){

    try {

        const response = await fetch(host + url, options);

        if(response.ok != true){
            if(response.status == 403){
                sessionStorage.removeItem('userData')
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if(response.status == 204){
            return response;
        }
        else{
            return await response.json();
        }


    } catch (err) {
        alert(err.message)
        throw err;
    }

}

// FUNC FOR OPTIONS OF REQUEST => METHOD / HEADERS / BODY
// abstarct
function createOptions (method = 'get', data){

    const options = {
        method,
        headers: {}

    };

    if(data != undefined){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if(userData != null){
        options.headers['X-Authorization'] = userData.token;
    }
    return options;

}

// ANY TYPE OF REQUEST => GET / POST / PUT / DELETE  // THEY INVOKE REÙEST FUNC 
// abstract

export async function get(url){

    return request(url, createOptions());
}
export async function post(url, data){
    return request (url, createOptions('post', data));

}
export async function put (url, data){
    return request (url, createOptions('put', data));
}
export async function del (url){
    return request (url, createOptions('delete'));
}
  
// FUNC FOR LOGIN REGISTER // THEY INVOKE GET, POST FUNCS
//url is only after http://localhost:3030
// not abstract

export async function login (email, password) {

const result = await post ('/users/login', {email, password});

const userData = {
    email: result.email,
    id: result._id,
    token: result.accessToken
};

sessionStorage.setItem('userData', JSON.stringify(userData));


} 

export async function register (email, password) {

    const result = await post ('/users/register', {email, password});
    
    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    };
    
    sessionStorage.setItem('userData', JSON.stringify(userData));
    
    } 

    export async function logout (){

        // const result = 
        await get('/users/logout');
        // const userData = result.userData;

        sessionStorage.removeItem('userData');

    }