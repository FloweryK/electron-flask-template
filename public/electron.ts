import { app, BrowserWindow } from "electron";
const isDev = require("electron-is-dev");
const path = require("path");
const execFile = require("child_process").execFile;
const exec = require("child_process").exec;

let mainWindow: BrowserWindow;

const createSimulationServer = () => {
  let backend = path.join(process.cwd(), "backend", "dist", "server.exe");

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

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 500,
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
};

app.on("ready", () => {
  createSimulationServer();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }

  exec("taskkill /f /t /im server.exe", (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
