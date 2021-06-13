const sendForm = event => {
    event.preventDefault();

    const email = document.getElementById('EmailRegister').value;
    const password = document.getElementById('PasswordRegister').value;

    const user = {
        "email": email,
        "password": password,
        "projects": [{
            "name": Math.random().toString(36).substring(7),
            "tickets": [{
                "taskName": Math.random().toString(36).substring(7)
            }]
        }]
    };

    console.log(user)
    localStorage.setItem('email', email);

    const options = {
        method: 'POST',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    const url = 'http://localhost:3000/register';

    // sendRequest(url, options, redirect, handleError);
    fetch(url, options)
        // .then(response => response.json())
        .then(response => redirect(response))
        .catch(error => console.log(error));
};

const redirect = response => {
    console.log(response);
    console.log(response.ok);
    if (response.ok) {
        window.location = 'registerPersonalInfo.html';
    } else {
        const errors = document.getElementsByClassName('regError');
        errors.innerHTML = response.error;
    }
}

(function() {
    const register = document.getElementById('centerButton');

    register.addEventListener('click', sendForm);
})();