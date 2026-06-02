import "dotenv/config";

import express from "express";
import { serve } from "inngest/express";
import { inngest } from "./inngest-client.js";
import { onOrderPlaced } from "./inngest-func.js";
import { summarizeThenTranslate } from "./step-ai.js";

const app = express();
app.use(express.json());
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onOrderPlaced, summarizeThenTranslate],
  }),
);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost: ${port}`);
});
