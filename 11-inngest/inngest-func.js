import { inngest } from "./inngest-client.js";

export const onOrderPlaced = inngest.createFunction(
  {
    id: "on-order-placed",
    retries: 2,
    triggers: [
      {
        event: "order.placed", //event sends
      },
    ],
  },
  async ({ event, step }) => {
    const { orderId, customer } = event.data; //data invoke on inggest

    const greeting = await step.run("greet", async () => {
      return `Hello ${customer.name} Thanks for the the oder ${orderId}`;
    });

    await step.run("log-greeting", async () => {
      console.log(greeting);
    });

    return {
      ok: true,
      greeting,
    };
  },
);
