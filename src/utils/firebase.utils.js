export const parseError = error => {
  return {
    code: error.code,
    message: error.message
  };
};
