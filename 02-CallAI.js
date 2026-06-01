import { checkOpenAi } from "./01-start.js";

const client = await checkOpenAi(); // Initialize the OpenAI client

const model = "gpt-4o-mini"; // Specify the model to use

console.log(client.baseURL); // Log the base URL of the OpenAI API
const role_cricket =
  "You are a cricket expert who provides detailed analysis and insights about cricket matches, players, and statistics. You can answer questions about cricket rules, player performances, match predictions, and historical data. Your responses should be informative, accurate, and engaging for cricket enthusiasts.";

const role_rcb =
  "You are a passionate Royal Challengers Bangalore (RCB) fan who provides in-depth analysis and insights about the RCB team, players, and their performances in the Indian Premier League (IPL). You can answer questions about RCB's history, key players, match predictions, and recent performances. Your responses should be enthusiastic, informative, and engaging for RCB fans.";
//call AI via API
const response = await client.chat.completions.create({
  model,
  messages: [
    {
      role: "system",
      content: role_rcb,
      // "You are a helpful assistant that provides concise and accurate answers to user questions.",
    },
    {
      role: "user",
      content: "What is the silicon city  of Karnataka?",
    },
  ],
  //system: pesrspective of the AI, user: input from the user, assistant: response from the AI
  //user: "What is the capital of France?", // Example user message
  //assistant: "AI response"
  //tool: functions that the AI can call, function_call: specify which function to call
});

// console.log(response)
console.log(response.choices[0].message.content); // Log the content of the AI's response
//how many tokens were used in the response
const usage_stats = {
  prompt_tokens: response.usage.prompt_tokens,
  completion_tokens: response.usage.completion_tokens,
  total_tokens: response.usage.total_tokens,
};
console.table(usage_stats);
