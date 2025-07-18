import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received VAPI webhook:", JSON.stringify(body, null, 2));

    // Handle tool calls - VAPI uses message.type: "tool-calls"
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
              const result =
                searchData.context || "No relevant information found";
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

    // If it's not a message-wrapped event, it might be a direct call
    console.log("No message wrapper found, treating as direct call");
    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error("Error processing VAPI webhook:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
