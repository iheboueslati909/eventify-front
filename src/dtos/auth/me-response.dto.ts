export interface MeResponse {
  id: string;
  email: string;
  roles: string[];
}

export const meResponseValidation = {
  id: { required: 'Id is required' },
  email: { required: 'Email is required' },
  roles: { required: 'Roles is required' },
} as const;
