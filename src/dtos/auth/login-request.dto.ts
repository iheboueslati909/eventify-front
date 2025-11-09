export interface LoginRequest {
  email: string;
  password: string;
}

export const loginRequestValidation = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Email must be valid"
    }
  },
  password: {
    required: "Password is required"
  }
} as const;