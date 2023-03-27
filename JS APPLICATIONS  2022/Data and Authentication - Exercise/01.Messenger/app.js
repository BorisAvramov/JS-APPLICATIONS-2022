// const { createServer } = require("http-server");

function attachEvents() {

    messages.value = refresh();


    const btnSubmitEl = document.getElementById('submit').addEventListener('click', createComment);
    const btnRefresh = document.getElementById('refresh').addEventListener('click', refresh);



}

const messages = document.getElementById('messages');


async function refresh () {

    const url = 'http://localhost:3030/jsonstore/messenger';

    const res = await fetch (url);

    const result = await res.json();

    const resultMessages = await Object.values(result);

    messages.value = resultMessages.map(m => `${m.author}: ${m.content}`).join('\n');
    return messages.value;

}


async function createComment (event) {
    const author = document.getElementsByName('author')[0].value;
    const content = document.getElementsByName('content')[0].value;

    const url = 'http://localhost:3030/jsonstore/messenger';

    const res = await fetch (url, {

        method: 'post',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({author, content})


    });

    const result = await res.json();
    messages.value += '\n' + `${author}: ${content}`

    return result;

}

attachEvents();