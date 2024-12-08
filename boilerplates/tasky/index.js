const path = require('path');
const electron = require("electron");
const { app, ipcMain} = electron;
const TimerTray = require('./app/timer_tray');
const MainWindow = require('./app/main_window');

 
let mainWindow;

let tray;

app.on("ready", () => {
  // app.dock.hide(); // hide icon from the menu bar
  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

  const iconName = process.platform == 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`); // use template string 

  tray = new TimerTray(iconPath , mainWindow);

});
ipcMain.on('update-timer',(event, timeLeft) =>{

   tray.setTitle(timeLeft);

});
















 
// function createAddWindow() {
//   addWindow = new BrowserWindow({
//     width: 300,
//     height: 200,
//     title: "Add New Todo",
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: `${__dirname}/preload.js`,
//     },
//   });
 
//   addWindow.loadURL(`file://${__dirname}/add.html`);
//   addWindow.on("closed", () => (addWindow = null));
// }
 
// ipcMain.on("todo:add", (event, todo) => {
//   mainWindow.webContents.send("todo:add", todo);
//   addWindow.close();
// });
 
// const menuTemplate = [
//   {
//     label: "File",
//     submenu: [
//       {
//         label: "New Todo",
//         click() {
//           createAddWindow();
//         },
//       },
//       {
//         label: "Clear Todos",
//         click() {
//           mainWindow.webContents.send("todo:clear");
//         },
//       },
//       {
//         label: "Quit",
//         accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
//         click() {
//           app.quit();
//         },
//       },
//     ],
//   },
// ];
 
// if (process.platform === "darwin") {
//   menuTemplate.unshift({ label: "" });
// }
 
// if (process.env.NODE_ENV !== "production") {
//   menuTemplate.push({
//     label: "View",
//     submenu: [
//       { role: "reload" },
//       {
//         label: "Tog1.6.2gle Developer Tools",
//         accelerator:
//           process.platform === "darwin" ? "Command+Alt+I" : "Ctrl+Shift+I",
//         click(item, focusedWindow) {
//           focusedWindow.toggleDevTools();
//         },
//       },
//     ],
//   });
// }