function solve() {

    let infoBoxEl = document.getElementsByClassName('info')[0];
    let btnDepartEl = document.getElementById('depart');
    let btnArriveEl = document.getElementById('arrive');


    let stop = { 'next' : 'depot'};
   


    async function depart() {
        
        btnDepartEl.disabled = 'true';
        btnArriveEl.removeAttribute('disabled');
        let res = await fetch (`http://localhost:3030/jsonstore/bus/schedule/${stop.next}`);
        console.log(res);

        let result = await res.json();

        stop = result;
        console.log(result.name);

        infoBoxEl.textContent = `Next stop ${stop.name}`;




        
    }

    function arrive() {

        btnArriveEl.disabled = 'true';
        btnDepartEl.removeAttribute('disabled');


        infoBoxEl.textContent =  `Arriving at  ${stop.name}`;
    }



    return {
        depart,
        arrive
    };
}

let result = solve();