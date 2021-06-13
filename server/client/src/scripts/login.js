// const handleError = (error) => {
//     console.log(error);
//     // const errors = document.getElementById('errors');
//     // errors.innerHTML = error.error.toString();
// }

const sendRequest = (url, options, successCallback, errorCallback) => {
    fetch(url, options)
        .then(response => response.json())
        .then(response => successCallback(response))
        .catch(error => errorCallback(error));
};

const login = event => {
    event.preventDefault();


    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;

    const user = {
        email,
        password
    };

    localStorage.setItem('email', email); // save email for finding projects later

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

    const url = 'http://localhost:3000/login';

    // sendRequest(url, options, loginUser, handleError);

    fetch(url, options)
        .then(response => response.json())
        .then(response => loginUser(response))
        .catch(error => errorCallback(console.log(error)));

    console.log("send");
};

const loginUser = (data) => {
    console.log('login')
    if (data.error) {
        const errors = document.getElementsByClassName('forgot');
        errors.innerHTML = data.error;
        console.log("error!");
    } else {
        console.log("OK");
        window.location = 'dashboard.html';
        //return user.email;
    }
}

(function() {
    const loginBtn = document.getElementById('login');
    const logoutBtn = document.getElementById('logout');

    console.log("attached!")

    loginBtn.addEventListener('click', login);

    logoutBtn.addEventListener('click', event => {
        localStorage.clear();
    })
})();