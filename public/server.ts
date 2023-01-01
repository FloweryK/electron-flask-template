import { execFile } from "child_process";
import config from "./electron-config";
const path = require("path");

const backend = path.join(
  __dirname,
  "backend",
  "dist",
  process.platform.startsWith("win") ? "server.exe" : "server"
);
let child;

const createSimulationServer = () => {
  child = execFile(
    backend,
    [config.server.host, config.server.port],
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      }
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.log(stderr);
      }
    }
  );
};

const killSimulationServer = () => {
  child.kill();
};

export { createSimulationServer, killSimulationServer };
