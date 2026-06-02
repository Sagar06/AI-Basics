# AI-Basics: Modern AI Integration Patterns

A comprehensive learning and reference project demonstrating production patterns for integrating OpenAI's GPT models with Node.js, including state management, streaming, event-driven workflows, and tool integration.

## 📋 Overview

This project progresses from fundamental AI API calls to advanced enterprise patterns using Inngest for multi-step AI workflows. Each module builds upon previous concepts.

## 🎯 Project Structure

### Core Learning Modules (Sequential)

| File                                             | Purpose                     | Key Concepts                                                      |
| ------------------------------------------------ | --------------------------- | ----------------------------------------------------------------- |
| [01-start.js](01-start.js)                       | **OpenAI Setup**            | Environment setup, API key validation, lazy client initialization |
| [02-CallAI.js](02-CallAI.js)                     | **Basic Chat**              | Simple API calls, system/user roles, model selection              |
| [03-AiPromps.js](03-AiPromps.js)                 | **Prompt Engineering**      | Multiple personas, prompt variations, consistent formatting       |
| [04-NoMemoryAI.js](04-NoMemoryAI.js)             | **Stateless Conversations** | Independent queries, no context retention                         |
| [05-MemoryAi.js](05-MemoryAi.js)                 | **Conversation Memory**     | Message history, context persistence, token efficiency            |
| [06-await-for.js](06-await-for.js)               | **Async Iteration**         | Symbol.asyncIterator, streaming data patterns                     |
| [07-StreamHandlingAi.js](07-StreamHandlingAi.js) | **Response Streaming**      | Real-time token streaming, performance optimization               |
| [08-mini-Ai-bot.js](08-mini-Ai-bot.js)           | **Interactive CLI Bot**     | Readline interface, REPL patterns, stateful chatbot               |
| [09-callTool.js](09-callTool.js)                 | **Tool Integration**        | Function calling, AI-triggered tools, tool metadata               |

### Advanced Patterns

#### 10-todo-ingest/

Event-driven todo app with Inngest orchestration

- **server.js** — Express API with event emission
- **store.js** — In-memory CRUD operations
- **inngest/** — Event handlers (onTodoCreated, onTodoDeleted)

#### 11-inngest/

Multi-step AI workflows with Inngest

- **inngest-client.js** — Inngest + GPT-4o-mini setup
- **inngest-func.js** — Event-driven function definitions
- **step-ai.js** — Sequential AI steps (summarize → translate)
- **server.js** — Express server with Inngest middleware

### Utilities

| File                                       | Purpose                                                        |
| ------------------------------------------ | -------------------------------------------------------------- |
| [tools/calculator.js](tools/calculator.js) | Tool module with arithmetic operations for AI function calling |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key

### Installation

```bash
npm install
```

### Configuration

Create `.env` in the root directory:

```env
OPENAI_API_KEY=sk_...
PORT=3000
```

### Running Examples

```bash
# Basic setup verification
node 01-start.js

# Simple chat
node 02-CallAI.js

# Prompt engineering demo
node 03-AiPromps.js

# Conversation with memory
node 05-MemoryAi.js

# Interactive chatbot
node 08-mini-Ai-bot.js

# Tool calling demo
node 09-callTool.js

# Multi-step AI workflow
node 11-inngest/server.js
```

## 📚 Learning Path

1. **Start here:** 01-02-03 (Setup → Basic calls → Prompting)
2. **Add state:** 04-05 (Stateless → Stateful)
3. **Performance:** 06-07 (Streaming patterns)
4. **Interaction:** 08 (Interactive bot)
5. **Production:** 09-10-11 (Tools → Event-driven workflows)

## 🔧 Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **AI:** OpenAI SDK (gpt-4o-mini, gpt-4o)
- **Orchestration:** Inngest
- **CLI:** node:readline

## 💡 Key Patterns Demonstrated

### Message Management

- System/user role separation for personas
- Conversation history for context
- Token optimization strategies

### Streaming

- Async iterators for data processing
- Real-time token delivery
- Chunk-based response handling

### Tool Integration

- Function metadata and schemas
- AI-triggered tool execution
- Error handling in tool calls

### Event-Driven Architecture

- Event emission and handling
- Multi-step workflows (step.ai.infer)
- State management across steps

## 📦 Dependencies

```json
{
  "openai": "^6.39.1",
  "inngest": "^4.5.0",
  "express": "^5.2.1",
  "dotenv": "^17.4.2"
}
```

## 🎓 Use Cases

- **Chatbots** — Interactive AI assistants (08-mini-Ai-bot.js)
- **Batch Processing** — Summarization, translation pipelines (11-inngest/step-ai.js)
- **API Integrations** — Tool-calling workflows (09-callTool.js)
- **Event Systems** — AI-powered event handlers (10-todo-ingest/)

## ⚙️ Production Considerations

- Error handling and retry logic (implement exponential backoff)
- Token limit management and context windowing
- Rate limiting and quota management
- Logging and monitoring (integrate with your observability stack)
- Secret management (use SecureString in production)
- Database persistence (replace in-memory store)



## 🔗 Resources

- [OpenAI API Docs](https://platform.openai.com/docs)
- [Inngest Documentation](https://www.inngest.com/docs)
- [Express.js Guide](https://expressjs.com)
