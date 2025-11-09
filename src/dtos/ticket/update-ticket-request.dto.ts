import { Currency } from './create-ticket-request.dto';

export interface UpdateTicketRequest {
  price: number;
  name: string;
  quantity: number;
  currency: Currency;
}

export const updateTicketRequestValidation = {
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