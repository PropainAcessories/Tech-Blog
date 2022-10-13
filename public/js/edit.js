const editFormHandler = async (event) => {
    event.preventDefault();

    const titleEl = document.querySelector('#post-title');
    const contentEl = document.querySelector('#post-body');
    const postId = document.querySelector('#post-id');

    const response = await fetch('/api/posts/' + postId.value, {
        method: 'PUT',
        body: JSON.stringify({
            title: titleEl.value,
            content: contentEl.value
        }),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);
