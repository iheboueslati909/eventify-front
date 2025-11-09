import { EventStatus, EventType } from "@/enums";

export interface EventResponse {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  startDate: string; // ISO string for OffsetDateTime
  endDate: string; // ISO string for OffsetDateTime
  location: string;
  type: EventType;
  status: EventStatus;
  conceptId: string;
  isDeleted: boolean;
  createdAt: string; // ISO string for OffsetDateTime
  clubId?: string;
  timeTableIds: string[];
  ticketIds: string[];
}