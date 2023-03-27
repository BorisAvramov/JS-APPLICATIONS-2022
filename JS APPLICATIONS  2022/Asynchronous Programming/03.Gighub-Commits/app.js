async function loadCommits() {

    let commitsUlEl = document.getElementById('commits');
    let userNameEl = document.getElementById('username').value;
    let repo = document.getElementById('repo').value;

    let url =   `https://api.github.com/repos/${userNameEl}/${repo}/commits`;

    let res = await fetch (url);
    let commits = await res.json();
  
    commits.forEach(c => {

        let li = document.createElement('li');
        li.textContent = `${c.commit.author.name}: ${c.commit.message}`;
        commitsUlEl.appendChild(li);


    });


}