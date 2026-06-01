import { checkOpenAi } from "./01-start.js";

const client = await checkOpenAi(); // Initialize the OpenAI client

const model = "gpt-4o-mini"; // Specify the model to use

console.log(client.baseURL);

async function askQuestion(systemPrompt, userPrompt) {
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });
  return response.choices[0].message.content;
}

const userQuestion = "Who own the RCB IPL Trophy in 2026?";
const friendlyResponse = await askQuestion(
  "You are a friendly assistant that provides concise and accurate answers to user questions.",
  userQuestion,
);

console.log("+++++++++ Friendly response:  ++++++++++++")
console.log(friendlyResponse);

const formalResponse = await askQuestion(
  "You are a formal assistant that provides detailed and accurate answers to user questions.",
  userQuestion,
);

console.log("+++++++++ Formal response:  ++++++++++++")
console.log(formalResponse);

const humorousResponse = await askQuestion(
  "You are a humorous assistant that provides witty and entertaining answers to user questions.",
  userQuestion,
);

console.log("+++++++++ Humorous response:  ++++++++++++")
console.log(humorousResponse);

