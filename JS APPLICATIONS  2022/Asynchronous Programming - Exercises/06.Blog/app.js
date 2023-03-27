 function attachEvents() {

    let btnLoadPosts = document.getElementById('btnLoadPosts');
    let btnViewPosts = document.getElementById('btnViewPost');

    let postsElementSelector = document.getElementById('posts');

    let postBodyPEl = document.getElementById('post-body');
    let postTitleEl = document.getElementById('post-title');
    let commentsUlEl = document.getElementById('post-comments');


    btnLoadPosts.addEventListener('click', async () => {

        postsElementSelector.innerHTML = '';
        let posts = await getPosts();

        posts.map(p => createOptionPost(p)).forEach(p => postsElementSelector.appendChild(p));


        btnViewPosts.addEventListener('click', async() => {

            commentsUlEl.innerHTML = '';
            let findPost = posts.find(p => p.id == postsElementSelector.value);

            postBodyPEl.textContent = findPost.body;
            postTitleEl.textContent = findPost.title;
    
            let comments = await getCommentsById (postsElementSelector.value);

            comments.map (c => {

                let el = document.createElement('li');
                el.textContent  = c.text;
                commentsUlEl.appendChild(el);


            });
    
        });




    })

   
  



}


function createOptionPost (post){

    let element  = document.createElement('option');
    element.setAttribute('value', post.id);
    element.textContent = post.title;

    return element;

}


async function getPosts () {

    let url = 'http://localhost:3030/jsonstore/blog/posts';

    let res = await fetch(url);
    let posts = await res.json();

    return Object.values(posts);


}


async function getCommentsById (postId) {

    let url = `http://localhost:3030/jsonstore/blog/comments`;

    let res = await fetch (url);

    let comments = await res.json();

    return Object.values(comments).filter(c => c.postId == postId);


}
attachEvents(); 