import { MusicGenre } from "@/enums";

export interface CreateArtistProfileRequest {
  memberId: string;
  artistName: string;
  bio?: string;
  genres?: MusicGenre[];
  email?: string;
  socialInstagram?: string;
  socialFacebook?: string;
  socialTwitter?: string;
  socialSoundcloud?: string;
}

export const createArtistProfileRequestValidation = {
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
  artistName: {
    required: "Artist name is required"
  },
  email: {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Must be a valid email address"
    }
  }
} as const;