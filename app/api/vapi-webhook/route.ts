import { NextRequest, NextResponse } from "next/server";

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

        const searchData = await searchResponse.json();
        console.log("Search response:", searchData);

        if (searchData.success) {
          let result = searchData.context || "";

          // If context is empty but we have results, construct response from results
          if (!result && searchData.results && searchData.results.length > 0) {
            // Get the top 2-3 most relevant results
            const topResults = searchData.results
              .filter((r: any) => r.score > 0.4) // Only use results with good relevance scores
              .slice(0, 3)
              .map((r: any) => r.text)
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

    // Handle tool calls - VAPI uses message.type: "tool-calls" (alternative format)
    if (body.message && body.message.type === "tool-calls") {
      const { toolCallList } = body.message;
      console.log("Processing tool calls:", toolCallList);

      const results = [];

      for (const toolCall of toolCallList) {
        console.log(
          "Processing tool call:",
          toolCall.name,
          "with ID:",
          toolCall.id
        );

        if (toolCall.name === "knowledge_search") {
          const { query } = toolCall.arguments || {};
          console.log("Knowledge search query:", query);

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
                body: JSON.stringify({ query }),
              }
            );

            const searchData = await searchResponse.json();
            console.log("Search response:", searchData);

            if (searchData.success) {
              let result = searchData.context || "";

              // If context is empty but we have results, construct response from results
              if (
                !result &&
                searchData.results &&
                searchData.results.length > 0
              ) {
                // Get the top 2-3 most relevant results
                const topResults = searchData.results
                  .filter((r: any) => r.score > 0.4) // Only use results with good relevance scores
                  .slice(0, 3)
                  .map((r: any) => r.text)
                  .join("\n\n");

                result = topResults || "No relevant information found";
              }

              if (!result) {
                result = "No relevant information found";
              }

              console.log("Returning result for toolCallId:", toolCall.id);
              results.push({
                toolCallId: toolCall.id,
                result: result,
              });
            } else {
              console.log("Search failed, returning error message");
              results.push({
                toolCallId: toolCall.id,
                result:
                  "Sorry, I encountered an error while searching the knowledge base",
              });
            }
          } catch (fetchError) {
            console.error("Error fetching from knowledge search:", fetchError);
            results.push({
              toolCallId: toolCall.id,
              result: "Sorry, I encountered a technical error while searching",
            });
          }
        } else {
          // Handle other tool calls
          console.log("Unknown tool call:", toolCall.name);
          results.push({
            toolCallId: toolCall.id,
            result: `I don't know how to handle the function: ${toolCall.name}`,
          });
        }
      }

      // Return results in the format VAPI expects
      console.log("Returning results:", results);
      return NextResponse.json({ results });
    }

    // Handle other webhook events (status updates, etc.)
    if (body.message) {
      console.log(`Received ${body.message.type} event`);

      // For non-tool-call events, we just acknowledge receipt
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
