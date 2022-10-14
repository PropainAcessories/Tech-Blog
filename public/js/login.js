const loginHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (!username || !password) {
        alert('Fields empty!');
        return;
    }

    if (password.length < 10) {
        alert('password too short');
        return;
    }
    
    const response = await fetch('/api/users/login/', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.login-form').addEventListener('submit', loginHandler);
