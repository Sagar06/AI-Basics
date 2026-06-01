//function can be anything calling weather app, db query, or any other tool that the AI model can use to get information or perform actions. The function should be designed to be easily called by the AI model when it needs to perform a specific task. In this case, we are creating a calculator function that can perform basic arithmetic operations.
export async function calculate(operation, num1, num2) {
  if (typeof num1 !== "number" || typeof num2 !== "number") {
    throw new Error("Both num1 and num2 should be numbers");
  }

  switch (operation) {
    case "add":
      return num1 + num2;
    case "subtract":
      return num1 - num2;
    case "multiply":
      return num1 * num2;
    case "divide":
      if (num2 === 0) {
        throw new Error("Cannot divide by zero");
      }
      return num1 / num2;
    default:
      throw new Error(
        "Invalid operation. Supported operations are: add, subtract, multiply, divide",
      );
  }
}
//metaData for the calculator tool to be used by the AI model to understand how to call this function when needed
export const calculateTool = {
  type: "function", 
  function: "calculator",
  description:
    "A tool to perform basic arithmetic operations. Supported operations are: add, subtract, multiply, divide. Usage: calculator(operation, num1, num2)",
  parameteres: {
    type: "object",
    properties: {
      operation: {
        type: "string",
        description:
          "The arithmetic operation to perform. Supported operations are: add, subtract, multiply, divide",
      },
      num1: {
        type: "number",
        description: "The first number for the calculation",
      },
      num2: {
        type: "number",
        description: "The second number for the calculation",
      },
    },
    required: ["operation", "num1", "num2"],
  },
};
