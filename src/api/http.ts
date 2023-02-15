import axios, { AxiosInstance } from "axios";

// axios default setting for cors
axios.defaults.withCredentials = true;

// http communication
const http: AxiosInstance = axios.create({
  baseURL: `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`,
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
