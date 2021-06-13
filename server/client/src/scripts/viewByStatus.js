function createTaskByStatus(title, description, assignor, category) {

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
    elem.innerText = category;
    newTask.appendChild(elem);

    return newTask;
}

function checkIfNull(element) {
    if (element === undefined || element == null) { return ' - ' }
    return element
}

function addTaskToTable(after, task) {
    const newTask = createTaskByStatus(checkIfNull(task.taskName),
        checkIfNull(task.description),
        checkIfNull(task.assignor),
        checkIfNull(task.category));

    let table = document.getElementById("table-body");
    let nodeAfter = document.getElementById(after);
    table.insertBefore(newTask, nodeAfter.nextSibling)
}


function getTicketsByStatus(status, tableName) {
    const projectName = localStorage.getItem('projectName');

    const url = `http://localhost:3000/projects/${projectName}/tickets/status/${status}`

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
        .then(res => Array.from(res).forEach(el => addTaskToTable(tableName, el)))
        .catch(err => console.log(err))
}

(function() {
    getTicketsByStatus("Highest", "highest");
    getTicketsByStatus("High", "high");
    getTicketsByStatus("Normal", "normal");
    getTicketsByStatus("Low", "low");
    getTicketsByStatus("Lowest", "lowest");
})();