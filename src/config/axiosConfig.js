import { store } from "@/store/store";
import axios from "axios";
import { useSelector } from "react-redux";

const instance = axios.create({
  baseURL: "/api",
});
instance.interceptors.request.use(
  (config) => {
    const access_token = store.getState()?.auth.accessToken;
    if (access_token != null) {
      config.headers["Authorization"] = `Bearer ${access_token}1`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
instance.interceptors.response.use((response) => {
  console.log(response);
  return response;
});
export default instance;
