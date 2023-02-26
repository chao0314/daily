const {app, BrowserWindow} = require('electron');
const path = require('path');
const IS_MAC = process.platform === 'darwin';

const mainWinOptions = {
    with: 1280,
    height: 800,
    webPreferences: {
        preload: path.join(__dirname, '../../preload/index.js'),
        spellcheck:false
    }

}


function createWindow(options, filePath) {

    const win = new BrowserWindow(options);
    win.loadFile(filePath);
    return win;

}


function createMainWindow() {

    return createWindow(mainWinOptions, path.resolve(__dirname, "../../web/index.html"));

}

app.on('ready', (e) => {


    const mainWindow = createMainWindow();
    // mainWindow.webContents.openDevTools()

})

app.on('window-all-closed', () => {

    if (!IS_MAC) app.quit();
})

app.on('activate', () => {

    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();

})





