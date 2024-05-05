// Retrieve tasks and nextId from localStorage or set default values if not found
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"))  || 0;

// Todo: create a function to generate a unique task id
function generateTaskId() {
        // Increase task ID and update it in local storage for task id
        nextId++ 
        localStorage.setItem('nextId', nextId);
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    // create elements for task properties
    const $taskTitleEl = $('<h5>').attr('class', 'card-header');
    const $taskDate = $('<p>').attr('class', 'card-date');
    const $descriptionEl = $('<p>').attr('class', 'card-text');
    const $taskBodyEl = $('<div>').attr('class', 'card-body');
    const $deleteButtonEl = $('<a>').attr('href', '#').attr('class', 'btn btn-primary deleteBtn').text('Delete').attr('id', task.id);
    const $cardEl = $('<div>').addClass('card dragbox').attr('id', task.id).css('margin', '5%');
    // to check if a task is overdue and to set the background color
    const cardBackground = cardState(task.date);
    // set the cards color based on how soon it is due
    $cardEl.addClass(cardBackground);
    // to fill in the tasks title, due date, and description on the card
    $taskTitleEl.text(task.title);
    $descriptionEl.text(task.taskData);
    $taskDate.text(task.date);
    // add the description, date, and delete button to the tasks body sections
    $taskBodyEl.append($descriptionEl, $taskDate, $deleteButtonEl);
    // add the title and body section to the main card element
    $cardEl.append($taskTitleEl, $taskBodyEl);
    // display the task card
    return $cardEl;
        
}

// Todo: create a function to render the task list and make cards draggable
function rendertaskList() {
    // get tasks from local storage
    taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    // clear content from the To Do, In Progress, and Done sections
    $toDoEl.empty();
    $inProgressEl.empty();
    $doneEl.empty();
    // loop through each task and create its visual card
    for ( const items of taskList) {
        // create a visual card for the task
        const card = createTaskCard(items);
        // place the card in its correct section based on its status
        if (items.status === 'to-do') {
            $toDoEl.append(card);
        } else if (items.status === 'in-progress') {
            $inProgressEl.append(card);
        } else if (items.status === 'done') {
            $doneEl.append(card);
        }
    }
    // make task card draggable
    $( ".dragbox" ).draggable({
        opacity: 0.7,
        zIndex: 100,
       // Use a helper function to create a clone of the card while dragging
        helper: function (e) {
          // identify if the dragged element is the card itself or a child of the card
          const original = $(e.target).hasClass('.dragbox')
            ? $(e.target)
            : $(e.target).closest('.dragbox');
          // return a clone of the card that maintains the original width
          return original.clone().css({
            width: original.outerWidth(),
          });
        },
      });

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    // get references to the task input fields from the DOM.
    const taskTitle = document.querySelector('#task-title');
    const taskDueDate = document.querySelector('#task-due-date');
    const taskDescription = document.querySelector('#task-description');

    generateTaskId();

    // store values of the inputs
    const newTask = {
        title: taskTitle.value,
        date: taskDueDate.value,
        taskData: taskDescription.value,
        id: nextId,
        status: "to-do"
    };
    
    // add new task to task list
    taskList.push(newTask);
    // update local storage
    localStorage.setItem('tasks', JSON.stringify(taskList));
     // render the task list
    rendertaskList();
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
  // get the id of the task card that was dragged and dropped
  const taskId = ui.draggable[0].id;
  // get the id of the new category where the task was dropped
  const newStatus = event.target.id;
  // load the current list of tasks from local storage
  const updateTasks = JSON.parse(localStorage.getItem('tasks'));
  // loop through the list to find the task that was moved
  for (let i = 0; i < updateTasks.length; i++) {
    
    const task = updateTasks[i];

    if (task.id == taskId) {
        task.status = newStatus;
    }
  }
  // update local storage
  localStorage.setItem('tasks', JSON.stringify(updateTasks));
  // render the task list
  rendertaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
     // add an event listener for the save task button
    $('#saveTaskButton').on('click', handleAddTask);
     // add an event listener for the delete task button
    $('.container').on('click', '.deleteBtn', handleDeleteTask);
    // Make lanes droppable.
    $('.lane').droppable({
        accept: '.dragbox',
        drop: handleDrop,
      });

      // Render task list
      rendertaskList()
});