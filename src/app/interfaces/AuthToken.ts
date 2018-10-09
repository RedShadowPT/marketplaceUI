export interface AuthToken {
  id: number;
  email: string;
  displayName?: string;
  isAdmin?: boolean;
  isEnabled?: boolean;
  token: string;
}
