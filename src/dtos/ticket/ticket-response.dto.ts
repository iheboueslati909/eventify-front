import { Currency } from './create-ticket-request.dto';

export interface TicketResponse {
  id: string;
  eventId: string;
  creatorId: string;
  price: number;
  name: string;
  quantity: number;
  reservedCount: number;
  currency: Currency;
  createdAt: string; // ISO string for OffsetDateTime
  ticketPurchaseIds: string[];
}