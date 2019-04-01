import axios from "axios";

export const getAPIUrl = (endpoint: string) => {
  return `${process.env.REACT_APP_API_URL}/${endpoint}`;
};

export const setAuthorizationHeader = (token?: string) => {
  if (token) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};
