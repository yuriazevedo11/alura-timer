const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron')
const store = require('./store')

let tray

app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 700,
    height: 400
  })

  tray = new Tray(`${__dirname}/app/images/icon-tray.png`)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Cursos' },
    { label: '', type: 'separator' },
    { label: 'React Native', type: 'radio', checked: true },
    { label: 'Flutter', type: 'radio' }
  ])

  tray.setToolTip('Alura Timer')
  tray.setContextMenu(contextMenu)

  mainWindow.loadURL(`${__dirname}/app/index.html`)
})

// About window events
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

// Course events
ipcMain.on('course-stopped', (event, course, timeStudied) => {
  store.saveCourseData(course, timeStudied)
})
