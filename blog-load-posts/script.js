const loader = document.querySelector('.loader');
const postsContainer = document.getElementById('posts-container');

let limit = 4;
let page = 1;

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();

  return data;
}

function showLoading() {
  loader.classList.add('show');

  setTimeout(() => {
    loader.classList.remove('show');
    setTimeout(() => {
      page++;
      addPostsToDOM();
    }, 300);
  }, 1000);
}

async function addPostsToDOM() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
  `;
    postsContainer.appendChild(postEl);
  });
}

addPostsToDOM();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});
