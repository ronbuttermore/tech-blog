let postList =[];

async function getPosts () {
    const response = await fetch('/api/posts');
    const allPosts = await response.json();
    for (i=0; i<allPosts.length; i++){
        postList.push(allPosts[i]);
    }
}

function addClick(postList) {
    let j=1;
    for (let i=0; i<(postList.length); i++) {
        document.querySelector(`#card`+j).addEventListener('click', function () {
            document.location.replace(`/post/`+postList[i].id)
            })
        j++;
    };
};

getPosts();

setTimeout(() => {
    addClick(postList);
}, 1000);

const addComment = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment').value.trim();

    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };

  document.querySelector('.comment-form').addEventListener('submit', addComment);
  