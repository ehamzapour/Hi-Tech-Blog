const addComment = async function (event) {
    event.preventDefault();

    const postId = document.querySelector('input[name="post-id"]').value;
    const commentBody = document.querySelector('textarea[name="comment-body"]').value;

    if (commentBody) {
        await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ postId, commentBody }),
            headers: { 'Content-Type': 'application/json'}
        });

        document.location.reload();
    }
};

document
.querySelector('#add-comment-form')
.addEventListener('submit', addComment);