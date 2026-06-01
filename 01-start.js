import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const API_KEY = process.env.OPENAI_API_KEY;

export const apiKeyChecker = () => {
  if (!API_KEY) {
    console.error(
      "Error: OPENAI_API_KEY is not set in the environment variables.",
    );
    process.exit(1);
  }
};

export const checkOpenAi = async () => {
  const openai = (await import("openai")).default; //lazy import, when functions call only it works
  const client = new openai.OpenAI({
    apiKey: API_KEY,
  }); //creats a new instance of the OpenAI client
  if (!client) {
    console.error("Error: Failed to initialize OpenAI client.");
    process.exit(1);
  }
  return client;
};
