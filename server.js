const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todolist' // Make sure the database exists
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to database', err);
    return;
  }
  console.log('Connected to database');
});

// API to fetch all tasks
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM list', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// API to create a new task
app.post('/tasks', (req, res) => {
  const { task_name, start_date, end_date, status } = req.body;
  const query = 'INSERT INTO list (task_name, start_date, end_date, status) VALUES (?, ?, ?, ?)';
  
  db.query(query, [task_name, start_date, end_date, status || 'pending'], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: 'Task created', taskId: result.insertId });
    }
  });
});

// API to delete a task by id
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const query = 'DELETE FROM list WHERE id = ?';

  db.query(query, [taskId], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Task not found' });
    } else {
      res.json({ message: 'Task deleted' });
    }
  });
});

// API to update a task by id
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { task_name, start_date, end_date, status } = req.body;
  const query = `
    UPDATE list 
    SET task_name = ?, start_date = ?, end_date = ?, status = ?
    WHERE id = ?
  `;

  db.query(query, [task_name, start_date, end_date, status, taskId], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Task not found' });
    } else {
      res.json({ message: 'Task updated' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
