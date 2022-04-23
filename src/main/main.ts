/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, Menu } from 'electron';
import Store from 'electron-store';
import { resolveHtmlPath } from './util';

// Hide the menu bar
Menu.setApplicationMenu(null);

const dataPath =
  process.env.NODE_ENV === 'development'
    ? __dirname
    : path.join(process.resourcesPath, '/src/main');

let env = null;

try {
  env = new Store({
    cwd: dataPath,
    name: 'env',
    fileExtension: 'json',
  });
} catch (error) {
  alert(error);
}

if (!env) {
  alert('Bad env configuration!');
}

console.log(__dirname);

const weatherURI =
  `https://api.openweathermap.org/data/2.5/onecall?` +
  `lat=${env.get('LAT')}` +
  `&lon=${env.get('LON')}` +
  `&units=${env.get('MEASUREMENT_SYSTEM')}` +
  `&appid=${env.get('OW_API_KEY')}`;

const currentInternalConditionsURI = `${env.get('CURRENT_INTERNAL_CONDITIONS_URI')}`;
const historicInternalConditionsURI = `${env.get('HISTORIC_INTERNAL_CONDITIONS_URI')}`;
const measurementSystem = `${env.get('MEASUREMENT_SYSTEM')}`;

let mainWindow: BrowserWindow | null = null;

ipcMain.on('get-measurement-system', async (event, arg) => {
  const msgTemplate = (info: string) => `${info}`;
  console.log(msgTemplate(arg));
  event.reply(
    'get-measurement-system',
    msgTemplate(measurementSystem)
  );
});

ipcMain.on('get-current-internal-conditions-uri', async (event, arg) => {
  const msgTemplate = (info: string) => `${info}`;
  console.log(msgTemplate(arg));
  event.reply(
    'get-current-internal-conditions-uri',
    msgTemplate(currentInternalConditionsURI)
  );
});

ipcMain.on('get-historic-internal-conditions-uri', async (event, arg) => {
  const msgTemplate = (info: string) => `${info}`;
  console.log(msgTemplate(arg));
  console.log(__dirname);
  event.reply(
    'get-historic-internal-conditions-uri',
    msgTemplate(historicInternalConditionsURI)
  );
});

ipcMain.on('get-weather-uri', async (event, arg) => {
  const msgTemplate = (info: string) => `${info}`;
  console.log(msgTemplate(arg));
  event.reply('get-weather-uri', msgTemplate(weatherURI));
});

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    show: false,
    // width: 1080,
    // height: 1200,
    frame: false, // Hide window frame
    resizable: false,
    fullscreen: true,
    skipTaskbar: true, // Render over taskbar
    kiosk: true, // Do not render title or menu
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  if (process.env.NODE_ENV === 'development')
    mainWindow.webContents.openDevTools();

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.maximize();
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Prevent following links, just in case.
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    // shell.openExternal(url);
  });
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Add listener for esc key press to close the application.
app.on('keydown', (e: { keyCode: number }) => {
  if (e.keyCode === 27) {
    app.exit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
