function addContributor(email) {
    const projectName = localStorage.getItem("projectName");
    console.log(`adding: ${email} to project: ${projectName}`)

    const options = {
        method: 'POST',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email
        })
    };

    const url = `http://localhost:3000/projects/${projectName}/users`;

    fetch(url, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log(error));
}

function displayModal() {
    let modal = document.getElementById("contributorsModal");
    modal.style.display = 'flex';
}

(function() {
    const addContributorBtn = document.getElementById("addContributor");
    const cancelBtn = document.getElementById("cancelAdd");
    const addContributorButton = document.getElementById("addContributorBtn");

    addContributorBtn.onclick = event => {
        event.preventDefault();
        displayModal()
    }

    cancelBtn.onclick = event => {
        event.preventDefault();
        let modal = document.getElementById("contributorsModal");
        modal.style.display = 'none';
    }

    addContributorButton.onclick = event => {
        event.preventDefault();
        const emailField = document.getElementById("emailCollaborator");
        const email = emailField.value;

        addContributor(email);
    }
})();