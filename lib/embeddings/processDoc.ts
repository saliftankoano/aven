import { OpenAI } from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import * as fs from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

interface DocumentChunk {
  id: string;
  text: string;
  metadata: {
    source: string;
    chunkIndex: number;
    timestamp: number;
  };
}

export async function processDoc(
  docPath: string,
  indexName: string = "aven-docs"
) {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY || "No API key provided",
  });

  try {
    console.log("Processing document:", docPath);
    console.log(process.env.OPENAI_API_KEY);

    const markdownContent = fs.readFileSync(docPath, "utf8");

    console.log("Markdown content length:", markdownContent.length);
    console.log("Beginning chunck splitting process ");

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
      separators: ["\n\n", "\n", " ", ""],
    });

    const docs = await textSplitter.createDocuments([markdownContent]);
    console.log("File split into ", docs.length, " chunks");

    // Create chunks with metadata
    const chunks: DocumentChunk[] = docs.map((doc, index) => ({
      id: `doc-${index}`,
      text: doc.pageContent,
      metadata: {
        source: docPath,
        chunkIndex: index,
        timestamp: Date.now(),
      },
    }));
    // Create embeddings in batches
    console.log("Creating embeddings in batches");
    const embeddings = await createEmbeddingsBatch(chunks, 20);

    console.log("Creating Pinecone index");
    const index = pinecone.Index(indexName);

    console.log("Upserting chunks into Pinecone");
    const vectors = chunks.map((chunk, index) => ({
      id: chunk.id,
      values: embeddings[index],
      metadata: {
        text: chunk.text,
        ...chunk.metadata,
      },
    }));

    // Upsert vectors in batches of 100
    const batchSize = 100;
    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      await index.upsert(batch);
      console.log(`Upserted batch ${i + 1} of ${vectors.length}`);
    }
    console.log("Upsert complete");

    return {
      success: true,
      chunksProcessed: chunks.length,
    };
  } catch (error) {
    console.error("Error processing document:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function createEmbeddingsBatch(
  chunks: DocumentChunk[],
  batchSize: number = 100
) {
  const embeddings: number[][] = [];
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "No API key provided",
  });
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    console.log(
      `Creating embeddings for batch ${i / batchSize + 1} of ${Math.ceil(
        chunks.length / batchSize
      )}`
    );

    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: batch.map((chunk) => chunk.text),
    });

    const batchEmbeddings = response.data.map((item) => item.embedding);
    embeddings.push(...batchEmbeddings);

    // Add delay between batches if needed
    if (i + batchSize < chunks.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return embeddings;
}
