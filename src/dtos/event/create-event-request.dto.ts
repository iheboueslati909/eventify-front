import { EventType } from "@/enums";

export interface CreateEventRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  type: EventType;
  conceptId: string;
  timeTables: TimeTableCreationRequest[];
}

export interface TimeTableCreationRequest {
  stageName: string;
  slots: TimeTableSlotRequest[];
}

export interface TimeTableSlotRequest {
  startTime: string;
  endTime: string;
  title: string;
  artistIds: string[];
}

export const createEventRequestValidation = {
  title: {
    required: "Title is required"
  },
  description: {
    required: "Description is required"
  },
  startDate: {
    required: "Start date is required",
    validate: (value: string) => {
      if (!value) return "Start date is required";
      if (isNaN(Date.parse(value))) return "Start date must be a valid date";
      return true;
    }
  },
  endDate: {
    required: "End date is required",
    validate: (value: string, values: any) => {
      if (!value) return "End date is required";
      if (isNaN(Date.parse(value))) return "End date must be a valid date";
      if (values.startDate && new Date(value) <= new Date(values.startDate)) {
        return "End date must be after start date";
      }
      return true;
    }
  },
  location: {
    required: "Location is required"
  },
  type: {
    required: "Type is required"
  },
  conceptId: {
    required: "Concept ID is required",
    validate: (value: string) => {
      if (!value) return "Concept ID is required";
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) return "Concept ID must be a valid UUID";
      return true;
    }
  },
  timeTables: {
    required: "At least one timetable is required",
    validate: (value: TimeTableCreationRequest[]) => {
      if (!value || value.length === 0) return "At least one timetable is required";
      
      // Validate each timetable
      for (const [tableIndex, table] of value.entries()) {
        if (!table.stageName?.trim()) {
          return `Timetable ${tableIndex + 1}: Stage name is required`;
        }
        
        if (!table.slots || table.slots.length === 0) {
          return `Timetable ${tableIndex + 1}: At least one time slot is required`;
        }
        
        // Validate each slot
        for (const [slotIndex, slot] of table.slots.entries()) {
          if (!slot.startTime) {
            return `Timetable ${tableIndex + 1}, Slot ${slotIndex + 1}: Start time is required`;
          }
          if (!slot.endTime) {
            return `Timetable ${tableIndex + 1}, Slot ${slotIndex + 1}: End time is required`;
          }
          if (slot.startTime && slot.endTime && new Date(slot.endTime) <= new Date(slot.startTime)) {
            return `Timetable ${tableIndex + 1}, Slot ${slotIndex + 1}: End time must be after start time`;
          }
          if (!slot.title?.trim()) {
            return `Timetable ${tableIndex + 1}, Slot ${slotIndex + 1}: Title is required`;
          }
          if (!slot.artistIds || slot.artistIds.length === 0) {
            return `Timetable ${tableIndex + 1}, Slot ${slotIndex + 1}: At least one artist is required`;
          }
          
          // Validate artist IDs
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          const invalidArtistIds = slot.artistIds.filter(id => !uuidRegex.test(id));
          if (invalidArtistIds.length > 0) {
            return `Timetable ${tableIndex + 1}, Slot ${slotIndex + 1}: All artist IDs must be valid UUIDs`;
          }
        }
      }
      return true;
    }
  }
} as const;