const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  globalShortcut
} = require('electron')

const store = require('./store')
const template = require('./template')

let mainWindow
let tray

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    icon: '/icons/icon.png',
    webPreferences: {
      nodeIntegration: true
    },
    width: 700,
    height: 450,
    resizable: false
  })

  tray = new Tray(`${__dirname}/app/img/app-icon-tray.png`)
  tray.setToolTip('Alura Timer')

  const trayTemplate = template.generateTray(mainWindow)

  const trayMenu = Menu.buildFromTemplate(trayTemplate)
  tray.setContextMenu(trayMenu)

  const menuTemplate = template.generateMenu()

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

  globalShortcut.register('CmdOrCtrl+Shift+J', () => {
    mainWindow.send('toggle-button-shortcut')
  })

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
      frame: false,
      resizable: false
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
  const template = template.addCourse(mainWindow, course)

  const contextMenu = Menu.buildFromTemplate(template)
  tray.setContextMenu(contextMenu)
})
