import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import VapiWidget from "@/components/VapiAssistant";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <VapiWidget
        apiKey={process.env.NEXT_PUBLIC_VAPI_API_KEY || ""}
        assistantId={process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || ""}
      />
    </main>
  );
}
