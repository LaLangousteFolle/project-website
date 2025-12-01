"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Salut! Je suis ton IA locale via LM Studio. Envoie-moi un message pour commencer.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const content = input.trim();
    if (!content || loading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const payloadMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      const data = await res.json();

      if (data.error) {
        const errorMsg: Message = {
          id: Date.now() + 1,
          role: "assistant",
          content: "Erreur lors de la requête vers LM Studio.",
        };
        setMessages((prev) => [...prev, errorMsg]);
      } else {
        const botMessage: Message = {
          id: Date.now() + 1,
          role: "assistant",
          content: data.content,
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (e) {
      const errorMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Erreur réseau, impossible de joindre le serveur LM Studio.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card className="h-[600px] flex flex-col bg-slate-900/70 border-slate-800">
      <CardHeader>
        <CardTitle className="text-cyan-400">Local Chat • LM Studio</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1">
        {/* Zone scrollable dans la card */}
        <ScrollArea className="flex-1 pr-3 mb-4">
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    msg.role === "user"
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-100"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Input + bouton en bas de la card */}
        <div className="flex gap-2">
          <Input
            placeholder="Écris ton message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <Button onClick={sendMessage} disabled={loading}>
            {loading ? "..." : "Envoyer"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
