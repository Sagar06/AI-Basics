import { text } from "express";
import { inngest, gpt4omini } from "./inngest-client.js";

export const summarizeThenTranslate = inngest.createFunction(
  {
    id: "summarize-then-translate",
    triggers: [
      {
        event: "summarize-then-translate",
      },
    ],
  },
  async ({ event, step }) => {
    //AI call
    const summary = await step.ai.infer("summarize", {
      model: gpt4omini,
      body: {
        input: [
          {
            role: "user",
            content:
              "Summarize the following test in 1 line: " + event.data.text,
          },
        ],
      },
    });
    //from summary object
    const sum = summary.output[0].content[0].text;

    const trans = await step.ai.infer("translate", {
      model: gpt4omini,
      body: {
        input: [
          {
            role: "user",
            content: `Translate the following text in Kannada:  ${sum}`,
          },
        ],
      },
    });
    const traslation = trans.output[0].content[0].text;
    return traslation;
  },
);
