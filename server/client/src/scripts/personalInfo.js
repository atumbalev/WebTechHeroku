function getPersonalInfo(event) {
    // event.preventDefault();

    const email = localStorage.getItem('email');

    const options = {
        method: 'GET',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const url = `http://localhost:3000/${email}/personalInfo`;

    fetch(url, options)
        .then(response => response.json())
        .then(response => response.userInfo)
        .then(response => showPersonalInfo(response))
        .catch(error => console.log("Errorz:" + error));
};

function showPersonalInfo(personalInfoObject) {
    // document.getElementsByClassName('profilePicture').innerText = personalInfoObject.name;
    document.getElementById('emailAddress').value = personalInfoObject.email;
    document.getElementById('fullName').value = personalInfoObject.name;
    document.getElementById('phone').value = personalInfoObject.phone;
    document.getElementById('infoPer').value = personalInfoObject.description;

}

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
        .catch(error => console.log("Errorz:" + error));
}






const lockAll = () => {
    document.getElementById('fullName').readOnly = true;
    document.getElementById('emailAddress').readOnly = true;
    document.getElementById('phone').readOnly = true;
    document.getElementById('infoPer').readOnly = true;
}

const editProfile = () => {
    document.getElementById('fullName').readOnly = false;
    document.getElementById('emailAddress').readOnly = false;
    document.getElementById('phone').readOnly = false;
    document.getElementById('infoPer').readOnly = false;
}

const projectName = document.getElementById('projectName');
//     const projectDescription = document.getElementById('projectDescription');depcos

(function() {
    const doneBtn = document.getElementById('rightButton');
    const editBtn = document.getElementById('leftButton');

    lockAll();
    getPersonalInfo();


    doneBtn.addEventListener('click', event => {
        event.preventDefault();
        updatePersonalInfo();
    });

    editBtn.onclick = event => {
        event.preventDefault();
        editProfile();
    }

})();