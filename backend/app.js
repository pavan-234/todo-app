const express = require("express");
const cors = require("cors");

const Todo = require("./models/Todo");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.get("/api/todos", async (req, res) => {
    try {
        const todos = await Todo.find();

        res.json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);

        res.status(500).json({
            message: "Failed to fetch todos"
        });
    }
});

app.post("/api/todos", async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const todo = await Todo.create({
            title: title.trim()
        });

        res.status(201).json(todo);
    } catch (error) {
        console.error("Error creating todo:", error);

        res.status(500).json({
            message: "Failed to create todo"
        });
    }
});

app.put("/api/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const todo = await Todo.findByIdAndUpdate(
            id,
            {
                title,
                completed
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.json(todo);
    } catch (error) {
        console.error("Error updating todo:", error);

        res.status(500).json({
            message: "Failed to update todo"
        });
    }
});

app.delete("/api/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.json({
            message: "Todo deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting todo:", error);

        res.status(500).json({
            message: "Failed to delete todo"
        });
    }
});

module.exports = app;