"use client";
import React, { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";

interface VapiWidgetProps {
  apiKey: string;
  assistantId: string;
  config?: Record<string, unknown>;
}

const VapiWidget: React.FC<VapiWidgetProps> = ({
  apiKey,
  assistantId,
  config = {},
}) => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConversation, setShowConversation] = useState(false);
  const [transcript, setTranscript] = useState<
    Array<{ role: string; text: string }>
  >([]);
  const conversationRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    if (conversationRef.current) {
      // Add a slight delay to allow users to read before auto-scrolling
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (conversationRef.current) {
          conversationRef.current.scrollTo({
            top: conversationRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 800);
    }
  };

  useEffect(() => {
    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);

    // Event listeners
    vapiInstance.on("call-start", () => {
      console.log("Call started");
      setIsLoading(false);
      setIsConnected(true);
    });

    vapiInstance.on("call-end", () => {
      console.log("Call ended");
      setIsConnected(false);
      setIsSpeaking(false);
      setIsLoading(false);
    });

    vapiInstance.on("speech-start", () => {
      console.log("Assistant started speaking");
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setIsSpeaking(false);
    });

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role,
            text: message.transcript,
          },
        ]);
      }
    });

    vapiInstance.on("error", (error) => {
      console.error("Vapi error:", error);
      setIsLoading(false);
    });

    return () => {
      vapiInstance?.stop();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };
  }, [apiKey]);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (transcript.length > 0 && showConversation) {
      scrollToBottom();
    }
  }, [transcript, showConversation]);

  const startCall = () => {
    if (vapi) {
      setIsLoading(true);
      vapi.start(assistantId);
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  const toggleConversation = () => {
    setShowConversation(!showConversation);
    // If showing conversation, scroll to bottom after a brief delay
    if (!showConversation && transcript.length > 0) {
      setTimeout(() => scrollToBottom(), 300);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 1000,
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {!isConnected && !isLoading ? (
        <button
          onClick={startCall}
          style={{
            background: "linear-gradient(135deg, #000000 0%, #333333 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "50px",
            padding: "18px 32px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            letterSpacing: "0.025em",
            backdropFilter: "blur(10px)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
            e.currentTarget.style.boxShadow =
              "0 12px 40px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.15) inset";
            e.currentTarget.style.background =
              "linear-gradient(135deg, #1a1a1a 0%, #404040 100%)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow =
              "0 8px 32px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.1) inset";
            e.currentTarget.style.background =
              "linear-gradient(135deg, #000000 0%, #333333 100%)";
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <path d="M12 19v4" />
            <path d="M8 23h8" />
          </svg>
          Speak to Alex
        </button>
      ) : isLoading ? (
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "24px",
            width: "320px",
            boxShadow:
              "0 20px 60px rgba(0, 0, 0, 0.15), 0 1px 0 rgba(255, 255, 255, 0.8) inset",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            animation: "slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #000000 0%, #333333 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
              animation: "loadingPulse 2s ease-in-out infinite",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <path d="M12 19v4" />
              <path d="M8 23h8" />
            </svg>
          </div>
          <h3
            style={{
              margin: "0 0 8px 0",
              fontSize: "18px",
              fontWeight: "600",
              color: "#111827",
              letterSpacing: "0.025em",
            }}
          >
            Connecting to Alex...
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#6b7280",
              fontWeight: "500",
            }}
          >
            Your assistant will be with you shortly
          </p>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "4px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #000000 0%, #333333 100%)",
                  animation: `loadingDots 1.4s ease-in-out infinite ${
                    i * 0.16
                  }s`,
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "24px",
            width: "380px",
            boxShadow:
              "0 20px 60px rgba(0, 0, 0, 0.15), 0 1px 0 rgba(255, 255, 255, 0.8) inset",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            animation: "slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
              paddingBottom: "16px",
              borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: isSpeaking
                    ? "linear-gradient(45deg, #ff4444, #ff6666)"
                    : "linear-gradient(45deg, #10b981, #34d399)",
                  animation: isSpeaking
                    ? "pulse 1.5s ease-in-out infinite"
                    : "none",
                  boxShadow: isSpeaking
                    ? "0 0 16px rgba(255, 68, 68, 0.4)"
                    : "0 0 16px rgba(16, 185, 129, 0.4)",
                }}
              ></div>
              <span
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  fontSize: "16px",
                  letterSpacing: "0.025em",
                }}
              >
                {isSpeaking ? "Alex is speaking..." : "Listening..."}
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                onClick={toggleConversation}
                style={{
                  background: showConversation
                    ? "linear-gradient(135deg, #111827 0%, #374151 100%)"
                    : "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
                  color: showConversation ? "#fff" : "#374151",
                  border: "none",
                  borderRadius: "10px",
                  padding: "6px 8px",
                  fontSize: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title={
                  showConversation ? "Hide conversation" : "Show conversation"
                }
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </button>
              <button
                onClick={endCall}
                style={{
                  background:
                    "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "8px 16px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  letterSpacing: "0.025em",
                  boxShadow: "0 2px 8px rgba(220, 38, 38, 0.3)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(220, 38, 38, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(220, 38, 38, 0.3)";
                }}
              >
                End Call
              </button>
            </div>
          </div>

          {showConversation && (
            <div
              ref={conversationRef}
              style={{
                maxHeight: "240px",
                overflowY: "auto",
                marginBottom: "0",
                padding: "16px",
                background: "rgba(249, 250, 251, 0.8)",
                borderRadius: "16px",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                animation: "fadeIn 0.3s ease-out",
              }}
            >
              {transcript.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "24px 16px",
                    color: "#6b7280",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      margin: "0 auto 12px",
                      opacity: 0.6,
                    }}
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  Your conversation will appear here
                </div>
              ) : (
                transcript.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "12px",
                      display: "flex",
                      justifyContent:
                        msg.role === "user" ? "flex-end" : "flex-start",
                      animation: `messageSlideIn 0.4s ease-out ${
                        i * 0.1
                      }s both`,
                    }}
                  >
                    <div
                      style={{
                        background:
                          msg.role === "user"
                            ? "linear-gradient(135deg, #111827 0%, #374151 100%)"
                            : "linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)",
                        color: msg.role === "user" ? "#ffffff" : "#111827",
                        padding: "12px 16px",
                        borderRadius:
                          msg.role === "user"
                            ? "18px 18px 4px 18px"
                            : "18px 18px 18px 4px",
                        display: "inline-block",
                        fontSize: "14px",
                        fontWeight: "500",
                        maxWidth: "85%",
                        lineHeight: "1.5",
                        boxShadow:
                          msg.role === "user"
                            ? "0 2px 8px rgba(17, 24, 39, 0.15)"
                            : "0 2px 8px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(255, 255, 255, 0.8) inset",
                        border:
                          msg.role === "user"
                            ? "none"
                            : "1px solid rgba(0, 0, 0, 0.06)",
                        letterSpacing: "0.025em",
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes messageSlideIn {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes loadingPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }
        
        @keyframes loadingDots {
          0%, 80%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          40% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        /* Custom scrollbar */
        div::-webkit-scrollbar {
          width: 4px;
        }
        
        div::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 2px;
        }
        
        div::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 2px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default VapiWidget;

// Usage in your app:
// <VapiWidget
//   apiKey="your_public_api_key"
//   assistantId="your_assistant_id"
// />
