const express = require('express');
const fs = require('fs').promises;
const app = express();

app.use(express.json());

let id = 0;

async function readTodos() {
  try {
    const data = await fs.readFile('todos.json', 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading file:', err);
    return [];
  }
}

async function writeTodos(todos) {
  try {
    await fs.writeFile('todos.json', JSON.stringify(todos, null, 2));
  } catch (err) {
    console.error('Error writing file:', err);
  }
}

async function readId() {
  try {
    const data = await fs.readFile('id.json', 'utf-8');
    return JSON.parse(data || '0');
  } catch (err) {
    console.error('Error reading ID file:', err);
    return 0;
  }
}

async function writeId(newId) {
  try {
    await fs.writeFile('id.json', JSON.stringify(newId));
  } catch (err) {
    console.error('Error writing ID file:', err);
  }
}

// Initialize the server with the latest ID
async function initializeId() {
  id = await readId();
}

initializeId(); // Call the function to set the initial ID

app.post('/todos/create', async function (req, res) {
  const todo = req.body;

  if (!todo || !todo.title) {
    return res.status(400).send('Invalid todo data.');
  }

  const todos = await readTodos();
  todo.id = id++;
  await writeId(id); // Update the latest ID in the file

  todos.push(todo);

  await writeTodos(todos);
  res.status(201).send('Todo added successfully.');
});

app.delete('/todos/delete/all', async function (req, res) {
  await writeTodos([]);
  res.status(200).send('All todos deleted successfully.');
});

app.delete('/todos/delete/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  const todos = await readTodos();
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).send('Todo not found.');
  }

  const newTodos = todos.filter((todo) => todo.id !== id);
  await writeTodos(newTodos);
  res.status(200).send('Todo deleted successfully.');
});

app.put('/todos/update/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  const todos = await readTodos();
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).send('Todo not found.');
  }

  todos[todoIndex] = { ...todos[todoIndex], ...updatedData };

  await writeTodos(todos);
  res.status(200).send('Todo updated successfully.');
});

app.get('/todos/get/all', async function (req, res) {
  const todos = await readTodos();
  res.json({ todos });
});

app.get('/todos/get/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  const todos = await readTodos();
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).send(`No todo with ID ${id} found.`);
  }

  res.json({ todo });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
