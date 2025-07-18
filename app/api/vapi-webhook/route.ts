import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received VAPI webhook:", body);

    // Handle function calls
    if (body.type === "function_call") {
      const { functionCall } = body;

      if (functionCall.name === "knowledge_search") {
        const { query } = functionCall.parameters;

        const searchResponse = await fetch(
          ` ${process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.NEXT_PUBLIC_BASE_URL}/api/knowledge-search`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          }
        );

        const searchData = await searchResponse.json();

        if (searchData.success) {
          return NextResponse.json({
            result: searchData.context || "No relevant information found",
          });
        } else {
          return NextResponse.json({
            result:
              "Sorry, I encountered an error while searching the knowledge base",
          });
        }
      }
    }
    return NextResponse.json({
      success: false,
      result: "I'm sorry, I don't know how to answer that question 🤷🏾‍♂️",
    });
  } catch (error) {
    console.error("Error processing VAPI webhook:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
