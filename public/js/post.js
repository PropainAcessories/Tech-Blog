const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector("input[name='post-title']").value;
    const content = document.querySelector("textarea[name='post-content'").value;

    const token = localStorage.getItem('token');

    const response = await fetch('/api/posts/create', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {'Content-Type': 'application/json', authorization: `Bearer ${token}`}
    });

    if (response.ok) {
        document.location.replace('/forum');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#new-post-form').addEventListener('submit', newPostHandler);
