import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shark3D } from "@/components/Shark3D";
import { NowPlayingCard } from "@/components/NowPlayingCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 to-slate-800">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-center">
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-5xl font-bold text-white">
                <span className="text-cyan-400">Hewoo :3</span>
              </h1>
              <p className="text-xl text-slate-300">
                CS Sutent • Gamer • Certified BoyKisser
              </p>
              <p className="text-slate-400">
                Passionné par le hardware, les systèmes embarqués, et les
                projets open-source
              </p>
              <NowPlayingCard />
            </div>

            <div className="flex justify-center md:justify-end">
              <Shark3D />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-12">
          <Link href="/portfolio">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-400 cursor-pointer transition">
              <CardHeader>
                <CardTitle className="text-cyan-400">Portfolio</CardTitle>
                <CardDescription>Mes petits projets GitHub</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/utils">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-400 cursor-pointer transition">
              <CardHeader>
                <CardTitle className="text-cyan-400">Utilities</CardTitle>
                <CardDescription>Outils de dev</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/chat">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-400 cursor-pointer transition">
              <CardHeader>
                <CardTitle className="text-cyan-400">Chatbot</CardTitle>
                <CardDescription>[COMING SOON]</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/setup">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-400 cursor-pointer transition">
              <CardHeader>
                <CardTitle className="text-cyan-400">Setup</CardTitle>
                <CardDescription>La config de mon daily driver</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <Button
            variant="outline"
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-600/80 hover:text-cyan-400 hover:border-cyan-400"
          >
            <a
              className="text-cyan-400"
              href="https://github.com/LaLangousteFolle"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
          <Button
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-600/80 hover:text-cyan-400 hover:border-cyan-400"
            asChild
            variant="outline"
          >
            <a
              className="text-cyan-400"
              href="https://steamcommunity.com/id/lehomard/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Steam
            </a>
          </Button>
          <Button
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-600/80 hover:text-cyan-400 hover:border-cyan-400"
            asChild
            variant="outline"
          >
            <a
              className="text-cyan-400"
              href="https://www.twitch.tv/lalangoustefolle"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitch
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
