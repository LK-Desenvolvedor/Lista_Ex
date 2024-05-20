import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} onToggleTodo={onToggleTodo} onDeleteTodo={onDeleteTodo} />
            ))}
        </ul>
    );
}

export default TodoList;
