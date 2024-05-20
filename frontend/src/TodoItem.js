import React from 'react';

function TodoItem({ todo, onToggleTodo, onDeleteTodo }) {
    return (
        <li>
            <input type="checkbox" checked={todo.completed} onChange={() => onToggleTodo(todo.id)} />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            <button onClick={() => onDeleteTodo(todo.id)}>Excluir</button>
        </li>
    );
}

export default TodoItem;
