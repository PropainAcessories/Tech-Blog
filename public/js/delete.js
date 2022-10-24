const deleteHandler = async (event) => {
    event.preventDefault();

    const postId = document.querySelector('#post-id').innerHTML;
    console.log(postId);

    const response = await fetch('/api/post/' + `${postId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#delete').addEventListener('click', deleteHandler);
