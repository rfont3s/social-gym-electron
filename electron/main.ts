import { app, BrowserWindow } from 'electron';
import * as path from 'path';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs'),
      webSecurity: true, // Restaurar segurança web
      allowRunningInsecureContent: false,
      experimentalFeatures: false,
    },
    show: false, // Não mostrar até estar pronto
  });

  const isDev = process.env.IS_DEV === 'true';

  // Mostrar janela quando estiver pronta para evitar flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');

    // DevTools podem ser abertos manualmente com F12 ou Ctrl+Shift+I
    // para evitar warnings de Autofill no console
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
