import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const tools = [
  {
    name: "Cursor",
    description: "AI-powered code editor",
    category: "Editor",
    url: "https://cursor.sh",
  },
  {
    name: "LM Studio",
    description: "Run local LLMs easily",
    category: "AI",
    url: "https://lmstudio.ai",
  },
  {
    name: "Cloudflare Tunnel",
    description: "Expose local server securely",
    category: "Networking",
    url: "https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/",
  },
  {
    name: "Vercel",
    description: "Next.js hosting and deployment",
    category: "Hosting",
    url: "https://vercel.com",
  },
  {
    name: "Shadcn/ui",
    description: "Beautiful component library",
    category: "UI",
    url: "https://ui.shadcn.com",
  },
  {
    name: "Anki",
    description: "Spaced repetition flashcard system",
    category: "Learning",
    url: "https://ankiweb.net",
  },
];

export default function Utils() {
  const categories = [...new Set(tools.map((t) => t.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">Dev Utilities</h1>
            <p className="text-slate-400">Outils que j'utilise</p>
          </div>

          {categories.map((category) => (
            <div key={category} className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">{category}</h2>
              <div className="grid gap-4">
                {tools
                  .filter((t) => t.category === category)
                  .map((tool) => (
                    <Card key={tool.name}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{tool.name}</CardTitle>
                            <CardDescription>{tool.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button asChild size="sm">
                          <Link href={tool.url} target="_blank" rel="noopener noreferrer">
                            Visiter
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
