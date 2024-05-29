import FieldBuilder from "./components/FieldBuilder";

export default function Home() {
  return (
    <main className="flex flex-col w-screen h-screen items-center p-24 gap-12">
      <h1 className="text-4xl font-bold text-center">React + UI Craft Demo</h1>
      <FieldBuilder />
    </main>
  );
}
