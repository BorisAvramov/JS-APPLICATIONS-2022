async function solution() {
    
    let urlListArticlesTitles = 'http://localhost:3030/jsonstore/advanced/articles/list';

    let mainSectionEl = document.getElementById ('main');

    let res = await fetch(urlListArticlesTitles);

    let divElements = await res.json();
    console.log(divElements);

    divElements.forEach(a => {

        let curDivAcc = elGenerator('div', '', ['class', 'accordion'], mainSectionEl);

        let divHead = elGenerator ('div', '', ['class', 'head'], curDivAcc);
        let spanTitle = elGenerator('span', a.title, [], divHead);
        let id = a._id;

        let btnMoreLess = elGenerator ('button', 'More', ['class', 'button', 'id', id], divHead);

        let divExtra = elGenerator('div', '', ['class', 'extra', 'display', 'none'], curDivAcc);

        

        btnMoreLess.addEventListener ('click', async (e) => {

          

            if(e.target.textContent == 'More'){
                let idbtn = e.target.id;
                  let urlElP = `http://localhost:3030/jsonstore/advanced/articles/details/${idbtn}`;
    
            let resP = await fetch (urlElP);
    
            let dataP = await resP.json();
    
            let pEl = elGenerator('p', dataP.content, [], divExtra);
                e.target.textContent = 'Less'
                divExtra.style.display = 'block';
            }
            else if (e.target.textContent == 'Less'){

               e.target.parentNode.parentNode.children[1].firstChild.remove();
                e.target.textContent = 'More'
                divExtra.style.display = 'none';
            }




        });


    });










    function elGenerator (type, content, attributes, parent){

        let element = document.createElement(type);

        if(content){
            element.textContent = content;
        }

        if(attributes.length > 0){

            for (let index = 0; index < attributes.length; index += 2) {
    
                element.setAttribute(attributes[index], attributes[index+1]);
            }
        }

        if(parent){

            parent.appendChild(element);
        }
        return element;

    }

}
solution();

