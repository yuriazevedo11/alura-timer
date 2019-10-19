const { app, BrowserWindow, ipcMain } = require('electron')

app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 600,
    height: 400
  })

  mainWindow.loadURL(`${__dirname}/app/index.html`)
})

ipcMain.on('open-about-window', () => {
  let aboutWindow = new BrowserWindow({
    width: 300,
    height: 200
  })

  aboutWindow.loadURL(`${__dirname}/app/about.html`)
})
