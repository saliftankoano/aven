import { NextRequest, NextResponse } from "next/server";

interface SearchResult {
  text: string;
  score: number;
  source: string;
  chunkIndex: number;
}

interface SearchResponse {
  success: boolean;
  context: string;
  results: SearchResult[];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received VAPI webhook:", JSON.stringify(body, null, 2));

    // Handle the simple format that VAPI is actually sending
    if (body.query) {
      console.log("Direct query format detected:", body.query);

      try {
        const searchResponse = await fetch(
          `${
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000"
              : process.env.NEXT_PUBLIC_BASE_URL
          }/api/knowledge-search`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: body.query }),
          }
        );

        const searchData: SearchResponse = await searchResponse.json();
        console.log("Search response:", searchData);

        if (searchData.success) {
          let result = searchData.context || "";

          // If context is empty but we have results, construct response from results
          if (!result && searchData.results && searchData.results.length > 0) {
            // Get the top 2-3 most relevant results
            const topResults = searchData.results
              .filter((r: SearchResult) => r.score > 0.3)
              .slice(0, 3)
              .map((r: SearchResult) => r.text)
              .join("\n\n");

            result = topResults || "No relevant information found";
          }

          if (!result) {
            result = "No relevant information found";
          }

          console.log("Returning result:", result);
          return NextResponse.json({ result });
        } else {
          console.log("Search failed, returning error message");
          return NextResponse.json({
            result:
              "Sorry, I encountered an error while searching the knowledge base",
          });
        }
      } catch (fetchError) {
        console.error("Error fetching from knowledge search:", fetchError);
        return NextResponse.json({
          result: "Sorry, I encountered a technical error while searching",
        });
      }
    }

    // Handle other webhook events (status updates, etc.)
    if (body.message) {
      console.log(`Received ${body.message.type} event`);
      return NextResponse.json({ received: true });
    }

    // If no recognizable format, return a generic response
    console.log("No recognized format, returning generic response");
    return NextResponse.json({
      result: "Webhook received but no recognized format found",
    });
  } catch (error) {
    console.error("Error processing VAPI webhook:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
