//using node:readline module to create a simple command line interface for the AI bot
//question wrap in function
//while(true){
//ask question: user prompt
//get response: AI response
//print response: console.log(response)
//}

import { checkOpenAi } from "./01-start.js";
import readline from "node:readline";

const client = await checkOpenAi(); // Initialize the OpenAI client

const model = "gpt-4o-mini"; // Specify the model to use

console.log(client.baseURL);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
}); // Create a readline interface for user input and output

//sytem prompt

const systemPrompt =
  "You are a helpful assistant that provides concise and accurate answers to user questions. Always respond in 2 lines.";
function askQuestion(userPrompt) {
  return new Promise((resolve) => {
    rl.question(userPrompt, (answer) => {
      resolve(answer);
    });
  });
} //promisify the readline question method to use async/await
while (true) {
  const userPrompt = await askQuestion("Ask a question: "); // Ask the user for input
  if (userPrompt.toLowerCase() === "exit") {
    console.log("Exiting...");
    break; // Exit the loop if the user types "exit"
  }
  const stream = await client.chat.completions.create({
    model,
    stream: true, // Enable streaming
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
  }); //stream generate response from the AI model based on the user prompt and system prompt
  process.stdout.write("Self Bot: "); // Print "Bot: " before the response
  for await (const message of stream) {
    const delta = message.choices[0]?.delta?.content; // Get the content of the current chunk partial response

    if (delta) {
      process.stdout.write(delta); // Write the delta to the console without a new line
    }
  }
  console.log("/n"); // Print a new line after the response is complete
}
rl.close(); // Close the readline interface when done
