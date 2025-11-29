import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">Mon setup</h1>
            <p className="text-slate-400">Ma config de pc fixe</p>
          </div>

          {/* PC */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-cyan-200">💻 PC Principal</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-6 space-y-1">
                <li>GPU : RTX 3080</li>
                <li>CPU : Intel i5-12600KF</li>
                <li>Carte mère : Asus PRIME B660-PLUS (DDR4)</li>
                <li>RAM : 32 Go DDR4</li>
                <li>Écrans : Gigabyte M27Q + Samsung T35F</li>
              </ul>
            </CardContent>
          </Card>

          {/* Périphériques */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-cyan-200">🎧 Périphériques</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-6 space-y-1">
                <li>Micro + Casque : HyperX Cloud II</li>
                <li>Clavier : Akko MOD007B HE</li>
                <li>Souris : Logitech G502 Hero</li>
                <li>Webcam : Logitech C270 HD</li>
                <li>PC portable : Thinkpad Yoga X13</li>
                <li>Steam deck : OS CUSTOM</li>
                <li>Meta Quest 2</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section fun */}
          <Card className="bg-slate-800/50 border border-slate-700">
            <CardHeader>
              <CardTitle className="text-cyan-200">🔥 En ce moment</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  Jeux : Hunt Showdown, Overwatch, Dead by daylight ect...
                </li>
                <li>Musique : LoFi / OST</li>
                <li>Projets : Loups-Garous Web + backend IA et ce site web</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
