import axios from "axios";
import { User } from "../store/user.reducer";

const userAPI = {
  getUser: () => axios.get("users-api/current_user").then(res => res.data.user),
  signupUser: (user: Partial<User>) =>
    axios.post("users-api/signup", user).then(res => res.data)
};

export default userAPI;
