// Uploads documents to Memory so agents can access and use them
import "dotenv/config";
import { Langbase } from "langbase";
import { readFile } from "fs/promises";
import path from "path";

const langbase = new Langbase({
  apiKey: process.env.LANGBASE_API_KEY || "",
});

async function main() {
  const cwd = process.cwd();
  const memoryName = "knowledge-base-9";

  // Upload agent architeture document to memory

  // 1. read the file in the path
  const agentArchitecture = await readFile(
    path.join(cwd, "docs", "agent-architectures.txt"),
  );
  // 2. upload the .txt file to the AI memory
  const agentResult = await langbase.memories.documents.upload({
    memoryName,
    contentType: "text/plain",
    documentName: "agent-architectures.txt",
    document: agentArchitecture,
    meta: {
      // Added to help organize the content
      category: "Examples",
      topic: "Agent Architectures",
    },
  });
  console.log(`${agentResult.ok ? "Agent Doc uploaded" : "Agent doc failed"}`);

  // Upload FAQ document to memory
  const faq = await readFile(path.join(cwd, "docs", "langbase-faq.txt"));
  const faqResult = await langbase.memories.documents.upload({
    memoryName,
    documentName: "langbase-faq.txt",
    document: faq,
    contentType: "text/plain",
    meta: {
      category: "Support",
      topic: "Langbase FAQs",
    },
  });
  console.log(`${faqResult.ok ? "FAQ Doc uploaded" : "FAQ doc failed"}`);
}

main();
