import { app, BrowserWindow } from "electron";
import { createSimulationServer, killSimulationServer } from "./server";
import config from "./electron-config";
const isDev = require("electron-is-dev");
const path = require("path");

let mainWindow: BrowserWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 500,
  });

  mainWindow.loadURL(
    isDev
      ? `http://${config.app.host}:${config.app.port}`
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
};

app.on("ready", () => {
  console.log("app ready");
  createSimulationServer();
  createWindow();
});

app.on("window-all-closed", () => {
  console.log("app window-all-closed");
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  console.log("app activate");
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("quit", () => {
  console.log("app quit");
  killSimulationServer();
});
