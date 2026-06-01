import { checkOpenAi } from "./01-start.js";

const client = await checkOpenAi(); // Initialize the OpenAI client

const model = "gpt-4o-mini"; // Specify the model to use

console.log(client.baseURL);

//how to stream
const stream = await client.chat.completions.create({
  model,
  stream: true, // Enable streaming
  messages: [
    {
      role: "system",
      content:
        "You are a helpful assistant that provides concise and accurate answers to user questions.",
    },
    {
      role: "user",
      content: "why I need to learn development in  2026 AI era?",
    },
  ],
});

//how to handle stream response
let last_chuck = null;

for await (const message of stream) {
  const delta = message.choices[0]?.delta?.content; // Get the content of the current chunk partial response
  if (delta) {
    process.stdout.write(delta); // Write the delta to the console without a new line
  }
  last_chuck += delta; // Append the delta to the last_chuck variable to keep track of the full response
}
