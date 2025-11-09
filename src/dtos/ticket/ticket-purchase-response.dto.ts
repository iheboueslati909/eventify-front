export type TicketPurchaseStatus = 
  | 'PENDING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface TicketPurchaseResponse {
  id: string;
  ticketId: string;
  userId: string;
  quantity: number;
  totalPrice: number;
  status: TicketPurchaseStatus;
  createdAt: string; // ISO string for OffsetDateTime
}