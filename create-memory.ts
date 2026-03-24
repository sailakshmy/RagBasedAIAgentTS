// Sets up Langbase Memory (RAG) for storing and retrieving context
import "dotenv/config";
import { Langbase } from "langbase";

// Create a new instance of the Langbase class with the API key
const langbase = new Langbase({
  apiKey: process.env.LANGBASE_API_KEY || "",
});
async function main() {
  // Create a new memory using the memories.create() method and set up the name and description for the memory
  const memory = await langbase.memories.create({
    name: "knowledge-base-9",
    description: "An AI memory for agentic memory workshop",
    // Use the cohere:embed-multilingual-v3.0 model for embedding the memory
    embedding_model: "cohere:embed-multilingual-v3.0", //"openai:text-embedding-3-large", // "google:text-embedding-004",
    chunk_size: 1500,
    chunk_overlap: 256,
  });
  console.log("AI memory:", memory);
}

main();
