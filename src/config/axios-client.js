import axios from "axios";
import { appConfig } from "./env";

const axiosClient = axios.create({
  baseURL: appConfig.api.baseUrl,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${appConfig.api.accessToken}`,
  },
});

export { axiosClient };
