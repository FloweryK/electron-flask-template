import { execFile, exec } from "child_process";
const isDev = require("electron-is-dev");
const path = require("path");

const isWindows = process.platform.startsWith("win");
let child;

const createSimulationServer = () => {
  const serverPath = path.join(
    isDev ? __dirname : process.resourcesPath,
    "..",
    "src_flask",
    "dist",
    isWindows ? "server.exe" : "server"
  );

  child = execFile(serverPath, ["localhost", "8080"], (err, stdout, stderr) => {
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
