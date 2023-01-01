import axios from "axios";
import config from "../react-config";

// axios default setting for cors
axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: `http://${config.server.host}:${config.server.port}`,
  headers: {
    "Content-type": "application/json",
  },
});
