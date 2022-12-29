"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
var execFile = require("child_process").execFile;
var exec = require("child_process").exec;
var mainWindow;
var createSimulationServer = function () {
    var backend = path.join(process.cwd(), "backend", "dist", "server.exe");
    execFile(backend, function (err, stdout, stderr) {
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
    // createSimulationServer();
    createWindow();
});
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
    exec("taskkill /f /t /im server.exe", function (err, stdout, stderr) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("stdout: ".concat(stdout));
        console.log("stderr: ".concat(stderr));
    });
});
electron_1.app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
