"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var args = require('electron-args');
var log = require('electron-log');
var logger = require('electron-timber');
var remote = require('electron').remote;
// tslint:disable-next-line:prefer-const
var win;
var cli = args("\n    app\n    Usage\n    $ app --arg\n    $ app --arg=value\n    Options\n    --debug     modo debug [Default: false]\n    --ssl       protocolo de seguran\u00E7a [Default: false]\n    --endpoint  ip ou hostname do totem\n    ", {
    default: {
        debug: false,
        ssl: false
    }
});
log.transports.file.level = 'info';
log.transports.file.file = __dirname + '.log';
log.info(electron_1.netLog);
console.log('MODO DEBUG ATIVADO?', cli.flags.debug);
console.log('IP/HOSTNAME DO TOTEM:', cli.flags.endpoint);
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
function createWindow() {
    win = new electron_1.BrowserWindow({
        // width: 1366, height: 768,
        /*
          fullscreen: true,
          frame: false
        */
        // fullscreen: true
        resizable: false,
        kiosk: true
    });
    // Previne o display de entrar em modo sleep
    electron_1.powerSaveBlocker.start('prevent-display-sleep');
    // Previne zoom na tela
    electron_1.app.commandLine.appendSwitch('disable-pinch');
    win.setAutoHideMenuBar(true);
    // carrega a aplicação baseada no local onde esta o app minificado
    win.loadURL(url.format({
        pathname: path.join(__dirname, "./compiled/index.html"),
        protocol: 'file:',
        slashes: true,
    }));
    /* para painel em SO Windows
      shell.openItem('C:Users/Desenvolvimento/Desktop/mouseclick.bat');
      shell.openItem('C:Users/Desenvolvimento/Desktop/sound.vbs');
    */
    // abre o DEVTOOLS do Chrome
    if (cli.flags.debug) {
        win.webContents.openDevTools();
    }
    // fecha o electron
    win.on('closed', function () {
        win = null;
        electron_1.app.quit();
    });
    electron_1.ipcMain.on('com', function (e, p) { return comunication(e, p); });
}
function comunication(e, p) {
    console.log('PARAMS', p);
    switch (p.evt) {
        case 'login':
            win.setClosable(false);
            break;
        case 'logout':
            win.setClosable(true);
            break;
        case 'startup':
            e.returnValue = { endpoint: cli.flags.endpoint, ssl: Boolean(cli.flags.ssl), debug: cli.flags.debug };
            break;
        case 'notify':
            console.log(p.data);
            break;
        case 'tocar':
            electron_1.shell.openItem('C:/Program Files/aris/sga/display/ding.vbs');
            break;
    }
}
//# sourceMappingURL=main.js.map