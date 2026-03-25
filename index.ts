// Entry point of a TypeScript project. Orchestrates agent creation, memory setup and document upload
import { runAiSupportAgent, runMemoryAgent } from "./agents";

async function main() {
  try {
    // This runs 2 agents - 1 to retrieve memory chunks relevant to a query
    // and another to generate a final answer using those chunks
    const query = "What is agent parallelization?";
    const chunks = await runMemoryAgent(query);
    console.log("Memory chunks:", chunks);
    const completion = await runAiSupportAgent({ chunks, query });
    console.log("Completion: ", completion);
  } catch (error) {
    console.error("Failed runMemoryAgent:", error);
  }
}

main().catch((err) => {
  console.error("Unhandled main error:", err);
});
