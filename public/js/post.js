const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector("input[name='post-title']").value;
    const body = document.querySelector("textarea[name='post-body'").value;

    const token = localStorage.getItem('token');

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            body
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
