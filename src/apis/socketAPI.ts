import { io, Socket } from "socket.io-client";
import config from "../react-config";

interface ServerToClientEvents {
  response: (res: any) => any;
}
interface ClientToServerEvents {
  request: (req: any) => void;
  abort: () => void;
}

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

    socket.on("response", (res) => {
      console.log("response from server:", res);
    });
  }

  disconnect() {
    socket.disconnect();
  }

  request() {
    if (socket?.connected) {
      const req = {
        boolData: true,
        intData: 1,
        listData: [1, 2],
        dictData: { a: 1 },
      };

      console.log("request to server:", req);
      socket.emit("request", req);
    } else {
      console.log("request to server failed: not connected");
    }
  }

  abort() {
    if (socket?.connected) {
      console.log("abort to server");
      socket.emit("abort");
    } else {
      console.log("request to server failed: not connected");
    }
  }
}

export default new socketAPI();
