const addPost = async function (event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const postBody = document.querySelector('textarea[name="post-body"]').value.trim();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, postBody, }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document
.querySelector('.new-post-form')
.addEventListener('submit', addPost);