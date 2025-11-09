export interface ClubResponse {
  id: string;
  name: string;
  address: string;
  capacity: number;
  isDeleted: boolean;
  ownerIds: string[];
}