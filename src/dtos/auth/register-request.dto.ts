export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const registerRequestValidation = {
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
      message: "Email must be valid"
    }
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 3,
      message: "Password must be at least 3 characters"
    }
  }
} as const;