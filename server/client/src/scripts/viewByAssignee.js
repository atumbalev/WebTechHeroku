function appendTask(title, description, assignor, status, category) {

    let newTask = document.createElement('tr');

    let elem = document.createElement('td');
    elem.innerText = title;
    newTask.appendChild(elem);

    elem = document.createElement('td');
    elem.innerText = description;
    newTask.appendChild(elem);

    elem = document.createElement('td');
    elem.innerText = assignor;
    newTask.appendChild(elem);

    elem = document.createElement('td');
    elem.innerText = status;
    newTask.appendChild(elem);

    elem = document.createElement('td');
    elem.innerText = category;
    newTask.appendChild(elem);

    let tasks = document.getElementById('tasks');

    tasks.appendChild(newTask);
}

function checkIfNull(element) {
    if (element === undefined || element == null) { return ' - ' }
    return element
}

function addAllTickets(obj) {
    appendTask(checkIfNull(obj.taskName),
        checkIfNull(obj.description),
        checkIfNull(obj.assignor),
        checkIfNull(obj.status),
        checkIfNull(obj.category));
}


function getTicketsByAssignor() {
    const projectName = localStorage.getItem('projectName');
    const url = `http://localhost:3000/projects/${projectName}/tickets/assignee`

    const options = {
        method: 'GET',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(res => Array.from(res).slice(1).forEach(el => addAllTickets(el)))
        .catch(err => console.log(err))
}

(function() {
    getTicketsByAssignor();
})();