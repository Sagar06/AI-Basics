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

const userQuestion = "My name is Sagar, tell me some jokes on AI?";

const friendlyResponse = await askQuestion(
  "You always respon in 2 lines.",
  userQuestion,
);

console.log("+++++++++ Friendly response:  ++++++++++++");
console.log(friendlyResponse);

const userQuestion2 = "Tell my name?";

const formalResponse = await askQuestion(
  "You always respon in 2 lines.",
  userQuestion2,
);

console.log("+++++++++ Formal response:  ++++++++++++");
console.log(formalResponse);
