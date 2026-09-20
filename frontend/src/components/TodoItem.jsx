import { useState } from "react";

function TodoItem({ todo, onTodoUpdated, onTodoDeleted }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    const handleToggle = async () => {
        await onTodoUpdated(todo._id, {
            title: todo.title,
            completed: !todo.completed
        });
    };

    const handleSave = async () => {
        if (!editTitle.trim()) {
            return;
        }

        await onTodoUpdated(todo._id, {
            title: editTitle.trim(),
            completed: todo.completed
        });

        setIsEditing(false);
    };

    const handleDelete = async () => {
        await onTodoDeleted(todo._id);
    };

    if (isEditing) {
        return (
            <div className="todo-item editing">
                <input
                    className="edit-input"
                    type="text"
                    value={editTitle}
                    onChange={(event) => setEditTitle(event.target.value)}
                    autoFocus
                />

                <div className="todo-actions">
                    <button
                        className="save-button"
                        onClick={handleSave}
                    >
                        Save
                    </button>

                    <button
                        className="cancel-button"
                        onClick={() => {
                            setEditTitle(todo.title);
                            setIsEditing(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`todo-item ${todo.completed ? "is-completed" : ""}`}>
            <label className="checkbox-wrapper">
                <input
                    className="todo-checkbox"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggle}
                />

                <span className="custom-checkbox">
                    {todo.completed && "✓"}
                </span>
            </label>

            <div className="todo-content">
                <span className="todo-title">
                    {todo.title}
                </span>

                <span className="todo-status">
                    {todo.completed ? "Completed" : "In progress"}
                </span>
            </div>

            <div className="todo-actions">
                <button
                    className="edit-button"
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </button>

                <button
                    className="delete-button"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TodoItem;