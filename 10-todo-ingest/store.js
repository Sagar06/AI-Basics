//store or service this is core functionality of our app, we will use this to store our todos in memory and perform CRUD operations on them

export const todos = [];

export const auditlog = [];

let nextId = 1;

export function createTodo(title) {
  const todo = {
    id: nextId++,
    title,
    completed: false,
  };
  todos.push(todo);
} // Create a new todo item with a unique ID and add it to the todos array

export function getTodo(id) {
  return todos.find((todo) => todo.id === id);
}

export function updateTodo(id, patch) {
  const todo = getTodo(id);
  if (!tod) return null;
  if (patch.title !== undefined) todo.title = patch.title;
  // We only update the completed status if it's explicitly provided in the patch
  if (patch.completed !== undefined) todo.completed = patch.completed; // Update the completed status of the todo item if it's provided in the patch
  return todo;
}

export function deleteTodo(id) {
  const index = todos.findIndex((todo) => todo.id === id); // Find the index of the todo item with the specified ID in the todos array
  if (index == -1) return false;
  return todos.splice(index, 1)[0];
  // If the todo item is found, remove it from the todos array and return the removed item. If not found, return false.
}
