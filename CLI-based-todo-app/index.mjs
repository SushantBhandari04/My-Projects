// Filesystem based todo list.

// Create a `cli` that lets a user

// 1. Add a todo
// 2. Delete a todo
// 3. Mark a todo as done

// Store all the data in files (todos.json)

// const chalk = require('chalk');
// const { createRequire } = require('module'); const require = createRequire(import.meta.url); const { program } = require('commander'); const chalk = require('chalk'); const fs = require('fs');
import { program } from 'commander'; import chalk from 'chalk'; import fs from 'fs';

program
 .version('1.0.0')
 .description(chalk.bold.green('CLI based todo app.'))



function readTodos(){
    const data = fs.readFileSync('todos.json','utf-8');
    return JSON.parse( data ||"[]");
}

function writeTodos(todos){
    fs.writeFile('todos.json',todos,()=>{});
}

function displayTodos(todos){
    console.log(chalk.green.bold("S.no | id | Title | Description | Deadline | Done"));
    for(let i=0;i<todos.length;i++){
        console.log(chalk.cyanBright(`${i+1}. | id: ${todos[i].id} | ${todos[i].title} |  ${todos[i].description} |  ${todos[i].deadline} | ${todos[i].done}\n`));
    }
}
program
 .command('add')
 .description(chalk.yellow('Adds the todo.'))
 .argument('<title>','Title of the todo')
 .argument('<description>','Description of the todo')
 .argument('<deadline>','Deadline of the todo')
 .action((title, description, deadline) => {
    const todos = readTodos();
    const id = todos.length!=0 ? todos[todos.length-1].id+1 : 0;
    todos.push({id, title, description, deadline, "done":false})
    writeTodos(JSON.stringify(todos));
    console.log(chalk.green("Todo added.\n"))
 })

program
 .command('delete')
 .description(chalk.yellow('Deletes the todo.'))
 .argument('<id>','Id of the todo')
 .action((id) => {
    const todos = readTodos();
    const todo = todos.find((todo)=>todo.id==id)

    if(!todo){
      console.log(chalk.red("No todo of this id is present. Enter a valid id."))
      return;
    }
    const newTodos = todos.filter((todo)=>todo.id!=id)
    writeTodos(JSON.stringify(newTodos));
    console.log(chalk.green("Todo deleted.\n"));
 })

program
 .command('complete')
 .description(chalk.yellow('Marks the todo as completed.'))
 .argument('<id>','Id of the todo')
 .action((id) => {
    const todos = readTodos();
    const todo = todos.find((todo)=>todo.id==id)

    if(!todo){
      console.log(chalk.red("No todo of this id is present. Enter a valid id."))
      return;
    }

    todo.done = true;
    writeTodos(JSON.stringify(todos));
    console.log(chalk.green("Todo completed.\n"))
 })

 program
  .command('display')
  .option('--all', 'Displays all the todos.')
  .option('--completed', 'Displays only the completed todos.')
  .option('--pending', 'Displays only the pending todos.')
  .description(chalk.yellow('Displays the todos based on the options( all, completed, pending ). Example: display --all'))
  .action((options)=>{
    const todos = readTodos();

    if(options.completed){
        const completedTodos = todos.filter((todo)=> todo.done==true);
        displayTodos(completedTodos);
    }
    else if(options.pending){
        const incompleteTodos = todos.filter((todo)=> todo.done==false);
        displayTodos(incompleteTodos);
    }
    else{
        displayTodos(todos);
    }
  })

  program
  .command('update')
  .argument('<id>', 'Id of the todo')
  .option('--title <title>', 'To update title of the todo.')
  .option('--description <description>', 'To update description of the todo.')
  .option('--deadline <deadline>', 'To update deadline of the todo.')
  .description(chalk.yellow('Updates the todos based on the options( title, description, deadline). Example: update 0 --title Walk --description "Go on a walk"'))
  .action((id, options) => {
    let todos = readTodos();
    const todoId = parseInt(id);

    let updateTodo = todos.find((todo) => todo.id === todoId);

    if (!updateTodo) {
      console.log(chalk.red("Please enter an existing todo id."));
    } else {
      if (options.title) {
        updateTodo.title = options.title;
      }
      if (options.description) {
        updateTodo.description = options.description;
      }
      if (options.deadline) {
        updateTodo.deadline = options.deadline;
      }

      const newTodos = todos.map((todo) => (todo.id === todoId ? updateTodo : todo));
      writeTodos(JSON.stringify(newTodos));

      console.log(chalk.green("Todo updated.\n"));
    }
  });

  program
   .command('details')
   .description(chalk.yellow('Gives the details of a todo.'))
   .argument('<id>','Id of the todo')
   .action((id)=>{
    const todos = readTodos();

    const todo = todos.find((todo)=>todo.id==id);

    if(!todo){
      console.log(chalk.red("No todo of this id is present. Enter a valid id."))
      return;
    }
    
    displayTodos([todo]);
   })



 program.parse();