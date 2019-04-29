import axios from "axios";

const userAPI = {
  getUser: () => axios.get("users-api/current_user").then(res => res.data.user),
  signupUser: user => axios.post("users-api/signup", user).then(res => res.data)
};

export default userAPI;
