export interface LoggedUser {
  uid: string;
  email: string;
  emailVerified: boolean;
}

export interface GuestUser {
  email: string;
  password?: string;
}

export type User = LoggedUser | GuestUser | {};

export const initialState: User = {};
