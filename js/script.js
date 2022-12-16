const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');


// const toDoData = [];
const toDoData = JSON.parse( localStorage.getItem('array') );

console.log(toDoData);

const render = function() {
    console.log(toDoData);
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
        } else {
            todoList.insertAdjacentElement('beforeend', li);
        }

        if(item.remove) {
            toDoData.splice(index, 1);
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


const examinationValue = function (value) {
    return value.trim() ? true : false;
};


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

        localStorage.setItem('array', JSON.stringify(toDoData));
    
        render();
    }

    

});
