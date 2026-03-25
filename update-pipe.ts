import "dotenv/config";
import { Langbase } from "langbase";

const langbase = new Langbase({
  apiKey: process.env.LANGBASE_API_KEY!,
});

async function main() {
  const pipe = await langbase.pipes.update({
    name: "ai-support-agent",
    model: "google:gemini-2.5-flash", // "google:gemini-2.0-flash",
  });
  console.log("Pipe updated", pipe);
}

main();
