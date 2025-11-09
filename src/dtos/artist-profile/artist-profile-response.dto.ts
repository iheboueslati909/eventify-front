import { MusicGenre } from "@/enums";

export interface ArtistProfileResponse {
  id: string;
  memberId: string;
  artistName: string;
  bio?: string;
  isDeleted: boolean;
  genres: MusicGenre[];
  email?: string;
  socialInstagram?: string;
  socialFacebook?: string;
  socialTwitter?: string;
  socialSoundcloud?: string;
}