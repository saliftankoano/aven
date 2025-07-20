import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

export const env = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  PINECONE_API_KEY: process.env.PINECONE_API_KEY,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  VAPI_API_KEY: process.env.NEXT_PUBLIC_VAPI_API_KEY,
  VAPI_ASSISTANT_ID: process.env.VAPI_ASSISTANT_ID,
  VAPI_TEST_SUITE_ID: process.env.VAPI_TEST_SUITE_ID,
  VAPI_PRIVATE_API_KEY: process.env.VAPI_PRIVATE_API_KEY,
};
