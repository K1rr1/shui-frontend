import { useMemo, useState } from "react";
import type { Message } from "../types";

// deterministiskt "seed" från id (för färg/rotation)
function seedNum(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

// enkel lighten för hex-färger (t.ex. till vik-kanten)
function lighten(hex: string, amt = 10) {
  const n = hex.replace("#", "");
  const num = parseInt(n, 16);
  const r = Math.min(255, (num >> 16) + Math.round((255 * amt) / 100));
  const g = Math.min(255, ((num >> 8) & 0xff) + Math.round((255 * amt) / 100));
  const b = Math.min(255, (num & 0xff) + Math.round((255 * amt) / 100));
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
}

export function StickyNote({
  note,
  onSave,
}: {
  note: Message;
  onSave: (text: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(note.text);

  // klassiska post-it-färger
  const palette = ["#FFF689", "#FFD1DC", "#BFFFE0", "#BFD9FF"];

  const seeded = useMemo(() => seedNum(note.id), [note.id]);
  const color = palette[seeded % palette.length];
  const angle = (seeded % 7) - 3; // liten rotation −3..+3°
  const foldSize = 22;            // px
  const foldColor = lighten(color, 12);

  return (
    <div
      className="
        relative p-3 transition
        hover:shadow-2xl hover:-translate-y-0.5
        select-text
      "
      style={{
        // fyrkantiga hörn: ingen rounded-klass
        transform: `rotate(${angle}deg)`,
        background: color,
        // djup + tunn kant inuti för papperskänsla
        boxShadow:
          "0 8px 18px rgba(0,0,0,0.25), 0 2px 5px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.08)",
      }}
    >
      {/* röd nål (toppcenter) */}
      <span
        aria-hidden
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
        style={{ background: "#d74b42", boxShadow: "0 1px 0 rgba(0,0,0,.6)" }}
      />

      {/* uppvikt hörn – själva viket */}
      <span
        aria-hidden
        className="absolute bottom-0 right-0"
        style={{
          width: foldSize,
          height: foldSize,
          background: `linear-gradient(135deg, ${foldColor} 0%, ${foldColor} 80%, rgba(0,0,0,0.15) 100%)`,
          clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
        }}
      />
      {/* skugga under viket */}
      <span
        aria-hidden
        className="absolute"
        style={{
          bottom: 0,
          right: foldSize - 2,
          width: foldSize * 1.2,
          height: foldSize * 0.9,
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.18), rgba(0,0,0,0) 70%)",
          filter: "blur(3px)",
          transform: "translate(4px, 2px)",
          clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="text-xs text-black/60 mb-1">
        {note.username} • {new Date(note.createdAt).toLocaleString()}
      </div>

      {editing ? (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-28 bg-transparent outline-none resize-none"
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={async () => {
                const t = text.trim();
                if (!t) return;
                await onSave(t);
                setEditing(false);
              }}
              className="px-3 py-1 bg-emerald-600 text-white"
            >
              Spara
            </button>
            <button
              onClick={() => {
                setText(note.text);
                setEditing(false);
              }}
              className="px-3 py-1 border"
            >
              Avbryt
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="whitespace-pre-wrap leading-snug">{note.text}</p>
          <button
            onClick={() => setEditing(true)}
            className="mt-2 px-3 py-1 border text-sm"
          >
            Ändra
          </button>
        </>
      )}
    </div>
  );
}
