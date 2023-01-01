import { execFile, exec } from "child_process";
import config from "./electron-config";
const path = require("path");

const isWindows = process.platform.startsWith("win");
let child;

const createSimulationServer = () => {
  const backend = path.join(
    __dirname,
    "backend",
    "dist",
    isWindows ? "server.exe" : "server"
  );

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
  if (isWindows) {
    exec("taskkill /f /t /im server.exe", (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  } else {
    child.kill();
  }
};

export { createSimulationServer, killSimulationServer };
