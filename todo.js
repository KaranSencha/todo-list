"use strict";

// All Variables
// 1. Sidebar
const sidebarIcon = document.querySelector(".sidebar-icon");

const sidebar = document.querySelector(".sidebar");

const categoryContainer = document.querySelector(".category-box");

const categories = document.querySelectorAll(".category");

const addCategory = document.querySelector("#addNewList");

const addCategoryIcon = document.querySelector("#addListIcon");

// 2. Main
const mainContent = document.querySelector("main");

const categoryTitle = document.querySelector(".title");

const categoryMenu = document.querySelector(".title-menu");

const categoryMenuContent = document.querySelector(".menu-content");
const categoryMenuItems = document.querySelectorAll(".menu-item");

const addTodoInput = document.querySelector("#addTodo");

const addTodoBtn = document.querySelector(".add-todo-btn");

const addTodoIcon = document.querySelector(".add-todo-icon");

const todoContainer = document.querySelector("#todoContainer");

let todos;

let checkboxIcons;

let importantIcons;

// 3. Local Storage - Categories
let categoryDetails = [];
let activeCategoryValue;

// 4. Default Category for new users
const defaultCategory = [
  {
    name: "My Tasks",
    isActive: false,
    iconText: "checklist",
    todos: [
      {
        name: "My Tasks",
        isCompleted: true,
        isImportant: false,
      },
      {
        name: "exercise in morning",
        isCompleted: false,
        isImportant: true,
      },
    ],
  },
  {
    name: "Completed",
    isActive: false,
    iconText: "check_circle",
    todos: [
      {
        name: "Business Completed",
        isCompleted: true,
        isImportant: false,
      },
      {
        name: "Laptop and Phone",
        isCompleted: false,
        isImportant: true,
      },
    ],
  },
  {
    name: "Important",
    isActive: false,
    iconText: "star",
    todos: [
      {
        name: "Discipline",
        isCompleted: true,
        isImportant: false,
      },
      {
        name: "Focus with study",
        isCompleted: false,
        isImportant: true,
      },
    ],
  },
  {
    name: "All Tasks",
    isActive: false,
    iconText: "task",
    todos: [
      {
        name: "Study and Rreading",
        isCompleted: true,
        isImportant: false,
      },
      {
        name: "exercise in morning",
        isCompleted: false,
        isImportant: true,
      },
    ],
  },
  {
    name: "Today Plan",
    isActive: true,
    iconText: "format_list_bulleted ",
    todos: [
      {
        name: "Study and Rreading",
        isCompleted: true,
        isImportant: false,
      },
      {
        name: "exercise in morning",
        isCompleted: false,
        isImportant: true,
      },
    ],
  },
  {
    name: "Physical Health",
    isActive: false,
    iconText: "format_list_bulleted ",
    todos: [
      {
        name: "Study and Rreading",
        isCompleted: true,
        isImportant: false,
      },
      {
        name: "exercise in morning",
        isCompleted: false,
        isImportant: true,
      },
    ],
  },
  {
    name: "Business Planing",
    isActive: false,
    iconText: "format_list_bulleted ",
    todos: [
      {
        name: "Study and Rreading",
        isCompleted: true,
        isImportant: false,
      },
      {
        name: "exercise in morning",
        isCompleted: false,
        isImportant: true,
      },
    ],
  },
];

// Display All Category of Local Storage Function
const displayCategories = () => {
  let categoryData = "";
  let isActive = " ";
  let hrLine = "";

  // Get Category Details from localStorage
  categoryDetails = JSON.parse(localStorage.getItem("categories")) ?? defaultCategory;

  categoryDetails.forEach((category, index) => {
    if (index === 3) hrLine = "<hr>";
    if (category.isActive) {
      isActive = "active";
      categoryTitle.textContent = category.name;
    }
    categoryData += `
      <div class="category ${isActive}">
          <span class="material-symbols-outlined"> ${category.iconText} </span>
          <span>${category.name}</span>
      </div>${hrLine}
  `;
    isActive = "";
    hrLine = "";
  });

  // save to local storage
  localStorage.setItem("categories", JSON.stringify(categoryDetails));

  categoryContainer.innerHTML = categoryData;
  activeCategory();
  displayTodos();
  updateClickedMenuItem();
};
displayCategories();

// When new Category Added or created
addCategory.addEventListener("keydown", function (event) {
  const categoryName = event.target.value;

  if (event.key === "Enter") {
    // if nothing in input field return
    if (categoryName.trim().length === 0) return;

    // Take all value
    const newCategory = {
      name: categoryName,
      isActive: true,
      iconText: "format_list_bulleted",
      todos: [],
    };

    // Get previous categories
    categoryDetails = JSON.parse(localStorage.getItem("categories")) ?? defaultCategory;

    // push new category to category Details
    categoryDetails.push(newCategory);

    // save to local storage
    localStorage.setItem("categories", JSON.stringify(categoryDetails));

    // reset input
    event.target.value = "";

    // remove all active class from category
    removeAllActiveClass();

    //add this category to category box
    categoryContainer.innerHTML += `
      <div class="category active">
          <span class="material-symbols-outlined"> format_list_bulleted </span>
          <span>${categoryName}</span>
      </div>
    `;

    categoryTitle.textContent = categoryName;

    updateActiveCategory(categoryName);
    displayTodos();
    activeCategory();
  }
});

// Display All Todos Function
function displayTodos() {
  let todoData = "";
  let todoName = "";
  let todoCompleted = "";
  let isCompleted = "";
  let isImportant = "";
  let checkboxText = "circle";

  // Get Category Details from localStorage
  categoryDetails = JSON.parse(localStorage.getItem("categories"));

  // Find Active Category Value
  categoryDetails.forEach((category, index) => {
    if (category.isActive === true) {
      activeCategoryValue = categoryDetails[index];
    }
  });

  // Loop Through all todo values
  activeCategoryValue.todos.forEach((todo) => {
    todoName = todo.name;

    if (todo.isCompleted) {
      isCompleted = "completed";
      todoCompleted = "todo-completed";
      // Change Icon of Checkbox
      checkboxText = "check_circle";
    }
    if (todo.isImportant) isImportant = "important";

    // Get all values and store
    todoData += `
      <div class="todo">
        <span class="material-symbols-outlined checkbox-box ${isCompleted}"> ${checkboxText}</span>
        <span class="todo-value ${todoCompleted}">${todoName}</span>
        <span class="material-symbols-outlined important-box ${isImportant}"> star </span>
      </div>
    `;

    // Empty all value for next iteration
    todoName = "";
    isCompleted = "";
    isImportant = "";
    todoCompleted = "";
    checkboxText = "circle";
  });

  // Display in browser
  todoContainer.innerHTML = todoData;

  // Add Event Lister to Todos
  updateClickedTodo();
}

function addNewTodo(event) {
  const todoName = event.target.value;

  if (event.key === "Enter") {
    // if nothing in input field return
    if (todoName.trim().length === 0) return;

    // Take all value
    const newTodo = {
      name: todoName,
      isCompleted: false,
      isImportant: false,
    };

    // Get previous Data
    categoryDetails = JSON.parse(localStorage.getItem("categories"));

    // Find - Active Category
    categoryDetails.forEach((category, index) => {
      if (category.isActive === true) {
        activeCategoryValue = categoryDetails[index];
      }
    });

    // push new todo to - Active Category
    activeCategoryValue.todos.push(newTodo);

    // save to local storage
    localStorage.setItem("categories", JSON.stringify(categoryDetails));

    // reset input field
    event.target.value = "";
    event.target.blur();

    // Call DisplayTodo
    displayTodos();
  }
}
// When new todo Added or created
addTodoInput.addEventListener("keydown", function (event) {
  addNewTodo(event);
});

// Show & Hide - Sidebar
sidebarIcon.addEventListener("click", function () {
  sidebar.classList.toggle("sidebar-hide");
  mainContent.classList.toggle("main-expand");
});

// Add Event Lister to Categories
function activeCategory() {
  let clickedCategory = "";
  const categories = document.querySelectorAll(".category");

  categories.forEach((category, index) => {
    category.addEventListener("click", function () {
      // Find Clicked Category - Text
      clickedCategory = category.lastElementChild.textContent.trim();

      // Update Header
      categoryTitle.textContent = clickedCategory;

      // update active class in Local Storage
      updateActiveCategory(clickedCategory);

      // Remove 'active' class from all categories
      removeAllActiveClass();

      // Add 'active' class to the clicked category
      this.classList.add("active");
      displayTodos();
    });
  });
}

// Remove all active class from Category
function removeAllActiveClass() {
  const categories = document.querySelectorAll(".category");
  categories.forEach((category) => {
    category.classList.remove("active");
  });
}

// Update Active Class to - Local Storage
function updateActiveCategory(categoryName) {
  // Get Category Details from localStorage
  categoryDetails = JSON.parse(localStorage.getItem("categories"));

  // Update new - Active Category
  categoryDetails.forEach((category) => {
    if (category.name === categoryName) {
      category.isActive = true;
    } else {
      category.isActive = false;
    }
  });

  // save active class to local Storage
  localStorage.setItem("categories", JSON.stringify(categoryDetails));
}

// Toggle - Title/Category Menu
categoryMenu.addEventListener("click", function (event) {
  categoryMenuContent.classList.toggle("dropdown-show");

  event.stopPropagation();
  if (categoryMenuContent.classList.contains("dropdown-show")) {
    document.addEventListener("click", function () {
      categoryMenuContent.classList.remove("dropdown-show");
    });
  }
});

// Add Event lister to - Todos
function updateClickedTodo() {
  let clickedTodo = "";
  let flagN = 0;
  todos = document.querySelectorAll(".todo");

  todos.forEach((element) => {
    element.addEventListener("click", function (event) {
      const todo = event.target.closest(".todo");

      if (todo) {
        const checkboxIcon = todo.querySelector(".checkbox-box");
        const importantIcon = todo.querySelector(".important-box");
        const todoValue = todo.querySelector(".todo-value");

        clickedTodo = todoValue.textContent;

        if (event.target === checkboxIcon || event.target === todoValue) {
          checkboxIcon.classList.toggle("completed");
          todoValue.classList.toggle("todo-completed");

          // Change Icon of Checkbox
          if (checkboxIcon.textContent === "check_circle") {
            checkboxIcon.textContent = "circle";
          } else {
            checkboxIcon.textContent = "check_circle";
          }

          flagN = 1;
        } else if (event.target === importantIcon) {
          importantIcon.classList.toggle("important");
          flagN = 2;
        }
      }

      activeCategoryValue.todos.forEach((todo) => {
        if (todo.name === clickedTodo) {
          if (flagN === 1) {
            todo.isCompleted = !todo.isCompleted;
            //  console.log(todo.isCompleted);
          } else if (flagN === 2) {
            todo.isImportant = !todo.isImportant;
          }
          localStorage.setItem("categories", JSON.stringify(categoryDetails));
          flagN = 0;
        }
      });
    });
  });
}

// Add Event Listener to - categoryMenuContent
function updateClickedMenuItem() {
  let clickedMenuItem = "";

  categoryMenuItems.forEach((element) => {
    element.addEventListener("click", function (event) {
      clickedMenuItem = event.target.closest(".menu-item").lastElementChild.textContent;

      // Category Edit - Functionality
      if (clickedMenuItem === "Edit List") {
        categoryTitle.setAttribute("contenteditable", "true");
        categoryTitle.focus();
        // Place cursor at the End of the text
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(categoryTitle.childNodes[0], categoryTitle.childNodes[0].length); // Set end position
        range.collapse(true); // Collapse range to start
        sel.removeAllRanges(); // Remove existing selections
        sel.addRange(range); // Apply the range

        categoryTitle.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
            categoryTitle.setAttribute("contenteditable", "false");
            let newTitle = event.target.textContent;
            activeCategoryValue.name = newTitle;

            // Save to local Storage
            localStorage.setItem("categories", JSON.stringify(categoryDetails));
          }
        });

        // Category Change Theme - Functionality
      } else if (clickedMenuItem === "Change Theme") {
        // Category Delete - Functionality
      } else if (clickedMenuItem === "Delete List") {
      }
    });
  });
}

// Add Event Listener to - Add Icon - Todo
addTodoIcon.addEventListener("click", function () {
  addTodoInput.focus();
});

// Add Event Listener to - Add Btn - Todo
addTodoBtn.addEventListener("click", function () {});

// Add Event Listener to - Add Icon - Category
addCategoryIcon.addEventListener("click", function () {
  addCategory.focus();
});
