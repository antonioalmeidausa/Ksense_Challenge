let allUsers = [];
let usersPosts = [];
closebutton = document.querySelector('#closeButton');

window.addEventListener('load', () => {
  divUsers = document.querySelector('#allUsers');
  divUserPosts = document.querySelector('#userPosts');

  closebutton.style.display = 'none';

  getUsers();
});

closebutton.addEventListener('click', () => {
  closebutton = document.querySelector('#closeButton').style.display = 'none';
  divUserPosts.style.display = 'none';
});

async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');

  const jsonUsers = await res.json();

  allUsers = jsonUsers.map((user) => {
    const { id, name, username, email } = user;

    return {
      id: id,
      name: name,
      username: username,
      email: email,
    };
  });

  let usersHTML = `<table class="table-light "
  <tr>
  <th class="table-dark">Id</th>
  <th id="nameTh" class="table-dark">Name</th>
  <th class="table-dark">Username</th>
  <th class="table-dark">Email</th>
  <th class="table-dark"></th>
  </tr>`;

  allUsers.forEach((user) => {
    const { id, name, username, email } = user;

    const userHTML = `
      <tr>
      <td id="userId" class="table-light">${id}</td>
      <td id="username" class="table-light">${name}</td>
      <td class="table-light">${username}</td>
      <td class="table-light">${email}</td>
      <td id="userButton"><button id="viewPostsButton" type="button" class="btn btn-link">View Posts</button></td>
      </tr> 
      `;
    usersHTML += userHTML;
  });

  divUsers.innerHTML = usersHTML + '</table>';

  let viewPost = document.querySelectorAll('#viewPostsButton');

  viewPost.forEach((viewPostsButton) => {
    viewPostsButton.addEventListener(
      'click',

      async function getUsersPosts() {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');

        const jsonPosts = await res.json();

        usersPosts = jsonPosts.map((post) => {
          const { userId, id, title, body } = post;

          return {
            userId: userId,
            id: id,
            title: title,
            body: body,
          };
        });

        closebutton = document.querySelector('#closeButton').style.display =
          'block';
        divUserPosts.style.display = 'block';

        let buttonId =
          viewPostsButton.parentElement.parentElement.innerText.slice(0, 1);

        let filteredPosts = [];

        filteredPosts = usersPosts.filter((x) => x.userId == buttonId);

        let postsHTML = '<div>';

        filteredPosts.forEach((element) => {
          const postHTML = `
                <div id="userPost">
                <li class="list-group-item list-group-item-primary" id="postUserId">User Id: ${element.userId}</li>
              </div>
                  <div>
                  <li class="list-group-item list-group-item-dark" id="userPostId">Post #:${element.id}</li>
                  </div>
                  <div>
                  <li class="list-group-item list-group-item-dark" id="userPostTitle">Title: ${element.title}</li>
                  </div>
                  <div>
                  <li class="list-group-item list-group-item-dark" id="userPostBody">Text: ${element.body}</li>
                  </div>
                `;
          postsHTML += postHTML;

          divUserPosts.innerHTML = postsHTML;
        });
      }
    );
  });
}
