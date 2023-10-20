// variables
let taskBtn = document.querySelector('.task-btn');
let taskForm = document.querySelector('.task-form');
let taskDOM = document.querySelector('.task-container');

// tasks object
let tasks = JSON.parse(localStorage.getItem('tasks')) || []

taskBtn.addEventListener('click', () => {
    taskForm.classList.toggle('hidden')
})

function addTask() {
    let title = document.querySelector('#task-title');
    let description = document.querySelector('#task-desc');
    if (!title.value || !description.value) {
        alert("please enter the valid Info")
        return
    }
    let id = Math.floor(Math.random() * 100)
    let tempTask = { id, title: title.value, description: description.value, completed: false }
    //resetting values
    title.value = ""
    description.value = " "
    closeTaskForm()
    //adding to tasks
    tasks = [...tasks, tempTask]
    //adding to local storage
    updateStorage(tasks)
    //re-rendering UI
    showTasks()
}

function closeTaskForm() {
    taskForm.classList.add('hidden');
}

function showTasks() {
    taskDOM.innerHTML = ''
    let uncompleteTask = tasks.filter(task => !task.completed)
    addContent(uncompleteTask)

    let completeTask = tasks.filter(task => task.completed)
    addContent(completeTask)
    if (isContainerEmpty()) {
        taskDOM.innerHTML = `<h4>There are no Tasks</h4>`
    }
}

function addContent(tasks) {
    if (tasks.length === 0) return
    let result = ''
    let status = tasks[0].completed;
    let containTitle = `<h5 class="contain-title">${status ? 'Complete' : 'Tasks'}</h5>`
    let taskContain = document.createElement('div');
    taskContain.classList.add('task-contain');
    tasks.forEach(task => {
        result += `
        <div class="task-item">
                    <div class="status-btn ${status ? 'complete' : ''}" onclick="handleStatus(event)" data-id="${task.id}"></div>
                    <div class="task-details">
                        <h5 class='${status ? 'cross-line' : ''}'>${task.title}</h5>
                        <p class='${status ? 'cross-line' : ''}'>${task.description}</p>
                    </div>
                    <p class="delete-btn" onclick="removeTask(${task.id})">X</p>
                </div>
        `
    })
    taskContain.innerHTML = containTitle + result
    taskDOM.appendChild(taskContain)
}

function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateStorage(tasks)
    showTasks();
}

function updateStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function handleStatus(event) {
    let selectedTaskItem = event.target;
    let id = parseFloat(selectedTaskItem.dataset.id)
    let task = tasks.find(task => task.id === id)
    if (task.completed) {
        task.completed = false
    } else {
        task.completed = true
    }
    updateStorage(tasks)
    showTasks()
}
function isContainerEmpty() {
    let tempTaskDOM = document.querySelector('.task-container').innerHTML.indexOf('a');
    if (tempTaskDOM !== -1) return false
    return true
}

showTasks()