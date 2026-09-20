

import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";
import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} from "./services/todoService";

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            const data = await getTodos();
            setTodos(data);
        } catch (error) {
            console.error("Failed to load todos:", error);
        }
    };

    const handleTodoCreated = async (title) => {
        try {
            const newTodo = await createTodo(title);

            setTodos((currentTodos) => [
                ...currentTodos,
                newTodo
            ]);
        } catch (error) {
            console.error("Failed to create todo:", error);
        }
    };

    const handleTodoUpdated = async (id, data) => {
        try {
            const updatedTodo = await updateTodo(id, data);

            setTodos((currentTodos) =>
                currentTodos.map((todo) =>
                    todo._id === updatedTodo._id
                        ? updatedTodo
                        : todo
                )
            );
        } catch (error) {
            console.error("Failed to update todo:", error);
        }
    };

    const handleTodoDeleted = async (id) => {
        try {
            await deleteTodo(id);

            setTodos((currentTodos) =>
                currentTodos.filter((todo) => todo._id !== id)
            );
        } catch (error) {
            console.error("Failed to delete todo:", error);
        }
    };

    return (
        <div>

            {/* <h1>Todo List</h1> */}

            <header className="header">
                <div className="brand">
                    <div className="brand-icon">✓</div>

                    <span className="brand-name">
                        TASKFLOW
                    </span>
                </div>

                <h1>Get things done.</h1>

                <p>
                    Organize your tasks, stay focused, and make progress.
                </p>
            </header>

            <TodoForm
                onTodoCreated={handleTodoCreated}
            />

            <div className="list-header">
                <div>
                    <h2 className="list-title">My Tasks</h2>

                    <p className="list-subtitle">
                        {todos.length === 0
                            ? "Start by adding a task"
                            : `${todos.length} total task${todos.length === 1 ? "" : "s"}`}
                    </p>
                </div>

                <span className="task-count">
                    {todos.filter((todo) => !todo.completed).length} remaining
                </span>
            </div>
                             
            <TodoList
                todos={todos}
                onTodoUpdated={handleTodoUpdated}
                onTodoDeleted={handleTodoDeleted}
            />
        </div>
    );
}

export default App;