import { checkOpenAi } from "./01-start.js";
import { calculateTool, calculate } from "./tools/calculator.js";
import readline from "node:readline";

const client = await checkOpenAi(); // Initialize the OpenAI client

const model = "gpt-4o-mini"; // Specify the model to use

console.log(client.baseURL);

const tools = [calculateTool]; // Array of tools that the AI model can use

const messages = [
  {
    role: "user",
    content: "What is result of add 10+13",
  },
];

const FirstResponse = await client.chat.completions.create({
  model,
  messages,
  tool_choice: "auto", // Let the model decide which tool to use
  tools,
});
console.log("+++++++++ First Response:  ++++++++++++");
const assistantMessage = FirstResponse.choices[0].message;

console.log(assistantMessage);
console.log(assistantMessage.tool_calls);

// messages.push(assistantMessage); //full context with tool call
