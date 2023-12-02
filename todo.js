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

const categoryMenuIcon = document.querySelector(".title-menu");

const categoryMenu = document.querySelector(".menu-content");

const categoryMenuItems = document.querySelectorAll(".menu-item");

const addTodoInput = document.querySelector("#addTodo");

const addTodoBtn = document.querySelector(".add-todo-btn");

const addTodoIcon = document.querySelector(".add-todo-icon");

const todoContainer = document.querySelector("#todoContainer");

const todoMenu = document.querySelector(".todo-menu");

const todoMenuItems = document.querySelectorAll(".todo-menu-item");

const sortBtn = document.querySelector(".sort-btn");

const sortMenu = document.querySelector(".sort-menu");

const sortMenuItems = document.querySelectorAll(".sort-menu-item");

const themeColors = document.querySelectorAll(".theme-color");

let todos;

// 3. Category Details
let allCategoryDetail = [];
let activeCategoryDetail;

// 4. Default Category for new users
const defaultCategory = [
  {
    name: "My Tasks",
    isActive: false,
    iconText: "checklist",
    themeColor: "",
    activeTodo: -1,
    todos: [
      {
        name: "My Tasks",
        isCompleted: true,
        isImportant: false,
        date: 88998981111,
      },
    ],
  },
  {
    name: "Completed",
    isActive: false,
    iconText: "check_circle",
    themeColor: "",
    activeTodo: -1,
    todos: [
      {
        name: "Business Completed",
        isCompleted: false,
        isImportant: false,
        date: 189821132,
      },
      {
        name: "Laptop and Phone",
        isCompleted: false,
        isImportant: true,
        date: 83829832,
      },
    ],
  },
  {
    name: "Important",
    isActive: false,
    iconText: "star",
    themeColor: "",
    activeTodo: -1,
    todos: [
      {
        name: "Discipline",
        isCompleted: false,
        isImportant: false,
        date: 9191918281,
      },
      {
        name: "Focus with study",
        isCompleted: false,
        isImportant: true,
        date: 81938918,
      },
    ],
  },
  {
    name: "All Tasks",
    isActive: false,
    iconText: "task",
    themeColor: "",
    activeTodo: -1,
    todos: [
      {
        name: "Study and Rreading",
        isCompleted: false,
        isImportant: false,
        date: 12238291112,
      },
      {
        name: "exercise in morning",
        isCompleted: false,
        isImportant: true,
        date: 12282929199988,
      },
    ],
  },
  {
    name: "Today Plan",
    isActive: true,
    iconText: "format_list_bulleted ",
    themeColor: "",
    activeTodo: -1,
    todos: [
      {
        name: "Study and Rreading",
        isCompleted: false,
        isImportant: false,
        date: 5527271222,
      },
      {
        name: "exercise in morning",
        isCompleted: false,
        isImportant: true,
        date: 8291138811,
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
  allCategoryDetail = JSON.parse(localStorage.getItem("categories")) ?? defaultCategory;

  allCategoryDetail.forEach((category, index) => {
    if (index === 3) hrLine = "<hr>";
    if (category.isActive) {
      isActive = "active";
      categoryTitle.textContent = category.name;
      activeCategoryDetail = category;
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

  // Save in Local Storage
  updateLocalStorage();

  categoryContainer.innerHTML = categoryData;
  activeCategory();
  displayTodos();
  clickedCategoryMenuItem();
  clickedTodoMenuItem();
};
displayCategories();

// When New Category Added/Created ✅
addCategory.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const inputValue = event.target.value;

    // if input field is empty then return
    if (inputValue.trim().length === 0) return;

    // Check input value already exists or not
    let length = allCategoryDetail.length;
    let i = 0;
    while (i < length) {
      if (allCategoryDetail[i].name === inputValue) {
        alert("Category Aready Exist ");
        break;
      }
      i++;
    }

    if (i < length) return;

    // Create New Category
    const newCategory = {
      name: inputValue,
      isActive: true,
      iconText: "format_list_bulleted",
      themeColor: "",
      activeTodo: -1,
      todos: [],
    };

    // Add new category to allCategoryDetail
    allCategoryDetail.push(newCategory);

    // Update Active Category
    activeCategoryDetail.isActive = false;
    activeCategoryDetail = allCategoryDetail[length];

    // Save in Local Storage
    updateLocalStorage();

    // Reset Input field
    event.target.value = "";
    event.target.blur();

    // remove previous active class in - DOM
    removeAllActiveClass();

    // Display newCategory in Sidebar
    categoryContainer.innerHTML += `
      <div class="category active">
          <span class="material-symbols-outlined"> format_list_bulleted </span>
          <span>${inputValue}</span>
      </div>
    `;

    displayTodos();
    activeCategory();
  }
});

// Update Local Storage  ✅
function updateLocalStorage() {
  // Save All Categories Detail in Local Storage
  localStorage.setItem("categories", JSON.stringify(allCategoryDetail));
}

// Display All Todos  ✅
function displayTodos() {
  let todoData = "";
  let todoName = "";
  let themeColor = "";
  let todoId = 0;

  // Find Active Category Value
  allCategoryDetail.forEach((category) => {
    if (category.isActive === true) {
      activeCategoryDetail = category;
      themeColor = category.themeColor;
      categoryTitle.textContent = category.name;
    }
  });

  // Add Theme Value Class to Main
  if (mainContent.classList.contains("main-expand")) {
    mainContent.className = "";
    mainContent.classList.add("main-expand");
  } else {
    mainContent.className = "";
  }

  mainContent.classList.add(themeColor || "no-theme");

  // Display All Todos of - Active Category
  activeCategoryDetail.todos.forEach((todo) => {
    let isCompleted = "";
    let todoCompleted = "";
    let isImportant = "";
    let iconText = "circle";

    todoName = todo.name;
    todoId = todo.date;
    if (todo.isImportant) isImportant = "important";

    if (todo.isCompleted) {
      isCompleted = "completed";
      todoCompleted = "todo-completed";
      iconText = "check_circle";
    }

    // Get all values and store
    todoData += `
      <div class="todo " id="${todoId}">
        <span class="material-symbols-outlined checkbox-box ${isCompleted} "> ${iconText}</span>
        <span class="todo-value ${todoCompleted}">${todoName}</span>
        <span class="material-symbols-outlined important-box ${isImportant}"> star </span>
      </div> 
    `;
  });

  // Display in browser
  todoContainer.innerHTML = todoData;

  // Add Event Lister to Todos
  clickedTodo();
}

// When New todo Added/Created  ✅
addTodoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const inputValue = event.target.value;
    addNewTodo(inputValue);
  }
});

// Add Event Listener to - Add Btn - Todo ✅
addTodoBtn.addEventListener("click", function () {
  let inputValue = addTodoInput.value;
  addNewTodo(inputValue);
});

// Take Input Value Then - Create NewTodo ✅
function addNewTodo(inputValue) {
  // if input field is empty then return
  if (inputValue.trim().length === 0) return;

  // Store Todo Creation Time
  const creationTime = Date.now();

  // Create New Todo
  const newTodo = {
    name: inputValue,
    isCompleted: false,
    isImportant: false,
    date: creationTime,
  };

  // Add new Todo to - Active Category
  activeCategoryDetail.todos.unshift(newTodo);

  // Save in Local Storage
  updateLocalStorage();

  // Reset Input field
  addTodoInput.value = "";
  addTodoInput.focus();

  // Display All Todos
  displayTodos();
}

// When Category Clicked - Set to Active Category
function activeCategory() {
  let clickedCategory = "";
  const categories = document.querySelectorAll(".category");

  categories.forEach((category) => {
    category.addEventListener("click", function () {
      // Find Clicked Category - Text
      clickedCategory = category.lastElementChild.textContent.trim();

      // Update Title of Todos
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

// Remove all active class from Category in DOM
function removeAllActiveClass() {
  const categories = document.querySelectorAll(".category");
  categories.forEach((category) => {
    category.classList.remove("active");
  });
}

// Update Active Class to - Local Storage
function updateActiveCategory(categoryName) {
  // Update new - Active Category
  allCategoryDetail.forEach((category) => {
    if (category.name === categoryName) {
      category.isActive = true;
      activeCategoryDetail = category;
    } else {
      category.isActive = false;
    }
  });

  // Save in Local Storage
  updateLocalStorage();
}

// When Todo Clicked - Reverse Todo Value
function clickedTodo() {
  let clickedTodoId = 0;
  let activeTodo;
  let flagN = 0;
  todos = document.querySelectorAll(".todo");

  todos.forEach((element) => {
    element.addEventListener("click", function (event) {
      activeTodo = event.target.closest(".todo");

      // Get Clicked Todo Created Time
      clickedTodoId = Number(activeTodo.id);

      if (activeTodo) {
        const checkboxIcon = activeTodo.querySelector(".checkbox-box");
        const importantIcon = activeTodo.querySelector(".important-box");
        const todoValue = activeTodo.querySelector(".todo-value");

        if (event.target === checkboxIcon) {
          if (checkboxIcon.classList.contains("completed")) {
            checkboxIcon.classList.remove("completed");
            todoValue.classList.remove("todo-completed");
            checkboxIcon.textContent = "circle";
          } else {
            checkboxIcon.classList.add("completed");
            todoValue.classList.add("todo-completed");
            checkboxIcon.textContent = "check_circle";
          }

          flagN = 1;
        } else if (event.target === importantIcon) {
          importantIcon.classList.toggle("important");
          flagN = 2;
        } else if (event.target === todoValue) {
          event.stopPropagation();

          // Show todo Menu
          todoMenu.classList.add("dropdown-show");
          categoryMenu.classList.remove("dropdown-show");

          // Set Position of Todo Menu
          if (window.innerHeight < event.clientY + 160) {
            todoMenu.style.top = `${event.clientY - 150}px`;
          } else {
            todoMenu.style.top = `${event.clientY - 70}px`;
          }
          todoMenu.style.right = `calc(100vw - ${event.clientX + 260}px)`;

          // Hide Todo Menu
          document.addEventListener("click", function () {
            todoMenu.classList.remove("dropdown-show");
          });
        }
      }

      // Update Local Storage -
      activeCategoryDetail.todos.forEach((todo, index) => {
        if (todo.date === clickedTodoId) {
          // Get Active todo value
          activeCategoryDetail.activeTodo = index;
          if (flagN === 1) {
            todo.isCompleted = !todo.isCompleted;
          } else if (flagN === 2) {
            todo.isImportant = !todo.isImportant;
          }

          // Save in Local Storage
          updateLocalStorage();
        }
      });

      // review below
      // displayTodos();
    });
  });
}

//Add Event Listener to - Todo Menu
function clickedTodoMenuItem() {
  let clickedMenuItem = "";

  todoMenuItems.forEach((element) => {
    element.addEventListener("click", function (event) {
      clickedMenuItem = event.target
        .closest(".todo-menu-item")
        .querySelector("span:last-of-type").textContent;

      let index = activeCategoryDetail.activeTodo;
      if (clickedMenuItem === "Mark as important") {
        activeCategoryDetail.todos[index].isImportant =
          !activeCategoryDetail.todos[index].isImportant;
      } else if (clickedMenuItem === "Mark as completed") {
        activeCategoryDetail.todos[index].isCompleted =
          !activeCategoryDetail.todos[index].isCompleted;
      } else if (clickedMenuItem === "Delete task") {
        activeCategoryDetail.todos.splice(index, 1);
      }

      // Update Local Storage -
      // Save to Local Storage
      localStorage.setItem("categories", JSON.stringify(allCategoryDetail));

      displayTodos();
    });
  });
}

// Add Event Listener to - categoryMenu
function clickedCategoryMenuItem() {
  let clickedMenuItem = "";
  let clickedThemeColor = "";

  // Category Change Theme - Functionality
  themeColors.forEach((element) => {
    element.addEventListener("click", function (event) {
      clickedThemeColor = event.target.getAttribute("data");
      activeCategoryDetail.themeColor = clickedThemeColor;

      // Save themeColor to Local Storage
      localStorage.setItem("categories", JSON.stringify(allCategoryDetail));

      // Display Changed Theme - Todos
      displayTodos();
    });
  });

  categoryMenuItems.forEach((element) => {
    element.addEventListener("click", function (event) {
      clickedMenuItem = event.target
        .closest(".menu-item")
        .querySelector("span:last-of-type").textContent;

      // Category Edit - Functionality
      if (clickedMenuItem === "Rename List") {
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
            activeCategoryDetail.name = newTitle;

            let findIndex = allCategoryDetail.indexOf(activeCategoryDetail);

            document.querySelectorAll(".category")[findIndex].lastElementChild.textContent =
              newTitle;

            // Save to local Storage
            localStorage.setItem("categories", JSON.stringify(allCategoryDetail));
          }
        });

        // Delete Active Category - Functionality
      } else if (clickedMenuItem === "Delete List") {
        // Find the index of the Active Category where isActive is true
        const activeIndex = allCategoryDetail.findIndex((item) => {
          return item.isActive;
        });

        // Remove the Active Category - categories
        allCategoryDetail = allCategoryDetail.filter((category) => {
          return !category.isActive;
        });

        // Make Active Category before 1 index
        allCategoryDetail[activeIndex - 1].isActive = true;

        // Save All Data to local Storage
        localStorage.setItem("categories", JSON.stringify(allCategoryDetail));

        // Now Display new Category Data
        displayCategories();
      }
    });
  });
}

// Toggle - Category Menu
categoryMenuIcon.addEventListener("click", function (event) {
  categoryMenu.classList.toggle("dropdown-show");
  todoMenu.classList.remove("dropdown-show");

  event.stopPropagation();
  if (categoryMenu.classList.contains("dropdown-show")) {
    document.addEventListener("click", function () {
      categoryMenu.classList.remove("dropdown-show");
    });
  }
});

// Add Event Listener to - Add Icon - Todo
addTodoIcon.addEventListener("click", function () {
  addTodoInput.focus();
});

//  Add Icon - Category
addCategoryIcon.addEventListener("click", function () {
  addCategory.focus();
});

// Sort Button
sortBtn.addEventListener("click", function (event) {
  sortMenu.classList.toggle("dropdown-show");

  event.stopPropagation();
  if (sortMenu.classList.contains("dropdown-show")) {
    document.addEventListener("click", function () {
      sortMenu.classList.remove("dropdown-show");
    });
  }
});
// Show & Hide - Sidebar
sidebarIcon.addEventListener("click", function () {
  sidebar.classList.toggle("sidebar-hide");
  mainContent.classList.toggle("main-expand");
});
