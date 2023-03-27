 let main = document.querySelector('main');
export function showSection(sectionRef){

    // THIS IS REMOVE AND APPEND SECTIONS ELEMENTS 

    main.replaceChildren (sectionRef);

    // THIS IS MANIPULATION SECTIONS BY VISIBILITY

    // document.querySelectorAll('section').forEach(s => s.style.display = 'none');
    // document.getElementById(idSection).style.display = 'block';


}

export function elGenerator(type, attributes, content, parent){

    const element = document.createElement(type);

    for (const [attr, value] of Object.entries(attributes || {})) {
        
        if(attr.substring(0, 2) == 'on'){

            element.addEventListener(attr.substring(2).toLocaleLowerCase(), value );

        }
        else {
            result[attr] = value;
        }

    }

    element.textContent = content;
    if(parent){
        parent.appendChild(element);
    }
    return element;

}