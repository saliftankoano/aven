import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "@/lib/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY || "No API key provided",
});

const pinecone = new Pinecone({
  apiKey: env.PINECONE_API_KEY || "No API key provided",
});

export async function POST(req: NextRequest) {
  try {
    const { query, topK = 10 } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }
    console.log("Searching knowledge base for:", query);

    const index = pinecone.Index("aven-docs");
    const queryEmbedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
    });
    // Query Pinecone for relevant chunks
    const searchResponse = await index.query({
      vector: queryEmbedding.data[0].embedding,
      topK,
      includeMetadata: true,
    });

    // Format the results
    const results =
      searchResponse.matches?.map((match) => ({
        text: match.metadata?.text,
        score: match.score,
        source: match.metadata?.source,
        chunkIndex: match.metadata?.chunkIndex,
      })) || [];

    const context = results.map((result) => result.text).join("\n\n");
    console.log(`Found ${results.length} relevant chunks`);
    console.log(`context: ${context}`);
    return NextResponse.json({
      success: true,
      context,
      results,
    });
  } catch (error) {
    console.error("Error during knowledge search:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
