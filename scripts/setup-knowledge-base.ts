import { processDoc } from "@/lib/embeddings/processDoc";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

async function setupKnowledgeBase() {
  const allFilePaths = [
    path.join(process.cwd(), "data", "terms-of-service.md"),
    path.join(process.cwd(), "data", "pay-it-forward-terms.md"),
    path.join(process.cwd(), "data", "licenses.md"),
    path.join(process.cwd(), "data", "landing.md"),
    path.join(process.cwd(), "data", "aven-docs.md"),
    path.join(process.cwd(), "data", "about.md"),
    path.join(process.cwd(), "data", "privacy", "consumer-privacy-notice.md"),
    path.join(process.cwd(), "data", "privacy", "privacy-policy.md"),
    path.join(process.cwd(), "data", "disclosures", "cfpb-charm-handbook.md"),
    path.join(process.cwd(), "data", "disclosures", "e-sign-consent.md"),
    path.join(process.cwd(), "data", "disclosures", "heloc-brochure.md"),
  ];
  try {
    for (const markdownPath of allFilePaths) {
      console.log("Processing markdown file:", markdownPath);

      await processDoc(markdownPath);
      console.log(`Processed ${markdownPath}`);
    }
    console.log("Knowledge base setup complete");
  } catch (error) {
    console.error("Error setting up knowledge base:", error);
    process.exit(1);
  }
}

setupKnowledgeBase();
