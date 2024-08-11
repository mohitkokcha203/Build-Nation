import axios from "axios";
import { KEY_ACCESS_TOKEN, getKey, setKey, removeKey } from "./localStorage";

export const axiosClient = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

// // // axios interceptor to intercept request and response====================

axiosClient.interceptors.request.use((request) => {
  const accessToken = getKey(KEY_ACCESS_TOKEN);

  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

axiosClient.interceptors.response.use(async (response) => {
  const data = response.data;

  if (data.status === "Ok") {
    return response;
  }
  const originalRequest = response.config;

  if (data.statusCode === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const response = await axios
      .create({
        withCredentials: true,
      })
      .get(`http://localhost:4000/user/refresh`);

    if (response.data.status === "Ok") {
      setKey(KEY_ACCESS_TOKEN, response.data.result.accessToken);
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${response.data.result.accessToken}`;

      return axios(originalRequest);
    } else {
      removeKey(KEY_ACCESS_TOKEN);
      window.location.replace("/login", "_self");

      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
});
