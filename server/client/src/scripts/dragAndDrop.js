let draggables = document.querySelectorAll('.issue')
let containers = document.querySelectorAll('.issuesList')
let deletionTray = document.getElementById('deletion-tray')
let issuesContainer = document.getElementById('issues')

deletionTray.style.visibility = 'hidden'
deletionTray.style.height = '0'

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
        deletionTray.style.visibility = 'visible'
        deletionTray.style.height = '20%'
        issuesContainer.style.height = '80%'
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
        deletionTray.style.visibility = 'hidden'
        deletionTray.style.height = '0'
        issuesContainer.style.height = '100%'

    })
})

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        }
    })
})

deletionTray.addEventListener('dragend', e => {
    e.preventDefault();
    deletionTray.lastChild.remove()
})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.issue:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}