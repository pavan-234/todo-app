import { useState } from "react";

function TodoForm({ onTodoCreated }) {
    const [title, setTitle] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title.trim()) {
            return;
        }

        await onTodoCreated(title);

        setTitle("");
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                className="todo-input"
                type="text"
                placeholder="What do you need to do?"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />

            <button className="add-button" type="submit">
                Add Todo
            </button>
        </form>
    );
}

export default TodoForm;