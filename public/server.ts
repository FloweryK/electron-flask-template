import { exec, execFile } from "child_process";
const path = require("path");

const isWindows = process.platform.startsWith("win");

const createSimulationServer = () => {
  const backend = path.join(
    process.cwd(),
    "backend",
    "dist",
    isWindows ? "server.exe" : "server"
  );

  execFile(backend, (err, stdout, stderr) => {
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
  exec("taskkill /f /t /im server.exe", (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
};

export { createSimulationServer, killSimulationServer };
