"use client";

import { useChat } from "@ai-sdk/react";
import { isTextUIPart } from "ai";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, RotateCcw } from "lucide-react";

const SUGGESTED_PROMPTS = [
  "What has he built?",
  "What's his background?",
  "Is he open to work?",
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, setMessages, status } = useChat({
    onError: () => setHasError(true),
  });

  const resetChat = () => {
    setMessages([]);
    setHasError(false);
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
    if (!text || isLoading || hasError) return;
    setInputValue("");
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
            <div className="rounded-2xl border border-border bg-sand-50/95 backdrop-blur-xl shadow-xl shadow-ink-900/10 overflow-hidden flex flex-col h-[480px]">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-clay-500 mb-0.5">
                    AI Assistant
                  </div>
                  <div className="text-sm text-ink-700">Ask about Taninwat</div>
                </div>
                <div className="flex items-center gap-1">
                  {messages.length > 0 && (
                    <button
                      onClick={resetChat}
                      className="p-1.5 rounded-lg text-ink-300 hover:text-ink-900 hover:bg-sand-200 transition-colors"
                      aria-label="New chat"
                      title="New chat"
                    >
                      <RotateCcw size={14} strokeWidth={1.5} />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-ink-300 hover:text-ink-900 hover:bg-sand-200 transition-colors"
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
                    <p className="text-[13px] text-ink-500 leading-relaxed">
                      Hi! I know Taninwat&apos;s work, background, and projects.
                      What would you like to know?
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {SUGGESTED_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => sendMessage({ text: prompt })}
                          className="text-left text-[12px] px-3 py-2 rounded-lg border border-border bg-sand-100 hover:bg-sand-200 text-ink-700 transition-colors"
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
                            ? "bg-ink-900 text-sand-50 rounded-br-sm"
                            : "bg-sand-200 text-ink-900 rounded-bl-sm"
                        }`}
                      >
                        {text}
                      </div>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-sand-200 rounded-2xl rounded-bl-sm px-3.5 py-3">
                      <Loader2 size={14} className="text-ink-500 animate-spin" />
                    </div>
                  </div>
                )}

                {hasError && (
                  <p className="text-[12px] text-ink-400 text-center py-2">
                    Limit reached — come back in an hour.
                  </p>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t border-border shrink-0">
                <div className="flex items-center gap-2 bg-sand-200 rounded-xl px-3 py-2">
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={hasError ? "Limit reached" : "Ask anything..."}
                    disabled={isLoading || hasError}
                    className="flex-1 bg-transparent text-[13px] text-ink-900 placeholder:text-ink-300 outline-none disabled:opacity-50"
                  />
                  <button
                    onClick={submit}
                    disabled={!inputValue.trim() || isLoading || hasError}
                    className="p-1 text-ink-500 hover:text-ink-900 disabled:opacity-30 transition-colors shrink-0"
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
        className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-colors ${
          isOpen
            ? "bg-sand-200 text-ink-700 hover:bg-sand-300"
            : "bg-ink-900 text-sand-50 hover:bg-ink-700"
        }`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-label={isOpen ? "Close chat" : "Ask me anything"}
      >
        <MessageCircle size={18} strokeWidth={1.5} />
        <span className="text-sm font-medium">Ask me anything</span>
      </motion.button>
    </div>
  );
}
