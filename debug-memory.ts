// debug-memory.ts
import "dotenv/config";
import { Langbase } from "langbase";

const lb = new Langbase({ apiKey: process.env.LANGBASE_API_KEY! });

async function main() {
  console.log("Memories:");
  console.log(await lb.memories.list());

  console.log("Knowledge-base docs:");
  console.log(
    await lb.memories.documents.list({ memoryName: "knowledge-base-9" }),
  );
}
main().catch(console.error);
