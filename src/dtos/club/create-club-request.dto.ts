export interface CreateClubRequest {
  name: string;
  address: string;
  capacity: number;
  ownerMemberIds: string[];
}

export const createClubRequestValidation = {
  name: {
    required: "Name is required"
  },
  address: {
    required: "Address is required"
  },
  capacity: {
    required: "Capacity is required",
    min: {
      value: 1,
      message: "Capacity must be positive"
    },
    validate: (value: number) => {
      if (!value && value !== 0) return "Capacity is required";
      if (value <= 0) return "Capacity must be positive";
      return true;
    }
  },
  ownerMemberIds: {
    required: "At least one owner is required",
    validate: (value: string[]) => {
      if (!value || value.length === 0) return "At least one owner is required";
      // Validate UUIDs
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const invalidUuids = value.filter(id => !uuidRegex.test(id));
      if (invalidUuids.length > 0) return "All owner IDs must be valid UUIDs";
      return true;
    }
  }
} as const;