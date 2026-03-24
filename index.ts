// Entry point of a TypeScript project. Orchestrates agent creation, memory setup and document upload
import { runMemoryAgent } from "./agents";

async function main() {
  try {
    const chunks = await runMemoryAgent("agent");
    console.log("Memory chunks:", chunks);
  } catch (error) {
    console.error("Failed runMemoryAgent:", error);
  }
}

main().catch((err) => {
  console.error("Unhandled main error:", err);
});
