"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var server_1 = require("./server");
var isDev = require("electron-is-dev");
var path = require("path");
var mainWindow;
var createWindow = function () {
    mainWindow = new electron_1.BrowserWindow({
        width: 1000,
        height: 500
    });
    mainWindow.loadURL(isDev
        ? "http://localhost:3000"
        : "file://".concat(path.join(__dirname, "../build/index.html")));
};
electron_1.app.on("ready", function () {
    console.log("app ready");
    (0, server_1.createSimulationServer)();
    createWindow();
});
electron_1.app.on("window-all-closed", function () {
    console.log("app window-all-closed");
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    console.log("app activate");
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
electron_1.app.on("quit", function () {
    console.log("app quit");
    (0, server_1.killSimulationServer)();
});
