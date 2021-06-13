function changeTicketCategory(ticketName, category) {
    let newCategory;
    switch (category) {
        case 'open':
            newCategory = 'Open';
            break;
        case 'in-progress':
            newCategory = 'In progress';
            break;
        case 'resolved':
            newCategory = 'Resolved';
            break;
        case 'closed':
            newCategory = 'Closed';
            break;
        default:
            deleteTask(ticketName);
            return;
    }
    console.log(newCategory)
    const ticket = {
        "category": newCategory
    }
    console.log(ticket)

    const project = localStorage.getItem('projectName')
    const url = `http://localhost:3000/projects/${project}/tickets/${ticketName}`
    const options = {
        method: 'PUT',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)
    };


    fetch(url, options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
}


function createIssue(titleMessage, descriptionMessage) {
    let newIssue = document.createElement("li")
    newIssue.classList.add('issue')
    newIssue.setAttribute('draggable', 'true');

    newIssue.addEventListener('dragstart', () => {
        newIssue.classList.add('dragging')
        deletionTray.style.visibility = 'visible'
        deletionTray.style.height = '20%'
        issuesContainer.style.height = '80%'
    })

    newIssue.addEventListener('dragend', () => {
        newIssue.classList.remove('dragging')
        deletionTray.style.visibility = 'hidden'
        deletionTray.style.height = '0'
        issuesContainer.style.height = '100%'
        let ticketName = newIssue.firstChild.innerHTML; // ticketName
        let ticketStatus = newIssue.parentElement.id; // status
        changeTicketCategory(ticketName, ticketStatus);
    })

    let title = document.createElement('p')
    title.classList.add('issue-title')
    title.innerHTML = titleMessage;

    let description = document.createElement('p')
    description.classList.add('issue-description')
    description.innerHTML = descriptionMessage;

    newIssue.appendChild(title)
    newIssue.appendChild(description)

    return newIssue;
}

function addIssueToList(list, issue) {
    list.appendChild(createIssue(issue.taskName, issue.description));
}

function getIssues(category, listID) {
    const projectName = localStorage.getItem('projectName');
    const url = `http://localhost:3000/projects/${projectName}/tickets/tasks/${category}`

    const options = {
        method: 'GET',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const list = document.getElementById(listID);

    fetch(url, options)
        .then(res => res.json())
        .then(res => Array.from(res).forEach(el => addIssueToList(list, el)))
        .catch(err => console.log(err))
}

function createTask() {
    const title = document.getElementById("task-name").value;
    const description = document.getElementById("task-description").value;
    const priority = document.getElementById("task-priority").value;
    const assignor = localStorage.getItem('email');

    const ticket = {
        "taskName": title,
        "description": description,
        "status": priority,
        "assignor": assignor,
        "assignees": []
    }
    const project = localStorage.getItem('projectName');
    const url = `http://localhost:3000/projects/${project}/tickets`

    const options = {
        method: 'POST',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)

    };

    console.log(ticket)

    fetch(url, options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))

}

function deleteTask(taskName) {
    const projectName = localStorage.getItem('projectName');
    const url = `http://localhost:3000/projects/${projectName}/tickets/${taskName}`

    const options = {
        method: 'DELETE',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))

}

(function() {
    getIssues('Open', 'open')
    getIssues('In progress', 'in-progress')
    getIssues('Resolved', 'resolved')
    getIssues('Closed', 'closed')

    const addTaskButton = document.getElementById("addTaskButton")
    addTaskButton.onclick = event => {
        event.preventDefault();
        createTask();
    }

    const cancelBtn = document.getElementById("cancelTask");
    cancelBtn.onclick = event => {
        event.preventDefault();
        let modal = document.getElementById("myModal")
        modal.style.display = "none";
    }

})();