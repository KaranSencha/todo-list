"use strict";

const addTodoBox = document.getElementById("addTodo");

const todoContainer = document.getElementById("todoContainer");

let todoDetail = [];

const displayTodo = () => {
  let allTodoOutput = "";

  todoDetail = JSON.parse(localStorage.getItem("todos")) ?? [];

  todoDetail.forEach((element, index) => {
    let todoStatus = "";
    if (element.isCompleted) {
      todoStatus = "completed";
    }
    allTodoOutput += `
	<div class="todo-item ${todoStatus}" onclick="completeTodo(${index})" >
			<input type="checkbox">
			<div >${element.todoValue}</div>
		</div>
	`;
  });

  todoContainer.innerHTML = allTodoOutput;
};

displayTodo();

// when enter key pressed new task added
addTodoBox.addEventListener("keydown", function (event) {
  const todoValue = event.target.value;

  if (event.key === "Enter") {
    // when todo is empty return  not add
    if (todoValue.trim().length === 0) {
      event.target.value = "";
      return;
    } else {
      let todo = {
        todoValue: todoValue,
        isCompleted: false,
        isEditable: false,
      };

      todoDetail = JSON.parse(localStorage.getItem("todos")) ?? [];
      todoDetail.push(todo);

      // send to local storage
      localStorage.setItem("todos", JSON.stringify(todoDetail));

      event.target.value = "";
      displayTodo();
    }
  }
});

// complete specific todo when clicked
const completeTodo = (index) => {
  // todoDetail.splice(index, 1);

  todoDetail = JSON.parse(localStorage.getItem("todos")) ?? [];

  todoDetail[index].isCompleted = todoDetail[index].isCompleted === false ? true : false;

  localStorage.setItem("todos", JSON.stringify(todoDetail));

  displayTodo();
};

const removeTodo = (index) => {
  todoDetail.splice(index, 1);

  localStorage.setItem("todos", JSON.stringify(todoDetail));

  displayTodo();
};

// Show/Hide menu
const sidebarIcon = document.querySelector(".sidebar-icon");

const sidebarContainer = document.querySelector(".sidebar");

sidebarIcon.addEventListener("click", function () {
  sidebarContainer.classList.toggle("sidebar-show");
});
