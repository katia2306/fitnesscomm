import axios from "axios";

export const setAPIUrl = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
};

export const setAuthorizationHeader = (token?: string) => {
  if (token) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};
