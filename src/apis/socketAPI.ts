import { io, Socket } from "socket.io-client";
import config from "../react-config";

// socket communication
interface ServerToClientEvents {}
interface ClientToServerEvents {}

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

class socketAPI {
  isConnected() {
    return socket?.connected || false;
  }

  connect() {
    socket = io(`http://${config.server.host}:${config.server.port}`);

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("connect_error", () => {
      console.log("connect error");
    });
  }

  disconnect() {
    socket.disconnect();
  }
}

export default new socketAPI();
