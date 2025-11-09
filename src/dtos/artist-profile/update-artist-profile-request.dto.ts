import { MusicGenre } from "@/enums";

export interface UpdateArtistProfileRequest {
  artistName: string;
  bio?: string;
  genres?: MusicGenre[];
  email?: string;
  socialInstagram?: string;
  socialFacebook?: string;
  socialTwitter?: string;
  socialSoundcloud?: string;
}

export const updateArtistProfileRequestValidation = {
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