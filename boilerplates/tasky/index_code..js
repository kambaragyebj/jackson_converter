const path = require('path');
const electron = require("electron");
const { app, BrowserWindow, Tray } = electron
 
let mainWindow;
let addWindow;
 
app.on("ready", () => {

 let tray;
  mainWindow = new BrowserWindow({
   
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    //show:false // the browser or hide
  });
 
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  const iconName = process.platform == 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`); // use template string 

  tray = new Tray(iconPath);
  tray.on('click',(event, bounds)=>{
    // click event bounds
  const {x, y} =  bounds;

  // window height and width
    const {height, width } = mainWindow.getBounds();

    console.log(bounds.x, bounds.y)
    if(mainWindow.isVisible()){

        mainWindow.hide();
    }else{
        const yposition = process.platform === 'darwin' ? y : y-height;
        mainWindow.setBounds({

            // x: x- width / 2,
            // y: y,
            // height: height ,
            // width: width
            x: x - width / 2, // osx
            y: yposition,
            height,
            width
        });
        
        mainWindow.show();
    }
   
  })

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