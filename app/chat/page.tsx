"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Salut! Je suis ton assistant AI. (Integration LM Studio coming soon)",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };

    // Add bot response (placeholder)
    const botMsg: Message = {
      id: messages.length + 2,
      text: "LM Studio integration coming soon...",
      sender: "bot",
    };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>AI Chatbot</CardTitle>
              <CardDescription>Powered by LM Studio (Local)</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 mb-4 pr-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.sender === "user"
                            ? "bg-cyan-600 text-white"
                            : "bg-slate-700 text-slate-100"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex gap-2">
                <Input
                  placeholder="Écris ton message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend}>Envoyer</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
