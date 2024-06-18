const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./database');
const dotenv = require('dotenv')
const { createTable, 
       getAllTodos, 
       getTodoById, 
       createTodo, 
       updateTodo, 
       deleteTodo
 } = require('./config');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Parse incoming JSON data
app.use(bodyParser.json());

// Create table on startup (optional, can be run manually)
createTable();

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching todos');
  }
});

// Get a todo by ID
app.get('/todos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await getTodoById(id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).send('Todo not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching todo');
  }
});

// Create a new todo
app.post('/todos', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).send('Missing required field: title');
  }
  try {
    const newTodo = await createTodo(title);
    res.json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating todo');
  }
});

// Update a todo
app.put('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const { title, completed } = req.body;
  try {
    const updatedTodo = await updateTodo(id, title, completed);
    if (updatedTodo) {
      res.json(updatedTodo);
    } else {
      res.status(404).send('Todo not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating todo');
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await deleteTodo(id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting todo');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
    
