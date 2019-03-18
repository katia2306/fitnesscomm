export interface User {
  readonly uid: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly rememberMe?: boolean;
  readonly password?: string;
}

export const initialState: User = {
  uid: "",
  email: "",
  emailVerified: false
};
