console.log('My requests...')


// load all books x
// create book x
// update book x
// delete book x

// handle create form
//handle edit form


//lood book for editing
//hande delete button

//initialization
const createForm = document.getElementById('createForm')
const editForm = document.getElementById('editForm')
const tbody = document.querySelector('tbody');
const btnLoad = document.getElementById('loadBooks')
btnLoad.addEventListener('click', loadBooks);
createForm.addEventListener('submit', onCreate)
tbody.addEventListener('click', onTableClick);
editForm.addEventListener('submit', onEditSubmit);


loadBooks();

function onTableClick(event){

if (event.target.className == 'edit'){
    onEdit(event.target);
}
else if (event.target.className == 'delete'){
    onDelete(event.target)
    
}

}

async function onEditSubmit(event){

    event.preventDefault();
    const formData = new FormData(event.target);
    const author = formData.get('author');
    const title = formData.get('title');
    const id = formData.get('id');
    
    const result = await updateBook(id, {title, author});
    event.target.reset();
    createForm.style.display = 'block';
    editForm.style.display = 'none';

    await loadBooks();
   

}

async function onEdit(button){

    const id = button.parentNode.dataset.id;
    const book = await getBookById(id);
    createForm.style.display = 'none';
    editForm.style.display = 'block';

    editForm.querySelector('[name="id"]').value = id;
    editForm.querySelector('[name="title"]').value = book.title;
    editForm.querySelector('[name="author"]').value = book.author;
}

async function getBookById (id){

    const book = await request('http://localhost:3030/jsonstore/collections/books/' + id);
    return book
}

async function onDelete (button){
    const id = button.parentNode.dataset.id;
   await deleteBook(id);
    button.parentNode.parentNode.remove()

}


async function onCreate(event) { //!!!!!!!!!!!!!!!
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(event.target);
    const author = formData.get('author');
    const title = formData.get('title');
    if(author == '' || title == ''){
        return;
    }
    const result = await createBook({title, author});

    event.target.reset();

    tbody.appendChild(createRow(result._id, result))

}


async function request (url, options){  //!!!!!!!!!!!!!!!!

    if (options && options.body != undefined){

        Object.assign(options, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    const response = await fetch (url, options); 

    if (response.ok == false) {
        const error =  await ares.json();
        alert(error.message);
        throw new Error (error.message);
    }

    const data = await response.json();
    return data;
}



async function loadBooks (){

    const books = await request('http://localhost:3030/jsonstore/collections/books');
    const result = Object.entries(books).map(([id, book]) => createRow(id, book));
    tbody.replaceChildren(...result);   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return;

}

 function createRow (id, book) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td data-id=${id}>
        <button class="edit">Edit</button>
        <button class = "delete" >Delete</button>
    </td>`;

    return row;
 }

async function createBook (book) {

const result = await request('http://localhost:3030/jsonstore/collections/books',{
    method: 'post',
    body: JSON.stringify(book)
});

return result;  

}

async function updateBook(id, book){

    const result = await request('http://localhost:3030/jsonstore/collections/books/'+ id,{

        method: 'put',
        body: JSON.stringify(book)

    });
    return result;
}

async function deleteBook(id) {
    
    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete'
    });
    return result;

}






















































// solve()


// const formCreateEl = document.querySelector('form')
//     formCreateEl.setAttribute( 'class', 'createForm');

//    const formEditEl =  createFormEdit();
// const inputTitleEl = document.querySelector('body > form > input[type=text]:nth-child(3)');
// const inputAuthoreEl = document.querySelector('body > form > input[type=text]:nth-child(5)');


// function createEleement (){

//     const book = createBook();



// }

// function createFormEdit(){

//     document.querySelector('body');
//     editForm = document.createElement('form');
//     editForm.setAttribute('class', 'editForm');
//     editForm.innerHTML = `
//     <h3>EDIT FORM</h3>
//     <label>TITLE</label>
//     <input type="text" name="title" placeholder="Title...">
//     <label>AUTHOR</label>
//     <input type="text" name="author" placeholder="Author...">
//     <button>Save</button>`;

//     document.querySelector('body').appendChild(editForm);

// }


// async function createBook(e){
//     e.preventDefault();
//     const formEl = document.querySelector('form');
//     const formData = new FormData(formEl);
    
//     const title = formData.get('title');
//     const author = formData.get('author');
//     if(title == '' || author == ''){
//         return;
//     }

   

//     const url = 'http://localhost:3030/jsonstore/collections/books';

//     const res = await fetch (url, {

//         method: 'post',
//         'Content-Type': 'application/json',
//         body: JSON.stringify({title, author}),

//     });

//     const data = await res.json();
//     const tbody = document.querySelector('tbody');
//     tbody.appendChild();
//     inputTitleEl.value = '';
//     inputAuthoreEl.value = '';

//     return data;

// }


// async function loadBooks(){


//     const tBodyEl = document.querySelector('tbody');
//     const children = tBodyEl.children;

//     for (let index = children.length - 1; index >= 0; index--){
//         children[index].remove();
//     }



//     const url = 'http://localhost:3030/jsonstore/collections/books';

//     const res = await fetch (url);
//     const data = await res.json();
//     dataValues = Object.entries(data);
    
//     dataValues.forEach (b => {
       
//         let tr1TitleAuthor = elGenerator('tr');
//         tBodyEl.appendChild(tr1TitleAuthor);
//         tr1TitleAuthor.setAttribute('id', b[0]);
        

//         let td1Tr1Title = elGenerator('td', `${b[1].title}`, tr1TitleAuthor);
//         let td2Tr1Author = elGenerator('td', `${b[1].author}`, tr1TitleAuthor);
//         let td3Buttons = elGenerator('td', '',tr1TitleAuthor);
//         let buttonEdit = elGenerator('button', 'Edit', td3Buttons)  
//         buttonEdit.setAttribute('class', 'edit');
//         buttonEdit.addEventListener('click', editBook)
        
        
//         let buttonDelete = elGenerator('button', 'Delete', td3Buttons);
//             buttonDelete.setAttribute('class', 'delete');
//             buttonDelete.addEventListener('click', Delete);
            

//     });


//     return dataValues


// }

// async function Delete (e){

//         const id = e.target.parentNode.parentNode.id
//     let url = 'http://localhost:3030/jsonstore/collections/books/' + id;

//     const res = await fetch(url, {
//         method: 'delete'

//     });
//         e.target.parentNode.parentNode.remove();

// }

// function editBook (e) {

//     document.getElementsByClassName('createForm')[0].style.display = 'none';
    
//     const editForm =  document.getElementsByClassName('editForm')[0];
//     editForm.style.display = 'block';

// // {/* <form class="editForm" style="display: block;">
// // <h3>EDIT FORM</h3>
// // <label>TITLE</label>
// // <input type="text" name="title" placeholder="Title...">
// // <label>AUTHOR</label>
// // <input type="text" name="author" placeholder="Author...">
// // <button>Save</button></form> */}



//     const title =  editForm.querySelector('[name="title"]')
//     const author = editForm.querySelector('[name="author"]');
//     const id = e.target.parentNode.parentNode.id;
//     const btnSave = editForm.querySelector('button');
    

//     title.value = e.target.parentNode.parentNode.children[0].textContent;
//     author.value = e.target.parentNode.parentNode.children[1].textContent

    
//     // const h2FormEl = document.querySelector('form h3');
//     // h2FormEl.textContent = 'Edit FORM';
//     // const btnSave = document.querySelector('form button');
//     // btnSave.textContent = 'Save';
//     // inputTitleEl.value = e.target.parentNode.parentNode.children[0].textContent;
//     // inputAuthoreEl.value = e.target.parentNode.parentNode.children[1].textContent;
//     // const id = e.target.parentNode.parentNode.id;
//     // btnSave.removeEventListener('click', createBook);
//     btnSave.addEventListener('click', (e) => updateBook(e, id,));

    
// }

// async function updateBook(e, id){
 
// //  body > table > tbody
// e.preventDefault();


//    let tbody =  document.querySelector('tbody');
    
//     if(e.target.parentNode.children[2].value  == '' ||
//     e.target.parentNode.children[4].value  == ''){
//         return;
//     }
   
//     const title = e.target.parentNode.children[2].value;
//     const author = e.target.parentNode.children[4].value;
// const url = 'http://localhost:3030/jsonstore/collections/books/' + `${id}`;
// const res = await fetch (url, {
//     method: 'put',
//     headers:{
//         'Content-Type' : 'application/json',
//     },
//     body: JSON.stringify({title, author})

// });

    

//     const data = Object.entries(await res.json());
//     e.target.parentNode.children[2].value  = '';
//     e.target.parentNode.children[4].value  = '';

//     document.querySelector('[class = "createForm"]').style.display = 'block';
//     document.querySelector('[class = "editForm"]').style.display = 'none';

//     console.log(data);


//     return data;

// }

// function elGenerator (type, content, parent) {  

//     const element = document.createElement(type);
//     element.textContent = content;
//     if (parent){
//         parent.appendChild(element);
//     }

//     return element;
// }