export type Currency = 
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'CAD'
  | 'AUD'
  | 'JPY'
  | 'CNY'
  | 'OTHER';

export interface CreateTicketRequest {
  eventId: string;
  creatorId: string;
  price: number; // Using number for BigDecimal in TypeScript
  name: string;
  quantity: number;
  currency: Currency;
}

export const createTicketRequestValidation = {
  eventId: {
    required: "Event ID is required",
    validate: (value: string) => {
      if (!value) return "Event ID is required";
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) return "Event ID must be a valid UUID";
      return true;
    }
  },
  creatorId: {
    required: "Creator ID is required",
    validate: (value: string) => {
      if (!value) return "Creator ID is required";
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) return "Creator ID must be a valid UUID";
      return true;
    }
  },
  price: {
    required: "Price is required",
    min: {
      value: 0,
      message: "Price cannot be negative"
    },
    validate: (value: number) => {
      if (!value && value !== 0) return "Price is required";
      if (value < 0) return "Price cannot be negative";
      return true;
    }
  },
  name: {
    required: "Ticket name is required"
  },
  quantity: {
    required: "Quantity is required",
    min: {
      value: 0,
      message: "Quantity cannot be negative"
    },
    validate: (value: number) => {
      if (!value && value !== 0) return "Quantity is required";
      if (value < 0) return "Quantity cannot be negative";
      return true;
    }
  },
  currency: {
    required: "Currency is required"
  }
} as const;