import axios from "axios";
import store from "../store";
import { redirect } from "./helpers";

const SERVER_ROUTE = process.env.VUE_APP_API_ROUTE;

const refreshToken = async () => {
  try {
    const response = await axios({
      method: "post",
      url: SERVER_ROUTE + "/refreshLogin",
      data: {
        userId: store.state.user.userId,
        refresh: store.state.user.refreshToken
      },
      headers: {
        "Content-Type": "application/json"
      }
    });

    store.commit("setUser", response.data.data);
    return true;
  } catch (e) {
    await redirect("/login");
    return false;
  }
};

export { refreshToken };
