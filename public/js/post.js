const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector(".form-input").value;
    const content = document.querySelector("#post-content").value;

    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#new-post-form').addEventListener('submit', newPostHandler);
