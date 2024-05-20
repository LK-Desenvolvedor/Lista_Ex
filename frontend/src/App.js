import React, { useState, useEffect } from 'react';
import TodoList from "./TodoList.js";
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');

    useEffect(() => {
        fetch('/api/todos')
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error('Erro ao buscar todos:', error));
    }, []);

    const handleInputChange = (e) => {
        setTodoInput(e.target.value);
    };

    const handleAddTodo = () => {
        if (todoInput.trim() !== '') {
            setTodos([...todos, { id: Date.now(), text: todoInput, completed: false }]);
            setTodoInput('');
        }
    };

    const handleSaveTodos = () => {
        fetch('http://localhost:5000/api/todos', {  // Certifique-se de que a porta está correta aqui
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todos)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(savedTodos => {
            console.log('Todos salvos com sucesso:', savedTodos);
        })
        .catch(error => console.error('Erro ao salvar todos:', error));
    };
    

    const handleToggleTodo = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        }));
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="bodyPage">
            <div className="window">
                <div className="titleWindow">
                    <h1>Marombeiro Raiz</h1>
                </div>
                <div className="bodyWindow">
                    <h2>Lista de Exercícios</h2>
                    <input type="text" value={todoInput} onChange={handleInputChange} />
                    <div className="seuBotao">
                        <button onClick={handleAddTodo}>Adicionar</button>
                        <TodoList todos={todos} onToggleTodo={handleToggleTodo} onDeleteTodo={handleDeleteTodo} />
                        <button onClick={handleSaveTodos}>Salvar Lista</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
