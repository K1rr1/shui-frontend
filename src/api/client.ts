// src/api/client.ts
const BASE = import.meta.env.VITE_API_BASE_URL;

if (!BASE) {
  throw new Error("[shui] VITE_API_BASE_URL saknas – lägg den i .env.local i frontend-roten och starta om dev-servern.");
}

export async function http<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}
