const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    icon: path.join(app.getAppPath(), 'logo.ico'),
    webPreferences: {
      preload: path.join(app.getAppPath(), 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');

  // Exits the app when the main window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

ipcMain.on('save-image', (event, buffer, video_id) => {
  const folderPath = path.join(app.getPath('documents'), '5003-electron Capture', String(video_id));
  const fileName = `${video_id}_${Date.now()}.jpg`;
  const filePath = path.join(folderPath, fileName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error('Error saving image:', err);
    } else {
      console.log('Image saved successfully:', filePath);
    }
  });
});


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
