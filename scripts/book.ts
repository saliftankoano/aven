import { env } from "@/lib/env";

interface BookCallRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

async function bookCall() {
  const calApiKey = env.CAL_API_KEY;
  const eventTypeId = "2032276";
  const tester = {
    name: "Murtada Shah",
    email: "murtada@aven.ai",
    phone: "+1234567890",
    message: "Need help understanding the Aven platform",
  };
}
