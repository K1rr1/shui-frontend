import { http } from "./client";
import type { Message, SortOrder } from "../types";

export const getMessages = (p?: { username?: string; sort?: SortOrder }) => {
  const s = p ? new URLSearchParams(Object.entries(p).filter(([,v])=>v!=null && v!=="")) : null;
  return http<Message[]>(`/messages${s && s.toString() ? `?${s}` : ""}`);
};

export const createMessage = (payload: { username: string; text: string }) =>
  http<Message>("/messages", { method: "POST", body: JSON.stringify(payload) });

export const updateMessage = (id: string, text: string) =>
  http<{ id: string; text: string }>(`/messages/${id}`, { method: "PATCH", body: JSON.stringify({ text }) });
