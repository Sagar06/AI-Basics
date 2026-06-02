//express server

import express from "express";
import { todos, createTodo, deleteTodo } from "./store.js";
import "dotenv/config"; // Load environment variables from .env file

import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { onTodoCreated, onTodoDeleted } from "./inngest/functions.js";

const app = express(); // Create an instance of the Express application

app.use(express.json()); // Middleware to parse JSON request bodies
//inggest import
app.use(
  "/api/inggest",
  serve({
    client: inngest,
    functions: [onTodoCreated, onTodoDeleted],
  }),
);
app.post("/todos", async (req, res) => {
  const { title } = req.body; // Extract the title from the request body
  if (!title) return res.status(400).json({ error: "Title is required" });
  const todo = createTodo(title); // Create a new todo item using the createTodo function
  await inngest.send({
    name: "todo/created",
    date: {
      todo,
    }, // Include the created todo item in the event data when sending the "todo/created" event to Inngest
  });
  res.status(201).json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id); // Extract the ID from the request parameters and convert it to an integer
  const todo = deleteTodo(id); // Delete the todo item with the specified ID using the deleteTodo function
  if (!todo) return res.status(404).json({ error: "Todo not found" }); // If the todo item is not found, return a 404 error response
  await inngest.send({
    name: "todo/deleted",
    data: {
      todo,
    },
  }); // Include the deleted todo item in the event data when sending the "todo/deleted" event to Inngest
  res.json(todo);
});

app.listen(3000, () => {
  console.log("Server is runnig on http://localhost:3000");
});
