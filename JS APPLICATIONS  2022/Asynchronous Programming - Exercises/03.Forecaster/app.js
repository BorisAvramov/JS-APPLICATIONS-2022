function attachEvents() {

    // get dom elements
    let locationInputEl = document.getElementById('location');
    let btnsubmitEl = document.getElementById('submit');

    let currentDivEl = document.getElementById('current');
    let upcomingDivEl = document.getElementById('upcoming');

    let divforecastEl = document.getElementById('forecast');

    // get url location

    let urlLocationsArr = `http://localhost:3030/jsonstore/forecaster/locations`;

    // async btn even listener

    btnsubmitEl.addEventListener('click', async () => {
        // debugger;
        // clear elements
        if (divforecastEl.innerHTML == 'Error'){
            divforecastEl.innerHTML = '<div id="current"><div class="label">Current conditions</div></div><div id="upcoming"><div class="label">Three-day forecast</div></div>';
            currentDivEl = document.getElementById('current');
            upcomingDivEl = document.getElementById('upcoming');

        }
        else{
            currentDivEl.innerHTML = '<div class="label">Current conditions</div>';
    
            upcomingDivEl.innerHTML = '<div class="label">Three-day forecast</div>';
        }
    

        // set hidden div to be visible;
        divforecastEl.style.display = 'block';

        // async await fetch to get info from url

        try {
            let resLoc = await fetch(urlLocationsArr);
            if(resLoc.status !== 200){
                throw new Error;
            }

            let dataLoc = await resLoc.json();
    
            let findCode = dataLoc.find(c => c.name === locationInputEl.value).code;
    
            // get info from url for tofay weather
            let UrlToday = `http://localhost:3030/jsonstore/forecaster/today/${findCode}`;
    
            let resToday = await fetch(UrlToday);

            if(resToday.status !== 200){
                throw new Error;
            }
    
            let dataToday = await resToday.json();
    
            console.log(dataToday);
            console.log(dataToday.forecast.condition);
    
            let divForcastTodayEl = document.createElement('div');
            divForcastTodayEl.setAttribute('class', 'forecasts');
    
            let condition = dataToday.forecast.condition;
            let symbol = '';
            spansymbolEl = document.createElement('span');
            spansymbolEl.setAttribute('class', 'condition symbol');
    
            symbol = GetSymbolIcon(condition);
    
            spansymbolEl.innerHTML = symbol;
    
            divForcastTodayEl.appendChild(spansymbolEl);
    
            let spanConditionEl = document.createElement('span');
            spanConditionEl.setAttribute('class', 'condition');
    
            let spanLoc = document.createElement('span');
            spanLoc.setAttribute('class', 'forecast-data');
            spanLoc.textContent = dataToday.name;
    
            let spanTemp = document.createElement('span');
            spanLoc.setAttribute('class', 'forecast-data');
            spanTemp.innerHTML = `${dataToday.forecast.low}&#176;/${dataToday.forecast.high}&#176;`;
    
            let spanCondition = document.createElement('span');
            spanCondition.setAttribute('class', 'forecast-data');
            spanCondition.innerHTML = condition;
    
            spanConditionEl.appendChild(spanLoc);
            spanConditionEl.appendChild(spanTemp);
            spanConditionEl.appendChild(spanCondition);
    
            divForcastTodayEl.appendChild(spanConditionEl);
    
            currentDivEl.appendChild(divForcastTodayEl);
    
    
            // get infp from URL for 3 upcoming days
    
            let UrleUpcoming = `http://localhost:3030/jsonstore/forecaster/upcoming/${findCode}`;
    
            let resUpcoming = await fetch(UrleUpcoming);
            if(resUpcoming.status !== 200){
                throw new Error;
            }
            let dataUpComing = await resUpcoming.json();
    
            console.log(dataUpComing);
    
            let divForcastInfoEl = elGenerator('div', upcomingDivEl);
            divForcastInfoEl.setAttribute('class', 'forecast-info');
    
        
    
            dataUpComing.forecast.forEach (o => {
    
                let span1DayEl = elGenerator('span', divForcastInfoEl);
                span1DayEl.setAttribute('class', 'upcoming');
              
    
                let span1SymbolEl = elGenerator('span', span1DayEl);
                span1SymbolEl.setAttribute('class', 'symbol');
                let condition = o.condition;
                console.log(condition);
                // debugger
                symbol = GetSymbolIcon(condition);
                span1SymbolEl.innerHTML = symbol;
    
                let span2Temp = elGenerator('span', span1DayEl);
                span2Temp.setAttribute('class', 'forecast-data');
                span2Temp.innerHTML = `${o.low}&#176;/${o.high}&#176;`;
    
                let span3condition = elGenerator('span', span1DayEl);
                span3condition.setAttribute('class', 'forecast-data');
                span3condition.textContent = o.condition;
    
    
    
                
            })
    
            
        } catch (error) {
            divforecastEl.innerHTML = 'Error';
        }

     

       
        


    });

    function elGenerator(type, parent) {

        let element = document.createElement(type);
        if (parent) {

            parent.appendChild(element);
        }

        return element;


    }

    function GetSymbolIcon(condition) {

        switch (condition) {
            case 'Sunny':
                return '&#9728;';
                break;
            case 'Partly sunny':
                return '&#x26C5;';
                break;
            case 'Overcast':
                return '&#x2601;';
                break;
            case 'Rain':
                return '&#x2614;';
                break;

            default:
                break;
        }


    }

}

attachEvents();