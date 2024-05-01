// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));


// Todo: create a function to generate a unique task id
function generateTaskId() {
    return taskList.length + 1;  // Returns the next number based on the current list length
}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // get items to render to 'To Do' section
    // make cards draggable
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    // store values of the inputs
    const taskTitle = document.getElementById("task-title").value;
    const taskDueDate = document.getElementById("task-due-date").value;
    const taskDescription = document.getElementById("task-description").value;
    // add new task to task list
    const newTask = {
        id: generateTaskId(),
        title:taskTitle,
        date:taskDueDate,
        description: taskDescription,
    };
    // add new task to task list
    taskList.push(newTask);
    // update local storage
    localStorage.setItem("tasks", JSON.stringify(taskList));
    // render the task list
    renderTaskList();
    //  clear the form
     document.getElementById("taskForm").reset();
    //  close the modal
    $('#formModal').modal('hide');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function (event) {
    // render the task list
    renderTaskList();
   // add an event listener for the save task button
    document.getElementById('saveTaskButton').addEventListener('click', handleAddTask);
});