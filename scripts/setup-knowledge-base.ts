import { processDoc } from "@/lib/embeddings/processDoc";
import path from "path";
import dotenv from "dotenv";

dotenv.config({path: path.join(process.cwd(), ".env.local")});

async function setupKnowledgeBase(){
    try{
        const markdownPath = path.join(process.cwd(), "data", "aven-docs.md");
        console.log("Processing markdown file:", markdownPath);

        await processDoc(markdownPath);
        console.log("Knowledge base setup complete");
    }
    catch(error){
        console.error("Error setting up knowledge base:", error);
        process.exit(1);
    }
}

setupKnowledgeBase();