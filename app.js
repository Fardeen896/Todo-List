const todoInput = document.querySelector(".todo-input");
const date = document.querySelector(".date-input");
const todoContainer = document.querySelector(".todoContainer")
const addBtn = document.querySelector(".btn-primary");
const deleteBtn = document.querySelector(".btn-danger");
const todoList = document.querySelector(".list");

var addSound = new Audio('Add.mp3');
var checkSound = new Audio('Check.mp3');
var deleteSound = new Audio('Delete.mp3');
var prioritySound = new Audio('Priority.mp3');

addBtn.addEventListener("click", addTodo);
todoContainer.addEventListener("click", deleteTodo);
todoContainer.addEventListener("click", checkTodo);
todoContainer.addEventListener("click", changePriority);

//Adding a todo
function addTodo(event) {
    event.preventDefault();
    //Error if a field is blank
    if (todoInput.value == "" || date.value == "") {
        var text = "Cannot add todo. Both fields must be filled.";
        confirm(text);
        return;
    }
    //Creating the list
    addSound.play();
    const listDiv = document.createElement("div");
    listDiv.classList.add("list");
    //Create List element
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo");
    listDiv.append(newTodo);
    //Create date element
    const todoDate = document.createElement("div");
    todoDate.classList.add("date_text");
    todoDate.textContent = date.value;
    newTodo.appendChild(todoDate);
    //Create text button
    const todoDesc = document.createElement("button");
    todoDesc.className = "btn btn-success";
    todoDesc.classList.add("btn-success");
    todoDesc.textContent = todoInput.value;
    newTodo.appendChild(todoDesc);
    //Create check button
    const checkBtn = document.createElement("button");
    checkBtn.className = "btn btn-secondary";
    checkBtn.classList.add('btn-secondary');
    checkBtn.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    newTodo.appendChild(checkBtn);
    //Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    newTodo.appendChild(deleteBtn);
    //Adding the todo to the list
    listDiv.appendChild(newTodo);
    todoList.append(newTodo);
    todoInput.value = "";
}

function checkTodo(event) {
    const elem = event.target;
    //If checked
    if (elem.classList[1] === "btn-secondary" && elem.innerHTML != "") {
        var todoDesc = elem.parentNode.children[1];
        var str = todoDesc.textContent;
        todoDesc.style.textDecoration = "line-through";
        todoDesc.style.opacity = 0.5;
        elem.innerHTML = "";
        checkSound.play();
    } else if (elem.className == "fa fa-check") {
        var todoDesc = elem.parentNode.parentNode.children[1];
        var str = todoDesc.textContent;
        todoDesc.style.textDecoration = "line-through";
        todoDesc.style.opacity = 0.5;
        elem.parentNode.innerHTML = "";
        checkSound.play();
    } else if (elem.classList[1] === "btn-secondary" && elem.innerHTML == "") {
        //If not checked
        var todoDesc = elem.parentNode.children[1];
        var str = todoDesc.textContent;
        todoDesc.style.textDecoration = "none";
        todoDesc.style.opacity = 1.0;
        elem.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
        checkSound.play();
    }
}

function deleteTodo(event) {
    const elem = event.target;
    var text = "Are you sure that you want to delete this task?"
    //If we click the delete button's color, delete the li element
    if (elem.classList[0] === "deleteBtn"){
        if (confirm(text) == true) {
            //
            deleteSound.play();
            elem.parentNode.remove();
        }
    }
    //If we click the delete button's ICON, delete the li element
    if (elem.className == "fa fa-trash") {
        if (confirm(text) == true) {
            deleteSound.play();
            elem.parentNode.parentNode.remove();
        }
    }
}

function changePriority(event) {
    const elem = event.target;
    //If green (Not urgent)
    if (elem.classList[1] === "btn-success") {
        prioritySound.play();
        elem.classList.remove("btn-success");
        elem.classList.add("btn-warning");
    } else if (elem.parentNode.classList[1] === "btn-success") {
        prioritySound.play();
        elem.parentNode.classList.remove("btn-success");
        elem.parentNode.classList.add("btn-warning");
    } else if (elem.classList[1] === "btn-warning") {
        //If yellow (Important)
        prioritySound.play();
        elem.classList.remove("btn-warning");
        elem.classList.add("btn-danger");
    } else if (elem.parentNode.classList[1] === "btn-warning") {
        prioritySound.play();
        elem.parentNode.classList.remove("btn-warning");
        elem.parentNode.classList.add("btn-danger");
    } else if (elem.classList[1] === "btn-danger") {
        //If red (Urgent)
        prioritySound.play();
        elem.classList.remove("btn-danger");
        elem.classList.add("btn-success");
    } else if (elem.parentNode.classList[1] === "btn-danger" && elem.className != "fa fa-trash") {
        prioritySound.play();
        elem.parentNode.classList.remove("btn-danger");
        elem.parentNode.classList.add("btn-success");
    }
}