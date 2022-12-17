'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');




// Получаем массив под ключом toDo из localStorage, или пустой массив
const toDoData = JSON.parse(localStorage.getItem('toDo')) || [];


// Функция добавляет массив toDoData в localStorage под ключом toDo
const addArrayToLocalStorage = function() {
    localStorage.setItem('toDo', JSON.stringify(toDoData));
};


// Проверка на пустое поле ввода
const examinationValue = function (value) {
    return value.trim() ? true : false;
};


// Функция render создает тег li и добавляет в todoList или todoCompleted
const render = function() {

    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach(function(item, index) {
        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = `
        <span class="text-todo">${item.text}</span>
	    <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
		</div>
        `;

        if(item.completed) {
            todoCompleted.insertAdjacentElement('beforeend', li);
            addArrayToLocalStorage();
        } else {
            todoList.insertAdjacentElement('beforeend', li);
            addArrayToLocalStorage();
        }

        if(item.remove) {
            toDoData.splice(index, 1);
            addArrayToLocalStorage();
            render();
        }

        li.querySelector('.todo-complete').addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });
        
        li.querySelector('.todo-remove').addEventListener('click', function() {
            item.remove = !item.remove;
            render();
        });

    });
};


// Создает новый массив newToDo и делает push в toDoData, потом вызывает addArrayToLocalStorage render
todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    if(examinationValue(headerInput.value)) {
        const newToDo = {
            text: headerInput.value,
            completed: false,
            remove: false,
        };
    
        toDoData.push(newToDo);
        headerInput.value = '';

        addArrayToLocalStorage();
        render();
    }

});


render();