export interface UpdateMemberRequest {
  firstName: string;
  lastName: string;
  email: string;
}

export const updateMemberRequestValidation = {
  firstName: {
    required: "First name is required"
  },
  lastName: {
    required: "Last name is required"
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Must be a valid email address"
    }
  }
} as const;