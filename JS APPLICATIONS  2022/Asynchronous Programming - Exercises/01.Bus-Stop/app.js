async function getInfo() {

    let stopIdInputEl = document.getElementById('stopId');
    let stopNameEl = document.getElementById('stopName');
    let busesUlEl = document.getElementById('buses');
    busesUlEl.innerHTML = '';

    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopIdInputEl.value}`;
    console.log(url);

    let btnCheckSubmitEl = document.getElementById('submit');

        try {
            let res = await fetch (url);
            stopIdInputEl.value = '';
            if(res.status !== 200){
                throw new Error;
            }

        console.log( res);

        let result = await res.json();

        console.log(result.name);

        stopNameEl.textContent = result.name;

        let keys = Object.keys(result.buses);
        console.log(result.buses);

        keys.forEach(key => {
            
            
            let curLiEl = elGEnerator('li', `Bus ${key} arrives in ${result.buses[key]} minutes`, busesUlEl);


            
        })
        

        } catch (ex) {

            stopNameEl.textContent = 'Error';
            
        }

        
    function elGEnerator (type, content, parent){

        let element = document.createElement(type);

        element.textContent = content;
        if(parent){

            parent.appendChild(element);

        }

        return element;


    }



}