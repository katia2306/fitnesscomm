interface Error {
  readonly code: string;
  readonly message: string;
}

export interface User {
  readonly uid: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly firstname: string;
  readonly lastname: string;
  readonly loaded?: boolean;
  readonly rememberMe?: boolean;
  readonly password?: string;
  readonly loginError?: Error;
}

export const initialState: User = {
  uid: "",
  email: "",
  emailVerified: false,
  firstname: "",
  lastname: ""
};
