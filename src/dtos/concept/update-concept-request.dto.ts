import { MusicGenre } from "@/enums";

export interface UpdateConceptRequest {
  title: string;
  description?: string;
  genres?: MusicGenre[];
}

export const updateConceptRequestValidation = {
  title: {
    required: "Title is required"
  }
} as const;