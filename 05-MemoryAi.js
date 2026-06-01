import { checkOpenAi } from "./01-start.js";

const client = await checkOpenAi(); // Initialize the OpenAI client

const model = "gpt-4o-mini"; // Specify the model to use

console.log(client.baseURL);

//how memory comes

const conversation = []; // This array will store the conversation history between the user and the assistant

async function askQuestion(systemPrompt, userPrompt, history = []) {
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      ...history, // Spread the conversation history into the messages array
      { role: "user", content: userPrompt },
    ],
  });
//   console.log(response);
  history.push({ role: "user", content: userPrompt }); // Add the user's message to the history
  history.push({
    role: "assistant",
    content: response.choices[0].message.content,
  }); //repponse to user's message to the history
  return {
    content: response.choices[0].message.content,
    usage: response.usage,
  };
}

const userQuestion = "My name is Sagar, tell me some jokes on Bollywood?";

const response1 = await askQuestion(
  "You always respon in 2 lines.",
  userQuestion,
  conversation,
);

console.log("+++++++++ Response 1:  ++++++++++++");
console.log(response1.content);

const userQuestion2 = "Tell mt name?";

const response2 = await askQuestion(
  "You always respon in 2 lines.",
  userQuestion2,
  conversation,
);

console.log("+++++++++ Response 2:  ++++++++++++");
console.log(response2.content);

const usage_stats = {
  prompt_tokens: response2.usage.prompt_tokens,
  completion_tokens: response2.usage.completion_tokens,
  total_tokens: response2.usage.total_tokens,
};
console.table(usage_stats);
