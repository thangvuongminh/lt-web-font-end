import { login, logout } from "@/store/authenticateSlice";
import { store } from "@/store/store";
import axios from "axios";
import { useSelector } from "react-redux";
import { replace } from "react-router-dom";

const instance = axios.create({
  baseURL: "/api",
});
instance.interceptors.request.use(
  (config) => {
    if (config.isPublic) return config;
    const access_token = store.getState()?.auth.accessToken;
    const isAuthenticate = store.getState()?.auth.isAuthenticate;
    if (access_token != null && isAuthenticate) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // store.dispatch(logout());
      // window.location.replace("/login");
    }
    const originalRequest = error.config;
    if (originalRequest.isPublic) return Promise.reject(error);
    if (error.response.status == 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      const res = await axios.post(
        "api/user/account/refreshToken",
        {},
        { withCredentials: true },
      );
      const newAccessToken = res.data.accessToken;
      store.dispatch(login(newAccessToken));
      error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return instance(originalRequest);
      try {
      } catch (err) {
        window.location.href("/login");
      }
    }
    return Promise.reject(error);
  },
);
export default instance;
