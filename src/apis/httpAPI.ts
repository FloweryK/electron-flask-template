import axios, { AxiosInstance } from "axios";
import config from "../react-config";

// axios default setting for cors
axios.defaults.withCredentials = true;

// http communication
const http: AxiosInstance = axios.create({
  baseURL: `http://${config.server.host}:${config.server.port}`,
  headers: {
    "Content-type": "application/json",
  },
});

class httpAPI {
  getServerStatus() {
    return http.get("/");
  }
}

export default new httpAPI();
