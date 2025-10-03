import { useEffect, useState } from "react";
import type { Message, SortOrder } from "../types";
import { getMessages, createMessage, updateMessage } from "../api/messages";
import { StickyNote } from "./StickyNote";
import { Composer } from "./Composer";
import { Topbar } from "./Topbar";

export function Board() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [params, setParams] = useState<{ username?: string; sort: SortOrder }>(
    { sort: "desc" }
  );
  const [openComposer, setOpenComposer] = useState(false);

  async function refresh(p = params) {
    const data = await getMessages(p);
    setMessages(data);
  }
  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-dvh flex flex-col">
      {/* bakgrund: lägg din kork-textur i public/cork.png */}
      <div className="fixed inset-0 -z-20 bg-[url('/cork.jpg')] bg-repeat bg-[length:300px]" />
      <div className="fixed inset-0 -z-10 bg-black/5" />

      <Topbar
        defaultSort={params.sort}
        onApply={(p) => {
          setParams(p);
          refresh(p);
        }}
      />

      {/* bredare tavla på desktop */}
      <div className="flex-1 mx-auto w-full max-w-6xl px-3 pb-24">
        {messages.length === 0 ? (
          <div className="h-[70dvh] grid place-items-center text-white/90 text-xl text-center">
            Inga meddelanden ännu.
          </div>
        ) : (
          // Masonry-liknande layout: 1 kolumn mobil → 4 på XL
          <div className="py-4 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {messages.map((m) => (
              <div key={m.id} className="mb-4 break-inside-avoid">
                <StickyNote
                  note={m}
                  onSave={async (text) => {
                    await updateMessage(m.id, text);
                    await refresh();
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setOpenComposer(true)}
        className="fixed bottom-5 right-5 rounded-full shadow-lg active:scale-95 transition px-5 py-4 text-white text-base"
        style={{ backgroundColor: "#ff5a4f" }}
        aria-label="Skriv nytt"
      >
        ✏️
      </button>

      <Composer
        open={openComposer}
        onClose={() => setOpenComposer(false)}
        onSubmit={async (payload) => {
          await createMessage(payload);
          setOpenComposer(false);
          await refresh();
        }}
      />
    </div>
  );
}