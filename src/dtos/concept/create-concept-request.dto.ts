import { MusicGenre } from "@/enums";

export interface CreateConceptRequest {
  memberId: string;
  title: string;
  description?: string;
  genres?: MusicGenre[];
}

export const createConceptRequestValidation = {
  memberId: {
    required: "Member ID is required",
    validate: (value: string) => {
      if (!value) return "Member ID is required";
      // Basic UUID validation
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) return "Member ID must be a valid UUID";
      return true;
    }
  },
  title: {
    required: "Title is required"
  }
} as const;