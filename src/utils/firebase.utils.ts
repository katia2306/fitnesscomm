import { FirebaseError } from "firebase";

export const parseError = (error: FirebaseError) => {
  return {
    code: error.code,
    message: error.message
  };
};
