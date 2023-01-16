const addComment = async function (event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    const commentBody = document.querySelector('textarea[name="comment-body"]').value.trim();


    if (commentBody) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ post_id, commentBody }),
            headers: { 'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    }
};

document
.querySelector('.add-comment-form')
.addEventListener('submit', addComment);