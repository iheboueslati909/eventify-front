export interface UpdateClubRequest {
  name: string;
  address: string;
  capacity: number;
  ownerMemberIds?: string[];
}

export const updateClubRequestValidation = {
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
    validate: (value: string[] | undefined) => {
      if (value && value.length > 0) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const invalidUuids = value.filter(id => !uuidRegex.test(id));
        if (invalidUuids.length > 0) return "All owner IDs must be valid UUIDs";
      }
      return true;
    }
  }
} as const;