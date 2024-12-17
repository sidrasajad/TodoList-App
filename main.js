// Get elements from the DOM
const todoLists = document.querySelector(".todoLists");
const listValue = document.querySelector(".todoValue");
let todoListValue = [];

// Event listener for adding a new item
document.querySelector(".add-btn").addEventListener('click', (e) => {
    addTodoList(e);
});

// Function to display items from local storage
const showTodoList = () => {
    todoListValue = getTodoListFromLS();
    todoLists.innerHTML = ''; // Clear existing list
    todoListValue.forEach((curTodo, index) => 
    {
        displayTodoItem(curTodo, index);
    });
};

// Function to add a new item
const addTodoList = (e) => {
    e.preventDefault();

    // Retrieve value
    let newTodo = listValue.value.trim();
    listValue.value = "";

    if (newTodo.length !== 0 && !todoListValue.includes(newTodo)) {
        todoListValue.push(newTodo);
        // Store in Local Storage
        addTodoListLocalStorage(todoListValue);
        // Display new item
        displayTodoItem(newTodo, todoListValue.length - 1);
    }
};

// Function to display an item in the list
const displayTodoItem = (todoText, index) => 
{
    const liElement = document.createElement('li');
    liElement.innerHTML = `
        <span>${todoText}</span>
        <div class="action-buttons">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    // Event listener for Edit button
    liElement.querySelector('.edit-btn').addEventListener('click', () => {
        editTodoItem(index, liElement);
    });

    // Event listener for Delete button
    liElement.querySelector('.delete-btn').addEventListener('click', () => {
        deleteTodoItem(index, liElement);
    });

    todoLists.appendChild(liElement);
};

// Function to edit a to-do item
const editTodoItem = (index, liElement) => 
{
    let updatedText = prompt("Edit your task:", todoListValue[index]);
    if (updatedText) 
    {
        todoListValue[index] = updatedText.trim();
        addTodoListLocalStorage(todoListValue);
        liElement.querySelector('span').textContent = updatedText;
    }
};

// Function to delete a to-do item
const deleteTodoItem = (index, liElement) => 
{
    todoListValue.splice(index, 1); // Remove the item from the array
    addTodoListLocalStorage(todoListValue); // Update local storage
    liElement.remove(); // Remove the item from the DOM
};

// Set Data in Local Storage
const addTodoListLocalStorage = (todo) => {
    localStorage.setItem("todoData", JSON.stringify(todo));
};

// Get Data From Local Storage
const getTodoListFromLS = () => {
    return JSON.parse(localStorage.getItem("todoData")) || [];
};

// Load items from localStorage on page load
showTodoList();























