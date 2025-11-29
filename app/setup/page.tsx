import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SetupPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold">🎮 Mon Setup</h1>

      {/* PC */}
      <Card>
        <CardHeader>
          <CardTitle>💻 PC Principal</CardTitle>
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

      {/* Steam Deck */}
      <Card>
        <CardHeader>
          <CardTitle>🎮 Steam Deck (OS custom)</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Mon Steam Deck tourne sous EndeavourOS (Bazzite GNOME), avec deux
            sessions :
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Session GNOME classique</li>
            <li>Session “Steam Deck” → lance Steam GamepadUI via Gamescope</li>
          </ul>
        </CardContent>
      </Card>

      {/* Périphériques */}
      <Card>
        <CardHeader>
          <CardTitle>🎧 Périphériques</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-6 space-y-1">
            <li>Micro + Casque : HyperX Cloud II</li>
            <li>Clavier : Akko MOD007B HE</li>
            <li>Souris : Logitech G502 Hero</li>
            <li>Webcam : Logitech C270 HD</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section fun */}
      <Card>
        <CardHeader>
          <CardTitle>🔥 En ce moment</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-6 space-y-1">
            <li>Jeux : Hunt Showdown, Overwatch, Dead by daylight ect...</li>
            <li>Musique : LoFi / OST</li>
            <li>Projets : Loups-Garous Web + backend IA et ce site web</li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
