import axios from "axios";
import { getAPIUrl } from "../utils/api.utils";

const userAPI = {
  getUser: () =>
    axios.get(getAPIUrl("users/current_user")).then(res => res.data.user)
};

export default userAPI;
