import { app, BrowserWindow } from "electron";
const isDev = require("electron-is-dev");
const path = require("path");
const execFile = require("child_process").execFile;

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
    width: 1920,
    height: 1080,
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
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
