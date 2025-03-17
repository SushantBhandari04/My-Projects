let todoArr = [];

function addTodo(){
    todoArr.push({
        title : document.querySelector("input").value
    })
    render();
}

function deleteTodo(index){
    
    if(index!=-1){
        todoArr.splice(index,1);
    }
    render();
}

function createTodoComponent(todo){
    const allTodos = document.querySelector('.todos')

    const newTodoDiv = document.createElement('div')
    newTodoDiv.setAttribute('class','todoDiv')
    newTodoDiv.setAttribute('id',todoArr.indexOf(todo))
    

    const todoCheck = document.createElement('input')
    todoCheck.setAttribute('type','checkbox')
    todoCheck.setAttribute('class','checkbox')
    

    const newTodoName = document.createElement('h3')
    const newTodoDelete = document.createElement('button')
    newTodoDelete.setAttribute('class','deleteButton')
    
    const editButton = document.createElement('button');
    editButton.setAttribute('class','editButton');

    const leftDiv = document.createElement('div');
    leftDiv.setAttribute('class','leftDiv');

    const rightDiv = document.createElement('div');
    rightDiv.setAttribute('class','rightDiv');

    rightDiv.appendChild(editButton);
    rightDiv.appendChild(newTodoDelete);

    editButton.innerHTML = "Edit";
    editButton.setAttribute('onclick', 'handleEditButton(' + todoArr.indexOf(todo) + ')');
    

    newTodoDelete.innerHTML = "X"
    
    newTodoName.innerHTML = todo.title;
    leftDiv.appendChild(todoCheck);

    leftDiv.appendChild(newTodoName);

    newTodoDiv.appendChild(leftDiv);
    newTodoDiv.appendChild(rightDiv);
    
    allTodos.appendChild(newTodoDiv);

    newTodoDelete.setAttribute('onclick', 'deleteTodo('+todoArr.indexOf(todo)+')')

    todoCheck.addEventListener('change',function(){
        if(this.checked){
            newTodoName.style.textDecoration = 'line-through'
            newTodoName.style.textDecorationColor = 'red'
        }
        else{
            newTodoName.style.textDecoration = 'none';
        }
    })

    

}

function handleEditButton(id) {
    
    

    if(id!=-1){
        
    const div = document.getElementById(id);

    const leftDiv = div.querySelector('.leftDiv');
    const todoContent = leftDiv.querySelector('h3'); // Corrected: use querySelector instead of querySelectorAll
    const prevValue = todoContent.innerHTML; // Get the current todo text

    const newInput = document.createElement('input');
    newInput.setAttribute('class','newInput');

    newInput.value = prevValue;

    leftDiv.replaceChild(newInput, todoContent);

    const saveButton = document.createElement('button');
    saveButton.setAttribute('class','saveButton')
    saveButton.innerHTML = 'Save';

    // Replace the edit button with the save button
    const rightDiv = div.querySelector('.rightDiv');
    const editButton = div.querySelector('.editButton');
    // Replace the edit button with the save button
    rightDiv.replaceChild(saveButton, editButton);


    saveButton.addEventListener('click', function () {
        // Save the edited value
        todoContent.innerHTML = newInput.value;
        leftDiv.replaceChild(todoContent, newInput);

        // Restore the edit button
        rightDiv.replaceChild(editButton, saveButton);
    });
}
}


function render(){
    document.querySelector('.todos').innerHTML = "";

    for(let i=0;i<todoArr.length;i++){
        createTodoComponent(todoArr[i]);
    }
}