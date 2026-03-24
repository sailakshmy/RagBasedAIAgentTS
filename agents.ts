// Handles AI agent creation and configuration
import "dotenv/config";
import { Langbase } from "langbase";

const langbase = new Langbase({
  apiKey: process.env.LANGBASE_API_KEY!,
});

export async function runMemoryAgent(query: string) {
  console.log("Langbase query starting", query);
  // Use the memories.retrieve to query the memory for the most relevant chunks, retrieving the top 4 results
  // from the memory named "knowledge-base"
  const chunks = await langbase.memories.retrieve({
    query,
    topK: 4,
    memory: [
      {
        name: "knowledge-base-9",
      },
    ],
  });
  console.log("Langbase query done");
  // return the retrieved chunks
  return chunks;
}
