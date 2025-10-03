import { useState } from "react";
import type { SortOrder } from "../types";

export function Topbar({
  defaultSort,
  onApply,
}: {
  defaultSort: SortOrder;
  onApply: (p: { username?: string; sort: SortOrder }) => void;
}) {
  const [username, setUsername] = useState("");
  const [sort, setSort] = useState<SortOrder>(defaultSort);

  return (
    <div className="sticky top-0 z-40 bg-[#2b3854] text-white/95">
      <div className="mx-auto max-w-md px-3 py-2 flex items-center gap-2">
        <input
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          placeholder="Filtrera på användare "
          className="flex-1 rounded px-3 py-2 text-black"
        />
        <select
          value={sort}
          onChange={(e)=>setSort(e.target.value as SortOrder)}
          className="rounded px-2 py-2 text-black"
        >
          <option value="desc">Nyast</option>
          <option value="asc">Äldst</option>
        </select>
        <button
          onClick={()=>onApply({ username: username || undefined, sort })}
          className="rounded px-3 py-2 bg-white/10 border border-white/20"
        >
          Kör
        </button>
      </div>
    </div>
  );
}
