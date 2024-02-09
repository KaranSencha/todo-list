"use strict";

// Sidebar Elements ✔️
const sidebarIcon = document.querySelector(".sidebar-icon");

const sidebar = document.querySelector(".sidebar");

const categoryContainer = document.querySelector(".category-box");

const categories = document.querySelectorAll(".category");

const addCategory = document.querySelector("#addNewList");

const addCategoryIcon = document.querySelector("#addListIcon");

// Main Content Elements ✔️
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

const sortingTypeBox = document.querySelector(".sort-type-box");

const sortingTypeName = document.querySelector(".sort-type-name");

const sortingRemoveIcon = document.querySelector(".sort-type-close");

const themeColors = document.querySelectorAll(".theme-color");

const themeColorBox = document.querySelector(".theme-colors");

let todos;

//  Category Details and Default Categories ✔️
const defaultCategory = [
  {
    name: "Today Task",
    isActive: true,
    iconText: "checklist",
    themeColor: "theme-green",
    sortType: "Importance",
    activeTodo: -1,
    todos: [
      {
        name: "Complete Project Deadline",
        isCompleted: false,
        isImportant: true,
        date: 122131111,
      },
      {
        name: "Prepare Presentation Slides",
        isCompleted: false,
        isImportant: false,
        date: 8448713111,
      },
      {
        name: "Respond to Client Emails",
        isCompleted: false,
        isImportant: true,
        date: 8776553111,
      },
      {
        name: "Review Code Updates",
        isCompleted: false,
        isImportant: false,
        date: 87998713211,
      },
      {
        name: "Collaborate with Design Team",
        isCompleted: false,
        isImportant: false,
        date: 5577171361,
      },
      {
        name: "Conduct User Testing",
        isCompleted: true,
        isImportant: false,
        date: 571337171361,
      },
      {
        name: "Update Project Documentation",
        isCompleted: false,
        isImportant: true,
        date: 55919714361,
      },
    ],
  },
  {
    name: "Personal",
    isActive: false,
    iconText: "check_circle",
    themeColor: "theme-blue",
    activeTodo: -1,
    sortType: "none",
    todos: [
      {
        name: "Grocery shopping",
        isCompleted: false,
        isImportant: false,
        date: 882189821132,
      },
      {
        name: "Plan social activities",
        isCompleted: false,
        isImportant: false,
        date: 87183829832,
      },
      {
        name: "Pay bills (utility, rent, etc.)",
        isCompleted: false,
        isImportant: true,
        date: 97183829832,
      },
      {
        name: "Read a book",
        isCompleted: false,
        isImportant: true,
        date: 178383829832,
      },
    ],
  },
  {
    name: "Health",
    isActive: false,
    iconText: "star",
    themeColor: "theme-purple",
    activeTodo: -1,
    sortType: "none",
    todos: [
      {
        name: "Schedule a check-up",
        isCompleted: false,
        isImportant: false,
        date: 739191918281,
      },
      {
        name: "Get sufficient sleep",
        isCompleted: false,
        isImportant: true,
        date: 7781938918,
      },
      {
        name: "Exercise regularly",
        isCompleted: false,
        isImportant: true,
        date: 78281938918,
      },
      {
        name: "Prepare and eat a balanced meal",
        isCompleted: false,
        isImportant: false,
        date: 17181938918,
      },
    ],
  },
  {
    name: "Finance",
    isActive: false,
    iconText: "task",
    themeColor: "",
    activeTodo: -1,
    sortType: "none",
    todos: [
      {
        name: "Review monthly budget",
        isCompleted: false,
        isImportant: false,
        date: 333126571882,
      },
      {
        name: "Pay credit card bill",
        isCompleted: false,
        isImportant: true,
        date: 2212287276688,
      },
      {
        name: "Track expenses",
        isCompleted: false,
        isImportant: false,
        date: 122829266698338,
      },
      {
        name: "Plan for retirement or savings goals",
        isCompleted: false,
        isImportant: false,
        date: 1228222927788,
      },
      {
        name: "Save a portion of income",
        isCompleted: false,
        isImportant: true,
        date: 1999929199988,
      },
    ],
  },
  {
    name: "Career Growth",
    isActive: false,
    iconText: "format_list_bulleted ",
    themeColor: "theme-red",
    activeTodo: -1,
    sortType: "Alphabetically",
    todos: [
      {
        name: "Learn a new skill or take an online course",
        isCompleted: false,
        isImportant: true,
        date: 55337271222,
      },
      {
        name: "Set career goals",
        isCompleted: false,
        isImportant: false,
        date: 5527213171222,
      },
      {
        name: "Update resume or LinkedIn profile",
        isCompleted: false,
        isImportant: false,
        date: 55272713332222,
      },
      {
        name: "Attend networking events",
        isCompleted: false,
        isImportant: false,
        date: 55271313271222,
      },
    ],
  },
  {
    name: "Performance Optimization",
    isActive: false,
    iconText: "format_list_bulleted ",
    themeColor: "",
    activeTodo: -1,
    sortType: "none",
    todos: [
      {
        name: "Minify and compress CSS, JavaScript, and HTML files",
        isCompleted: false,
        isImportant: true,
        date: 77737271222,
      },
      {
        name: "Optimize loading time by reducing HTTP requests",
        isCompleted: false,
        isImportant: true,
        date: 533213171222,
      },
      {
        name: "Implement lazy loading of non-critical resources",
        isCompleted: false,
        isImportant: false,
        date: 554443332222,
      },
      {
        name: "Utilize CDNs for fast loading",
        isCompleted: false,
        isImportant: false,
        date: 55266431222,
      },
    ],
  },
];

let allCategoryDetail = JSON.parse(localStorage.getItem("categories")) ?? defaultCategory;

let activeCategoryDetail;

// Display Categories from Local Storage ✔️
const displayCategories = () => {
  let categoryData = "";
  let isActive = " ";
  let hrLine = "";
  let categoryItems = 0;
  allCategoryDetail.forEach((category, index) => {
    categoryItems = category.todos.length;
    if (!categoryItems) categoryItems = "";
    if (index === 3) hrLine = "<hr>";
    if (category.isActive) {
      isActive = "active";
      categoryTitle.textContent = category.name;
      activeCategoryDetail = category;
    }
    categoryData += `
         <div class="category ${isActive}">
          <span class="material-symbols-outlined"> ${category.iconText} </span>
          <div class="category-detail">
            <span class="category-name">${category.name}</span>
            <span class="todo-number">${categoryItems}</span>
          </div>
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
  clickedSortMenuItem();
};
displayCategories();

// Add New Category Event ✔️
addCategory.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const inputValue = event.target.value;

    // if input field is empty then return
    if (inputValue.trim().length === 0) return;

    // Check same category already exists or not
    let length = allCategoryDetail.length;
    let i = 0;
    while (i < length) {
      if (allCategoryDetail[i].name === inputValue) {
        alert("Category Aready Exist \nTry Another Name");
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
      sortType: "none",
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
          <span class="material-symbols-outlined">format_list_bulleted</span>
          <div class="category-detail">
            <span class="category-name">${inputValue}</span>
            <span class="todo-number"></span>
          </div>
        </div>
    `;

    displayTodos();
    activeCategory();
    updateLayout();
  }
});

// Update Local Storage  ✔️
function updateLocalStorage() {
  // Save All Categories Detail in Local Storage
  localStorage.setItem("categories", JSON.stringify(allCategoryDetail));
}

// Display Todos  ✔️
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

  // Sorting Type show
  sortingTypeBox.classList.add("sort-hidden");
  if (activeCategoryDetail.sortType !== "none") {
    sortingTypeBox.style.display = "flex";
    sortingTypeName.textContent = `
    Sorted by ${activeCategoryDetail.sortType}`;
  }

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

// Add New Todo Event  ✔️
addTodoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const inputValue = event.target.value;
    addNewTodo(inputValue);
  }
});

// Add New Todo Event  ✔️
addTodoBtn.addEventListener("click", function () {
  let inputValue = addTodoInput.value;
  addNewTodo(inputValue);
});

// Take Input Value Then - Create NewTodo ✔️
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

  // Increase Number in Category
  let findIndex = allCategoryDetail.indexOf(activeCategoryDetail);

  let increaseValue = document
    .querySelectorAll(".category")
    [findIndex].querySelector(".todo-number");
  increaseValue.textContent = activeCategoryDetail.todos.length;

  // Save in Local Storage
  updateLocalStorage();

  // Reset Input field
  addTodoInput.value = "";
  addTodoInput.focus();

  // Display All Todos
  displayTodos();
}

// Active Category Selection ✔️
function activeCategory() {
  let clickedCategory = "";
  const categories = document.querySelectorAll(".category");

  categories.forEach((category) => {
    category.addEventListener("click", function () {
      // Find Clicked Category - Text
      clickedCategory = category.querySelector(".category-name").textContent.trim();

      // Update Title of Todos
      categoryTitle.textContent = clickedCategory;

      // update active class in Local Storage
      updateActiveCategory(clickedCategory);

      // Remove 'active' class from all categories
      removeAllActiveClass();

      // Add 'active' class to the clicked category
      this.classList.add("active");
      displayTodos();
      updateLayout();
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

// Update Active Category in Local Storage ✔️
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

// Clicked Todo Event Handler ✔️
function clickedTodo() {
  todos = document.querySelectorAll(".todo");
  todos.forEach((element) => {
    element.addEventListener("click", function (event) {
      getClickedTodo(event);
    });
  });
}

// Get Clicked Todo Details ✔️
function getClickedTodo(event) {
  let clickedTodoId = 0;
  let activeTodo;
  let flagN = 0;

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
      // Show todo Menu
      todoMenu.classList.add("dropdown-show");
      event.stopPropagation();

      // Hide - categoryMenu & sortMenu
      categoryMenu.classList.remove("dropdown-show");
      sortMenu.classList.remove("dropdown-show");

      // Set Position of Todo Menu
      if (window.innerHeight < event.clientY + 160) {
        todoMenu.style.top = `${event.clientY - 150}px`;
      } else {
        todoMenu.style.top = `${event.clientY - 70}px`;
      }

      todoMenu.style.right = `calc(100vw - ${event.clientX + 260}px)`;

      if (window.innerWidth < 600) {
        todoMenu.style.right = `min(40vw, 100px)`;
      }

      // Close todoMenu  if user click outside
      if (todoMenu.classList.contains("dropdown-show")) {
        document.addEventListener("click", function () {
          todoMenu.classList.remove("dropdown-show");
        });
      }
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

      // Change todoMenu - Completed Item
      if (todo.isCompleted === true) {
        todoMenuItems[1].querySelector("span:last-of-type").textContent = "Mark as not completed";

        todoMenuItems[1].querySelector("span:first-of-type").textContent = "circle";
      } else {
        todoMenuItems[1].querySelector("span:last-of-type").textContent = "Mark as completed";
        todoMenuItems[1].querySelector("span:first-of-type").textContent = "check_circle";
      }

      // Change todoMenu - Important Item
      if (todo.isImportant === true) {
        todoMenuItems[0].querySelector("span:last-of-type").textContent = "Remove importance";
        todoMenuItems[0].querySelector("span:first-of-type").classList.remove("important");
      } else {
        todoMenuItems[0].querySelector("span:last-of-type").textContent = "Mark as importance";
        todoMenuItems[0].querySelector("span:first-of-type").classList.add("important");
      }

      // Save in Local Storage
      updateLocalStorage();
    }
  });
}

// Clicked Todo Menu Item Event ✔️
function clickedTodoMenuItem() {
  let clickedMenuItem = "";

  todoMenuItems.forEach((element) => {
    element.addEventListener("click", function (event) {
      clickedMenuItem = event.target
        .closest(".todo-menu-item")
        .querySelector("span:last-of-type").textContent;

      let index = activeCategoryDetail.activeTodo;
      if (clickedMenuItem === "Mark as importance") {
        activeCategoryDetail.todos[index].isImportant = true;
      } else if (clickedMenuItem === "Remove importance") {
        activeCategoryDetail.todos[index].isImportant = false;
      } else if (clickedMenuItem === "Mark as completed") {
        activeCategoryDetail.todos[index].isCompleted = true;
      } else if (clickedMenuItem === "Mark as not completed") {
        activeCategoryDetail.todos[index].isCompleted = false;
      } else if (clickedMenuItem === "Delete todo") {
        activeCategoryDetail.todos.splice(index, 1);

        // Decrease Number in Category
        let findIndex = allCategoryDetail.indexOf(activeCategoryDetail);

        let increaseValue = document
          .querySelectorAll(".category")
          [findIndex].querySelector(".todo-number");

        increaseValue.textContent = activeCategoryDetail.todos.length;
      }

      // Save in Local Storage
      updateLocalStorage();

      // Display All Todos with changes
      displayTodos();
    });
  });
}

// Clicked Category Menu Item Event ✔️
function clickedCategoryMenuItem() {
  let clickedMenuItem = "";
  let clickedThemeColor = "";

  // Category Change Theme - Functionality
  themeColors.forEach((element) => {
    element.addEventListener("click", function (event) {
      clickedThemeColor = event.target.getAttribute("data");
      activeCategoryDetail.themeColor = clickedThemeColor;

      themeColorBox.style.display = "none";

      categoryMenu.classList.remove("dropdown-show");
      // Save in Local Storage
      updateLocalStorage();

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

            document
              .querySelectorAll(".category")
              [findIndex].querySelector(".category-name").textContent = newTitle;

            // Save in Local Storage
            updateLocalStorage();
          }
        });

        // Delete Active Category - Functionality
      } else if (clickedMenuItem === "Change Theme") {
        event.stopPropagation();
        themeColorBox.style.display = "flex";
      } else if (clickedMenuItem === "Delete List") {
        // Find the index of the Active Category where isActive is true
        const activeIndex = allCategoryDetail.findIndex((item) => {
          return item.isActive;
        });
        console.log(activeIndex);

        // Not delete Important Category
        if (activeIndex < 4) {
          return alert("Fixed Category - Not deletable");
        } else {
          // Remove the Active Category - categories
          allCategoryDetail = allCategoryDetail.filter((category) => {
            return !category.isActive;
          });

          // Make Active Category before 1 index
          allCategoryDetail[activeIndex - 1].isActive = true;

          // Save in Local Storage
          updateLocalStorage();

          // Now Display new Category Data
          displayCategories();
        }
      }
    });
  });
}

// Clicked Sort Menu Item Event ✔️
function clickedSortMenuItem() {
  let clickedMenuItem = "";

  // Save category to sortHistory
  sortMenuItems.forEach((element) => {
    element.addEventListener("click", function (event) {
      clickedMenuItem = event.target
        .closest(".sort-menu-item")
        .querySelector("span:last-of-type").textContent;

      if (clickedMenuItem === "Importance") {
        importanceSortTodo();
      } else if (clickedMenuItem === "Alphabetically") {
        alphabeticallySortTodos();
      } else if (clickedMenuItem === "Creation date") {
        creationDateSortTodos();
      }

      // update activeCategory
      activeCategoryDetail.sortType = clickedMenuItem;

      // Save in Local Storage
      updateLocalStorage();

      // Display All Todos with changes
      displayTodos();
    });
  });
}

// Sort todos by Important ✔️
function importanceSortTodo() {
  activeCategoryDetail.todos.sort((a, b) =>
    a.isImportant === b.isImportant ? 0 : a.isImportant ? -1 : 1
  );

  // Save in Local Storage
  updateLocalStorage();

  displayTodos();
}

// Sort todos by Alphabetically ✔️
function alphabeticallySortTodos() {
  // Sorting the todos based on the name property
  activeCategoryDetail.todos.sort((a, b) => a.name.localeCompare(b.name));

  // Save in Local Storage
  updateLocalStorage();

  displayTodos();
}

// Sort todos by Creation Date ✔️
function creationDateSortTodos() {
  // Sorting the todos based on the date property
  activeCategoryDetail.todos.sort((a, b) => a.date - b.date);

  // Save in Local Storage
  updateLocalStorage();

  displayTodos();
}

// Toggle - Category Menu ✔️
categoryMenuIcon.addEventListener("click", function (event) {
  categoryMenu.classList.toggle("dropdown-show");
  event.stopPropagation();

  // Hide -  todoMenu & sortMenu
  todoMenu.classList.remove("dropdown-show");
  sortMenu.classList.remove("dropdown-show");

  if (themeColorBox.style.display === "flex") {
    themeColorBox.style.display = "none";
  }
  if (categoryMenu.classList.contains("dropdown-show")) {
    document.addEventListener("click", function () {
      categoryMenu.classList.remove("dropdown-show");
    });
  }
});

// Add Todo Icon Click Event ✔️
addTodoIcon.addEventListener("click", function () {
  addTodoInput.focus();
});

// Add Category Icon Click Event ✔️
addCategoryIcon.addEventListener("click", function () {
  addCategory.focus();
});

// Toggle - Sort Menu ✔️
sortBtn.addEventListener("click", function (event) {
  sortMenu.classList.toggle("dropdown-show");
  event.stopPropagation();

  // Hide - categoryMenu & todoMenu
  categoryMenu.classList.remove("dropdown-show");
  todoMenu.classList.remove("dropdown-show");

  // Close sortMenu if user click outside
  if (sortMenu.classList.contains("dropdown-show")) {
    document.addEventListener("click", function () {
      sortMenu.classList.remove("dropdown-show");
    });
  }
});

// Toggle - Sidebar ✔️
sidebarIcon.addEventListener("click", function () {
  sidebar.classList.toggle("sidebar-hide");
  mainContent.classList.toggle("main-expand");
});

// Close - Sorting Type
sortingRemoveIcon.addEventListener("click", function () {
  sortingTypeBox.style.display = "none";
  activeCategoryDetail.sortType = "none";
  displayTodos();
  // Save to Local Storage
  updateLocalStorage();
});

// Update Layout ✔️
function updateLayout() {
  // Hide Sidebar in smaller screen
  if (window.innerWidth < 800) {
    sidebar.classList.add("sidebar-hide");
    mainContent.classList.add("main-expand");
  }
}

// TODO : Move to - Todo Menu
// TODO : Change Icon - Category Menu

// FIX : Active Category
// FIX : Sorting Functionality
// FIX : Fixed Category - Not deletable
