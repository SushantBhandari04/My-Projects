const addTodoButton = document.querySelector("#addTodo")

let count = 1;

function addTodo(){
    const allTodos = document.querySelector('.todos')
    const todo = document.querySelector('input').value;

    const newTodoDiv = document.createElement('div')
    newTodoDiv.setAttribute('class','todoDiv')
    newTodoDiv.setAttribute('id',count)
    

    const todoCheck = document.createElement('input')
    todoCheck.setAttribute('type','checkbox')
    todoCheck.setAttribute('class','checkbox')
    

    const newTodoName = document.createElement('h3')
    const newTodoDelete = document.createElement('button')
    
    const editButton = document.createElement('button');
    

    newTodoDelete.innerHTML = "X"
    
    newTodoName.innerHTML = todo;
    newTodoDiv.appendChild(todoCheck);

    newTodoDiv.appendChild(newTodoName);
    newTodoDiv.appendChild(editButton);
    newTodoDiv.appendChild(newTodoDelete);
    allTodos.appendChild(newTodoDiv);

    newTodoDelete.setAttribute('onclick', 'deleteTodo('+count+')')

    todoCheck.addEventListener('change',function(){
        if(this.checked){
            newTodoName.style.textDecoration = 'line-through'
            newTodoName.style.textDecorationColor = 'red'
        }
        else{
            newTodoName.style.textDecoration = 'none';
        }
    })

    count++;

}

function deleteTodo(todoid){
    const el = document.getElementById(todoid);
    el.parentNode.removeChild(el);
}

