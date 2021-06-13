function updatePersonalInfo() {
    const profilePic = document.getElementsByClassName('profilePicture').value;
    const name = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const description = document.getElementById('infoPer').value;

    const email = localStorage.getItem('email');

    const user = {
        "name": name,
        "phone": phone,
        "description": description,
        "profilePicture": profilePic
    };

    console.log(user);

    const options = {
        method: 'PUT',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    const url = `http://localhost:3000/${email}/update`;

    fetch(url, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log(error))

}

(function() {
    let button = document.getElementById("centerButton");
    document.getElementById('emailAddress').value = localStorage.getItem("email")

    button.addEventListener("click", event => {
        updatePersonalInfo();
    })

})();