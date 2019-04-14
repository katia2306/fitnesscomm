import { Error } from "../../utils/types.utils";

export interface User {
  readonly uid: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly firstname: string;
  readonly lastname: string;
  readonly displayName: string;
  readonly shortName: string;
  readonly loaded?: boolean;
  readonly rememberMe?: boolean;
  readonly password?: string;
  readonly repeatPassword?: string;
  readonly loginError?: Error;
  readonly signupError?: Error;
}

export const initialState: User = {
  uid: "",
  email: "",
  emailVerified: false,
  firstname: "",
  lastname: "",
  displayName: "",
  shortName: ""
};
