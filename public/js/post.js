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
    console.log(postList);
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
