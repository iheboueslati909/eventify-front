export interface CreateTicketPurchaseRequest {
  ticketId: string;
  userId: string;
  quantity: number;
  paymentMethod: string;
}

export const createTicketPurchaseRequestValidation = {
  ticketId: {
    required: "Ticket ID is required",
    validate: (value: string) => {
      if (!value) return "Ticket ID is required";
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) return "Ticket ID must be a valid UUID";
      return true;
    }
  },
  userId: {
    required: "User ID is required",
    validate: (value: string) => {
      if (!value) return "User ID is required";
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) return "User ID must be a valid UUID";
      return true;
    }
  },
  quantity: {
    required: "Quantity is required",
    min: {
      value: 1,
      message: "Quantity must be at least 1"
    },
    validate: (value: number) => {
      if (!value && value !== 0) return "Quantity is required";
      if (value < 1) return "Quantity must be at least 1";
      return true;
    }
  },
  paymentMethod: {
    required: "Payment method is required"
  }
} as const;