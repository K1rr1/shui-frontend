import { useEffect, useState } from "react";

export function Composer({
  open, onClose, onSubmit
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (p: { username: string; text: string }) => Promise<void>;
}) {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  useEffect(()=>{ if(!open) setText(""); }, [open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !text) return;
    await onSubmit({ username, text });
  }

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`absolute left-0 right-0 bottom-0 rounded-t-2xl bg-white p-4 transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="mx-auto max-w-md">
          <div className="h-1 w-12 rounded-full bg-gray-300 mx-auto mb-3" />
          <h2 className="text-lg font-semibold mb-3">Nytt meddelande</h2>
          <form onSubmit={submit} className="flex flex-col gap-3">
            <textarea
              placeholder="Skriv något…"
              value={text}
              onChange={(e)=>setText(e.target.value)}
              className="border rounded p-3 h-36"
            />
            <input
              placeholder="Användarnamn"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="border rounded p-3"
            />
            <div className="flex gap-2">
              <button type="submit" className="flex-1 rounded bg-blue-600 text-white py-3">Publicera</button>
              <button type="button" onClick={onClose} className="px-4 rounded border">Stäng</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
