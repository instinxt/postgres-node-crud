const pool = require('./database');

const tableName = 'todos'; // Replace with your desired table name

const createTable = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS ${tableName} (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      completed BOOLEAN DEFAULT false
    );`);
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

const getAllTodos = async () => {
  try {
    const result = await pool.query(`SELECT * FROM ${tableName}`);
    return result.rows;
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};

const getTodoById = async (id) => {
  try {
    const result = await pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
    return result.rows[0]; // Assuming single row for the ID
  } catch (error) {  
    console.error('Error fetching todo:', error);
    return null;
  }
};

const createTodo = async (title) => {
  try {
    const result = await pool.query(`INSERT INTO ${tableName} (title) VALUES ($1) RETURNING *`, [title]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating todo:', error);
    return null;
  }
};

const updateTodo = async (id, title, completed) => {
  try {
    const result = await pool.query(`UPDATE ${tableName} SET title = $1, completed = $2 WHERE id = $3 RETURNING *`, [title, completed, id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating todo:', error);
    return null;
  }
};

const deleteTodo = async (id) => {
  try {
    await pool.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

module.exports = { createTable, getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo}
  
