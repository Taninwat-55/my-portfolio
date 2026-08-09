"use client";

import { useChat } from "@ai-sdk/react";
import { isTextUIPart } from "ai";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, RotateCcw } from "lucide-react";
import { chatPrompts } from "../data";

/**
 * Two audiences visit this site, and they do not open the chat with the same
 * question. The "services" variant runs on /services, where the visitor is a
 * prospective client rather than a recruiter.
 */
type ChatVariant = "portfolio" | "services";

const COPY: Record<ChatVariant, { title: string; intro: string }> = {
  portfolio: {
    title: "Ask about Taninwat",
    intro:
      "Hi! I know Taninwat's work, background, and projects. What would you like to know?",
  },
  services: {
    title: "Ask about working together",
    intro:
      "Hi! I can answer questions about the services, how projects run, and what things typically cost.",
  },
};

/**
 * Only a genuine rate-limit response should shut the input down. Everything else
 * — a dropped connection, an upstream hiccup — is recoverable and clears on the
 * next send. This used to be a single sticky boolean, which meant one transient
 * 502 permanently disabled the widget behind a "Limit reached" message that was
 * usually a lie.
 */
type ChatError = null | "limit" | "transient";

export function ChatWidget({ variant = "portfolio" }: { variant?: ChatVariant }) {
  const [isOpen, setIsOpen] = useState(false);
  const [chatError, setChatError] = useState<ChatError>(null);
  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const copy = COPY[variant];
  const prompts = chatPrompts[variant];

  const { messages, sendMessage, setMessages, status } = useChat({
    onError: (error) =>
      setChatError(/rate limit/i.test(error.message) ? "limit" : "transient"),
  });

  const isRateLimited = chatError === "limit";

  const resetChat = () => {
    setMessages([]);
    setChatError(null);
    setInputValue("");
    inputRef.current?.focus();
  };

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const submit = () => {
    const text = inputValue.trim();
    if (!text || isLoading || isRateLimited) return;
    setInputValue("");
    // A transient failure clears on retry; only a rate limit persists.
    setChatError(null);
    sendMessage({ text });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence mode="popLayout">
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(360px,calc(100vw-3rem))] origin-bottom-right"
          >
            <div className="rounded-2xl border border-frost/15 bg-night-800 shadow-xl shadow-black/40 overflow-hidden flex flex-col h-120">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-frost/10 shrink-0">
                <div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-crystal-500 mb-0.5">
                    AI Assistant
                  </div>
                  <div className="text-sm text-frost">{copy.title}</div>
                </div>
                <div className="flex items-center gap-1">
                  {messages.length > 0 && (
                    <button
                      onClick={resetChat}
                      className="p-1.5 rounded-lg text-frost/40 hover:text-frost hover:bg-white/5 transition-colors"
                      aria-label="New chat"
                      title="New chat"
                    >
                      <RotateCcw size={14} strokeWidth={1.5} />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-frost/40 hover:text-frost hover:bg-white/5 transition-colors"
                    aria-label="Close chat"
                  >
                    <X size={16} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {messages.length === 0 && (
                  <div className="space-y-3">
                    <p className="text-[13px] text-frost/60 leading-relaxed">
                      {copy.intro}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {prompts.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => sendMessage({ text: prompt })}
                          className="text-left text-[12px] px-3 py-2 rounded-lg border border-frost/10 bg-white/3 hover:bg-white/7 text-frost/80 transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg) => {
                  const text = msg.parts
                    .filter(isTextUIPart)
                    .map((p) => p.text)
                    .join("");
                  if (!text) return null;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                          msg.role === "user"
                            ? "bg-crystal-500 text-night-900 rounded-br-sm"
                            : "bg-white/6 text-frost rounded-bl-sm"
                        }`}
                      >
                        {text}
                      </div>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/6 rounded-2xl rounded-bl-sm px-3.5 py-3">
                      <Loader2 size={14} className="text-frost/60 animate-spin" />
                    </div>
                  </div>
                )}

                {chatError && (
                  <p className="text-[12px] text-frost/40 text-center py-2">
                    {isRateLimited
                      ? "Limit reached. Come back in an hour."
                      : "Something went wrong — try sending that again."}
                  </p>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t border-frost/10 shrink-0">
                <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isRateLimited ? "Limit reached" : "Ask anything..."}
                    disabled={isLoading || isRateLimited}
                    className="flex-1 bg-transparent text-[13px] text-frost placeholder:text-frost/30 outline-none disabled:opacity-50"
                  />
                  <button
                    onClick={submit}
                    disabled={!inputValue.trim() || isLoading || isRateLimited}
                    className="p-1 text-frost/60 hover:text-frost disabled:opacity-30 transition-colors shrink-0"
                    aria-label="Send message"
                  >
                    <Send size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
          isOpen
            ? "bg-night-800 text-frost border border-frost/15"
            : "bg-crystal-500 text-night-900"
        }`}
        style={{
          boxShadow: isOpen
            ? "0 8px 24px rgba(0, 0, 0, 0.4)"
            : "0 8px 24px rgba(127, 200, 227, 0.45)",
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Ask me anything"}
        title="Ask me anything"
      >
        {isOpen ? (
          <X size={20} strokeWidth={1.5} />
        ) : (
          <MessageCircle size={20} strokeWidth={1.5} />
        )}
      </motion.button>
    </div>
  );
}
