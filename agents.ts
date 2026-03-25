// Handles AI agent creation and configuration
import "dotenv/config";
import { Langbase, MemoryRetrieveResponse } from "langbase";

const langbase = new Langbase({
  apiKey: process.env.LANGBASE_API_KEY!,
});

// Generates the system prompt for the LLM by combining the retrieved chunks to create a system prompt
async function getSystemPrompt(chunks: MemoryRetrieveResponse[]) {
  let chunksText = "";
  for (const chunk of chunks) {
    chunksText += chunk.text + "\n";
  }
  const systemPrompt = `
  You're a helpful AI Assistant.
  You will assist users with their queries.
  Always ensure that you provide accurate and to the point information.
  Below is some CONTEXT for you to answer the questions. ONLY answer from the CONTEXT. CONTEXT consists of multiple information chunks. Each chunk has a source mentioned at the end.
  For each piece of response your provide, cite the source in brackets like so: [1].
  At the end of the answer, always list each source with its corresponding number and provide the document name. like so [1] Filename.doc. If there is a URL, make it hyperlink on the name.
  If you don't know the answer, say so. Ask for more context if needed.
  ${chunksText}.`;
  return systemPrompt;
}

// Creates a function that takes chunks and query as input
export async function runAiSupportAgent({
  chunks,
  query,
}: {
  chunks: MemoryRetrieveResponse[];
  query: string;
}) {
  const systemPrompt = await getSystemPrompt(chunks);
  // Uses the pipes.run method to generate responses using the LLM
  const { completion } = await langbase.pipes.run({
    stream: false,
    name: "ai-support-agent",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: query,
      },
    ],
  });
  return completion;
}

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
