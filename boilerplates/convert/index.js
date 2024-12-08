const  electron = require("electron");
const  ffmpeg = require('fluent-ffmpeg');
const { app, BrowserWindow, shell, ipcMain } = electron;
const _ = require('lodash'); // utility library to iterate object
const { promises } = require("original-fs");

let mainWindow;
let addWindow;
 
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: { 
        backgroundThrottling: false,
        nodeIntegration: false,
        contextIsolation: true
     }
  });
 
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

});
// fetching single video
// ffmpeg.ffprobe(videos[0].path , (err, Metadata)=>{
//     console.log(Metadata);
// });

ipcMain.on('videos:added', (event, videos) => {
    // const promise = new promise( ( resolve, reject ) =>{

    //     ffmpeg.ffprobe(videos[0].path , (err, Metadata)=>{
    //        resolve(Metadata);
    //     });
    // });

    // promise.then(() =>{
    
    //     console.log(Metadata);
   
    // });
 // onse single promise for every single video that exist in a array| excute in parallel batch
   const promises=  _.map(videos, video => {

        return new Promise((resolve, reject)=>{

          ffmpeg.ffprobe(video.path, (err, metadata)=>{

            //  resolve({
            //     ...video, 
            //     duration: metadata.format.duration,
            //     format: 'avi'
            // });
            
           // same with the above
            video.duration = metadata.format.duration;
            video.format = 'avi';
            resolve(video);

          });

        });
    });

    Promise.all(promises).then((results)=>{
        mainWindow.webContents.send('metadata:complete', results);
    });
});

// https://www.npmjs.com/package/fluent-ffmpeg/v/1.7.1
//https://www.npmjs.com/package/fluent-ffmpeg
ipcMain.on('conversion:start', (event, videos) => {
 
     _.each(videos, video =>{

          const outputDirectory = video.path.split(video.name)[0];
          const outputName = video.name.split('.')[0];
          const outputPath = `${outputDirectory}${outputName}.${video.format}`;
        
          ffmpeg(video.path)
              .output(outputPath)
              .on('progress',(event)=>
                mainWindow.webContents.send('conversion:progress', { video, timemark})
              )
              .on('end', () => 
                mainWindow.webContents.send('conversions:end', { video: video,outputPath: outputPath })
              )
              .run();
        
          });

      });


// single videos
// ipcMain.on('conversion:start', (event, videos) => {
 
//   const video = videos[0];
//   const outputDirectory = video.path.split(video.name)[0];
//   const outputName = video.name.split('.')[0];
//   const outputPath = `${outputDirectory}${outputName}.${video.format}`;

//   ffmpeg(video.path)
//       .output(outputPath)
//       .on('end', () => console.log('video conversion complete'))
//       .run();

// });

ipcMain.on('folder:open', (event, outputPath) => {

   shell.showItemInFolder(outputPath);
});