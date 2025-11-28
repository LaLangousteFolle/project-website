function MyButton() {
  return <button>Je suis un bouton</button>;
}
function TBA() {
  return (
    <div>
      <h1>Coming SOON</h1>
    </div>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Bienvenue dans mon appli</h1>
      <MyButton />
      <TBA />
    </div>
  );
}
