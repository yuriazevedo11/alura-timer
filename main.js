const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron')

const store = require('./store')
const trayTemplate = require('./trayTemplate')

let mainWindow
let tray

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 700,
    height: 450
  })

  tray = new Tray(`${__dirname}/app/images/app-icon-tray.png`)
  tray.setToolTip('Alura Timer')

  const template = trayTemplate.generate(mainWindow)

  const contextMenu = Menu.buildFromTemplate(template)
  tray.setContextMenu(contextMenu)

  mainWindow.loadURL(`${__dirname}/app/index.html`)
})

/**
 * "About" window events
 */

let aboutWindow = null

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

/**
 * Course events
 */

ipcMain.on('course-stopped', (event, course, timeStudied) => {
  store.saveCourseData(course, timeStudied)
})

ipcMain.on('course-added', (event, course) => {
  store.saveCourseData(course, '00:00:00')
  const template = trayTemplate.addCourse(mainWindow, course)

  const contextMenu = Menu.buildFromTemplate(template)
  tray.setContextMenu(contextMenu)
})
