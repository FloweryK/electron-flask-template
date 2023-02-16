import { execFile, exec } from "child_process";
const isDev = require("electron-is-dev");
const path = require("path");

const projectdir = path.join(isDev ? __dirname : process.resourcesPath, "..");
const isWindows = process.platform.startsWith("win");
let child;

const createSimulationServer = () => {
  const serverPath = path.join(
    projectdir,
    "src_flask",
    "dist",
    isWindows ? "server.exe" : "server"
  );

  const envPath = path.join(projectdir, ".env")

  child = execFile(
    serverPath,
    [envPath],
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
