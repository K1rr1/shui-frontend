export type SortOrder = "asc" | "desc";// "asc" = ascending, "desc" = descending
export interface Message {
  id: string;
  username: string;
  text: string;
  createdAt: string;
}