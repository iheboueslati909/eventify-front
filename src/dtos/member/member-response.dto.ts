export interface MemberResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isDeleted: boolean;
  createdAt: string;
  userId: string;
  artistProfileIds: string[];
  ticketIds: string[];
  ticketPurchaseIds: string[];
}