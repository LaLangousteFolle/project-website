"use client";
export const dynamic = "error";
import { useState, useEffect, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarkdownMessage } from "@/components/MarkdownMessage";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const { status } = useSession();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: `# Titre

**gras** et *italique*

- item 1
- item 2

\`code inline\`

\`\`\`ts
console.log("hello");
\`\`\`

\\[
x^2 + 1 = 0
\\]
`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

      const botMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.error
          ? "Erreur lors de la requête vers LM Studio."
          : data.content,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
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

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        Chargement de la session...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 text-center space-y-4">
          <p className="text-lg font-semibold">
            Connecte-toi pour utiliser le chat IA.
          </p>
          <Button
            onClick={() => signIn("github")}
            className="bg-cyan-600 hover:bg-cyan-500"
          >
            Se connecter avec GitHub
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="max-h-[600px] bg-slate-900/80 border-slate-800 shadow-xl overflow-hidden flex flex-col">
            <CardHeader>
              <CardTitle className="text-cyan-400">
                Local Chat • LM Studio
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col flex-1 pt-0">
              <div className="h-[420px] mb-3 pr-2 overflow-y-auto space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed wrap-break-words ${
                        msg.role === "user"
                          ? "bg-cyan-600 text-white rounded-br-sm"
                          : "bg-slate-800 text-slate-100 rounded-bl-sm"
                      }`}
                    >
                      <MarkdownMessage content={msg.content} />
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <div className="flex gap-2 text-white">
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
        </div>
      </div>
    </div>
  );
}
