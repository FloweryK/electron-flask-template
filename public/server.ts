import { execFile } from "child_process";
const path = require("path");

const isWindows = process.platform.startsWith("win");
const backend = path.join(
  __dirname,
  "backend",
  "dist",
  isWindows ? "server.exe" : "server"
);
let child;

const createSimulationServer = () => {
  console.log("creating simulation server");

  child = execFile(backend, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
    }
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.log(stderr);
    }
  });
};

const killSimulationServer = () => {
  console.log("killing simulation server");
  console.log("child pid: ", child.pid);

  child.kill();
};

export { createSimulationServer, killSimulationServer };
