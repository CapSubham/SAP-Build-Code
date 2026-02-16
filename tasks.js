
// src/routes/tasks.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Helper to run DB queries as promises
const run = (sql, params=[]) => new Promise((resolve, reject) => {
  db.run(sql, params, function(err) {
    if (err) return reject(err);
    resolve({ id: this.lastID, changes: this.changes });
  });
});
const get = (sql, params=[]) => new Promise((resolve, reject) => {
  db.get(sql, params, (err, row) => {
    if (err) return reject(err);
    resolve(row);
  });
});
const all = (sql, params=[]) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => {
    if (err) return reject(err);
    resolve(rows);
  });
});

// GET /api/tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await all('SELECT * FROM tasks ORDER BY datetime(createdAt) DESC');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
  }
});

// GET /api/tasks/:id
router.get('/:id', async (req, res) => {
  try {
    const task = await get('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch task', details: err.message });
  }
});

// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const { title, description = '', status = 'open' } = req.body;
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Title is required and must be a string' });
    }
    const result = await run(
      'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
      [title.trim(), description, status]
    );
    const created = await get('SELECT * FROM tasks WHERE id = ?', [result.id]);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task', details: err.message });
  }
});

// PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const existing = await get('SELECT * FROM tasks WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ error: 'Task not found' });

    const { title = existing.title, description = existing.description, status = existing.status } = req.body;
    await run(
      'UPDATE tasks SET title = ?, description = ?, status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description, status, id]
    );
    const updated = await get('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task', details: err.message });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await run('DELETE FROM tasks WHERE id = ?', [id]);
    if (result.changes === 0) return res.status(404).json({ error: 'Task not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task', details: err.message });
  }
});

module.exports = router;
