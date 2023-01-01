import http from "./http-common";

class API {
  getServerStatus() {
    return http.get("/");
  }
}

export default new API();
