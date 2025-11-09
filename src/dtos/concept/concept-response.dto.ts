import { MusicGenre } from "@/enums";

export interface ConceptResponse {
  id: string;
  memberId: string;
  title: string;
  description?: string;
  isDeleted: boolean;
  createdAt: string; // ISO string format for OffsetDateTime
  genres: MusicGenre[];
}