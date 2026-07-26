"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, BookOpen } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestedPrompts = [
  "Recommend an adventure book",
  "How do I place an order?",
  "Summarize Chander Pahar",
];

export default function Chatwidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your Adhunik Boighor assistant. Ask me about books, get a quick summary, or find out how ordering works.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsStreaming(true);

    // Placeholder assistant message we'll stream into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.body) throw new Error("No response stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const dataStr = line.slice(6);
          if (dataStr === "[DONE]") continue;

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.content) {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: updated[updated.length - 1].content + parsed.content,
                };
                return updated;
              });
            }
          } catch {
            // ignore malformed chunk
          }
        }
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chat assistant"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary-accent)] text-white shadow-[0_12px_30px_rgba(201,123,74,0.4)] transition-transform duration-200 hover:-translate-y-1"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[70vh] max-h-[600px] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-[28px] border border-white/60 bg-white/20 shadow-[0_20px_60px_rgba(58,42,29,0.25)] backdrop-blur-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/40 bg-white/20 px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-accent)] text-white">
                <BookOpen size={17} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-color)]">
                  Boighor Assistant
                </p>
                <p className="text-xs text-[var(--text-muted)]">Ask me anything</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-color)] hover:bg-white/30"
            >
              <X size={17} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[var(--primary-accent)] text-white"
                      : "border border-white/50 bg-white/40 text-[var(--text-color)]"
                  }`}
                >
                  {msg.content || (
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)]" />
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Suggested prompts — only show at the start */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-[var(--glass-border)] bg-white/30 px-3 py-1.5 text-xs font-medium text-[var(--text-color)] transition-colors hover:bg-white/50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-white/40 bg-white/20 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a book..."
              disabled={isStreaming}
              className="flex-1 rounded-full border border-white/50 bg-white/40 px-4 py-2.5 text-sm text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary-accent)] text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}