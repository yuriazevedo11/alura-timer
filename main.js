const { app, BrowserWindow, ipcMain } = require('electron')

let aboutWindow = null

app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 700,
    height: 400
  })

  mainWindow.loadURL(`${__dirname}/app/index.html`)
})

ipcMain.on('open-about-window', () => {
  if (!aboutWindow) {
    aboutWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true
      },
      width: 300,
      height: 250,
      alwaysOnTop: true,
      frame: false
    })

    aboutWindow.on('closed', () => {
      aboutWindow = null
    })
  }

  aboutWindow.loadURL(`${__dirname}/app/about.html`)
})

ipcMain.on('close-about-window', () => {
  aboutWindow.close()
})
