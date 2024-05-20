const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Save multiple todos
router.post('/', async (req, res) => {
    try {
        const todos = req.body;
        const savedTodos = [];
        for (let todoData of todos) {
            const todo = new Todo({
                text: todoData.text,
                completed: todoData.completed
            });
            const savedTodo = await todo.save();
            savedTodos.push(savedTodo);
        }
        res.status(201).json(savedTodos);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a todo
router.patch('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo == null) {
            return res.status(404).json({ message: 'Cannot find todo' });
        }
        if (req.body.text != null) {
            todo.text = req.body.text;
        }
        if (req.body.completed != null) {
            todo.completed = req.body.completed;
        }
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo == null) {
            return res.status(404).json({ message: 'Cannot find todo' });
        }
        await todo.remove();
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
