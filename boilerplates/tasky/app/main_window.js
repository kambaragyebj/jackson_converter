const electron = require("electron");
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
 constructor(url){
    super({
        height: 500,
        width: 300,
        frame: false,
        resizable: false,
        //show:false // the browser or hide,
        webPreferences: { backgroundThrottling: false} // make sure application runs in full speed
      });
      this.loadURL(url);
      this.on('blur', this.OnBlur.bind(this));
 }

  // function onblur //click away hide the window
 onBlur(){
    this.hide();
 }


}


module.exports = MainWindow;