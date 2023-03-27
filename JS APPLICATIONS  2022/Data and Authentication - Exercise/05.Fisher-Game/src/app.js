let  userData = null;

window.addEventListener('DOMContentLoaded', () => {

      userData = JSON.parse(localStorage.getItem('userData'));

    if (userData != null){

        document.getElementById('guest').style.display = "none";
        document.querySelector('#addForm .add').disabled = false;
        document.querySelector('body > header > nav > p > span').textContent = userData.email;

    }
    else {
        document.getElementById('user').style.display = 'none';

    }


    document.querySelector('.load').addEventListener('click', loadData);
    document.getElementById('addForm').addEventListener ('submit', onCreateSubmit);
    document.getElementById('main').addEventListener('click', onMainClick);
    document.getElementById('logout').addEventListener('click', onLogOut);


});

async function onLogOut(){

    const res = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization' : userData.token
        }
    });

    localStorage.removeItem('userData');
    window.location = 'index.html';
    return await res.json();
    
}


function onMainClick (event) {
    if(event.target.className == 'update'){
        onUpdate(event.target);
        
    }
    else if (event.target.className == 'delete') {
        onDelete(event.target);
    }

}

async function onUpdate(button){

    const id = button.dataset.id;
    if(!userData){
        window.location = 'login.html';
        return;
    }
    let catchDiv = button.parentNode;
    const obj = {
        'angler': catchDiv.getElementsByClassName('angler')[0].value,
        'weight': catchDiv.getElementsByClassName('weight')[0].value,
        'species': catchDiv.getElementsByClassName('species')[0].value,
        'location': catchDiv.getElementsByClassName('location')[0].value,
        'bait': catchDiv.getElementsByClassName('bait')[0].value,
        'captureTime': catchDiv.getElementsByClassName('captureTime')[0].value,
        

    }
    console.log(obj);
    const res = await fetch ('http://localhost:3030/data/catches/' + id, {
        method: 'put',
        headers:{
            'Content-Type': 'application/json',
            'X-Authorization': userData.token,
        },
        body: JSON.stringify(obj)
        
    });

    const result = await res.json();

    loadData();
    return result;


}


async function onDelete(button){
    if(!userData){
        window.location = 'login.html';
        return;
    }
    const id = button.dataset.id;
    const res = await fetch ('http://localhost:3030/data/catches/'+ id, {
        method: 'delete',
        headers: {
            'X-Authorization': userData.token,
        }
    });

    const data = await res.json();
    loadData();
    return data;

}


async function onCreateSubmit(event) {

    event.preventDefault();
    if(!userData){
        window.location = 'login.html';
        return;
    }


    try {
        let formData = new FormData(event.target);
        let data = [...formData.entries()].reduce((a, [k,v]) => Object.assign(a, {[k] : v}), {});
        if(Object.values(data).some(x => x == '')){
            throw new Error('All fields are required!');
        }

        const res = await fetch ('http://localhost:3030/data/catches', {

            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization':userData.token
            },
            body: JSON.stringify(data)

        });

        if(res.ok != true){
            const error = await res.json();
            throw new Error(error.message);
        }


        const result = await res.json();

        event.target.reset();

        loadData();

        
    } catch (error) {
        alert(error.message);
    }


}

async function loadData (){

    const res = await fetch ('http://localhost:3030/data/catches');

    const data = await res.json();

    console.log(data );

     document.getElementById('catches').replaceChildren(...data.map(i => createPreview(i)));

    

}

  function createPreview(item){

    let isOwner = (userData && userData.id == item._ownerId);

    const element = document.createElement('div');
    element.setAttribute('class', 'catch');
    element.innerHTML = `
    <label>Angler</label>
    <input type="text" class="angler" value="${item.angler}" ${!isOwner ? 'disabled' : ''}>
    <label>Weight</label>
    <input type="text" class="weight" value="${item.weight}"${!isOwner ? 'disabled' : ''}>
    <label>Species</label>
    <input type="text" class="species" value="${item.species}"${!isOwner ? 'disabled' : ''}>
    <label>Location</label>
    <input type="text" class="location" value="${item.location}"${!isOwner ? 'disabled' : ''}>
    <label>Bait</label>
    <input type="text" class="bait" value="${item.bait}"${!isOwner ? 'disabled' : ''}>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${item.captureTime}"${!isOwner ? 'disabled' : ''}>
    <button class="update" data-id="${item._id}"${!isOwner ? 'disabled' : ''}>Update</button>
    <button class="delete" data-id="${item._id}"${!isOwner ? 'disabled' : ''}>Delete</button>`;

    return element;



}