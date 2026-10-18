"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isTextUIPart, type UIMessage } from "ai";
import { useEffect, useMemo, useState } from "react";

/**
 * The chat's behaviour, shared by the floating widget on /services and the
 * stack's Message Box. Two audiences visit this site, and they do not open the
 * chat with the same question: the "services" variant is for a prospective
 * client rather than a recruiter.
 */
export type ChatVariant = "portfolio" | "services";

/**
 * Only a genuine rate-limit response should shut the input down. Everything else
 * — a dropped connection, an upstream hiccup — is recoverable and clears on the
 * next send. This used to be a single sticky boolean, which meant one transient
 * 502 permanently disabled the widget behind a "Limit reached" message that was
 * usually a lie.
 */
export type ChatError = null | "limit" | "transient";

/** The visible text of a message; reasoning and tool parts are never shown. */
export const messageText = (msg: UIMessage) =>
  msg.parts
    .filter(isTextUIPart)
    .map((p) => p.text)
    .join("");

export function useIceChat(variant: ChatVariant) {
  const [chatError, setChatError] = useState<ChatError>(null);

  // The variant picks the route's prompt: each surface sends only what its
  // visitors ask about (see SYSTEM_PROMPTS in app/api/chat/route.ts). useChat
  // keeps its first transport, so it is built once per variant, and `id`
  // makes a variant change start a fresh chat rather than keep the old one.
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { variant } }),
    [variant],
  );
  const { messages, sendMessage, setMessages, status } = useChat({
    id: variant,
    transport,
    onError: (error) =>
      setChatError(/rate limit/i.test(error.message) ? "limit" : "transient"),
  });

  // A reasoning model can spend its whole token budget thinking and finish
  // with no text. The bubble would then just vanish; say something instead.
  const last = messages[messages.length - 1];
  const emptyReply =
    status === "ready" &&
    last?.role === "assistant" &&
    !last.parts.filter(isTextUIPart).some((p) => p.text.trim());
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reacting to a finished stream
    if (emptyReply) setChatError("transient");
  }, [emptyReply]);

  const isLoading = status === "submitted" || status === "streaming";
  const isRateLimited = chatError === "limit";

  /** Returns false when the message was not sent. */
  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || isLoading || isRateLimited) return false;
    // A transient failure clears on retry; only a rate limit persists.
    setChatError(null);
    sendMessage({ text });
    return true;
  };

  const reset = () => {
    setMessages([]);
    setChatError(null);
  };

  return { messages, chatError, isLoading, isRateLimited, send, reset };
}
