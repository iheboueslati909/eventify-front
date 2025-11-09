export interface RefreshTokenRequest {
  refreshToken: string;
}

export const refreshTokenRequestValidation = {
  refreshToken: {
    required: "Refresh token is required"
  }
} as const;