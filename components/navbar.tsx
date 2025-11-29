import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-cyan-400">
          LaLangousteFolle
        </Link>

        <div className="flex gap-4">
          <Button asChild variant="ghost">
            <Link href="/portfolio">Portfolio</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/utils">Utils</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/chat">Chat</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
