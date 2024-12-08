const electron = require("electron");
const { Tray, app , Menu } = electron

class TimerTray extends Tray {

    constructor(iconPath, mainWindow){
        super(iconPath);
        this.mainWindow = mainWindow;
        this.setToolTip('Timer App')
        this.on('click', this.onClick.bind(this));
        his.on('right-click', this.onRightClick.bind(this));

    }
// function on click
onClick(event, bounds){
           
            // click event bounds
  const {x, y} =  bounds;

  // window height and width
    const {height, width } = this.mainWindow.getBounds();

    console.log(bounds.x, bounds.y)
    if(this.mainWindow.isVisible()){

        mainWindow.hide();
    }else{
        const yposition = process.platform === 'darwin' ? y : y-height;
        this.mainWindow.setBounds({

            // x: x- width / 2,
            // y: y,
            // height: height ,
            // width: width
            x: x - width / 2, // osx
            y: yposition,
            height,
            width
        });
        
        this.mainWindow.show();
    }

    }
   // right click
    onRightClick( ){

        const menuConfig = Menu.buildFromTemplate([{
          label: 'Quit',
          click: () => app.quit()


        }]);

        this.popUpContextMenu(menuConfig);
    }

}

module.exports = TimerTray;