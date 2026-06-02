import { inngest } from "./client.js";

import { auditlog } from "../store.js";

export const onTodoCreated = inngest.createFunction(
  {
    id: "on-todo-created", // Unique identifier for the function
    triggers: [{ event: "todo/created" }], //array of events that will trigger this function
  },
  //workflows
  async ({ event, step }) => {
    await step.run("audit", async () => {
      auditlog.push({
        action: " created",
        todoId: event.data.todo.id,
        title: event.data.todo.title,
        timestamp: new Date().toISOString(),
      });
      return {
        ok: true,
      };
    }); // The function will run whenever a "todo/created" event is emitted, and it will log the details of the created todo item in the auditLog array.
  },
);

export const onTodoDeleted = inngest.createFunction(
  {
    id: "on-todo-deleted",
    retries: 3, // Number of times to retry the function in case of failure
    triggers: [{ event: "todo/deleted" }],
  },
  async ({ event, step, attempt }) => {
    const id = event.data.todo.id;
    await step.run("cleanup", async () => {
      if (attempt == 0) {
        //failure on first attesmp,
        throw new Error(
          "Failed to clean up resources for todo item with id: " + id,
        );
      }
      return "cleaned up successfully";
    });

    //more steps
    await step.run("audit", async () => {
      auditlog.push({
        action: "deleted",
        todoId: id,
      });
      return {
        ok: true,
      };
    });
  },
);
