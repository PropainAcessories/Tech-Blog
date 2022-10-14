const deleteHandler = async (event) => {
    event.preventDefault();

    const postId = document.querySelector('#post-id');

    const response = await fetch('/api/posts/' + postId.value, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#delete').addEventListener('click', deleteHandler);
