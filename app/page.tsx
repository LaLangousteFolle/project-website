import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Hero */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white">
              Salut, je suis <span className="text-cyan-400">LaLangousteFolle</span>
            </h1>
            <p className="text-xl text-slate-300">
              CS Student • AI & ML Enthusiast • Web Developer
            </p>
            <p className="text-slate-400">
              Passionné par l'infrastructure AI, le web dev, et les projets open-source
            </p>
          </div>

          {/* CTA Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <Link href="/portfolio">
              <Card className="hover:border-cyan-400 cursor-pointer transition">
                <CardHeader>
                  <CardTitle>Portfolio</CardTitle>
                  <CardDescription>Mes projets GitHub</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/utils">
              <Card className="hover:border-cyan-400 cursor-pointer transition">
                <CardHeader>
                  <CardTitle>Utilities</CardTitle>
                  <CardDescription>Outils de dev utiles</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/chat">
              <Card className="hover:border-cyan-400 cursor-pointer transition">
                <CardHeader>
                  <CardTitle>Chatbot</CardTitle>
                  <CardDescription>AI Assistant</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-12">
            <Button asChild variant="outline">
              <a href="https://github.com/LaLangousteFolle" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
