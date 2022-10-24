const editFormHandler = async (event) => {
    event.preventDefault();

    const titleEl = document.querySelector('#post-title');
    const contentEl = document.querySelector('#post-content');
    const postId = document.querySelector('#post-id').innerHTML;
    console.log(postId);

    const response = await fetch('/api/post/' + `${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: titleEl.value,
            content: contentEl.value
        }),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);
