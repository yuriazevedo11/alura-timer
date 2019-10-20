const { ipcMain } = require('electron')

const store = require('./store')

module.exports = {
  _initialTemplate: [],
  generateTray(window) {
    const template = [{ label: 'Cursos' }, { label: '', type: 'separator' }]

    const courses = store.getCoursesName()

    const menuItens = courses.map(course => ({
      label: course,
      type: 'radio',
      click: () => {
        window.send('course-changed', course)
      }
    }))

    this._initialTemplate = [...template, ...menuItens]

    return this._initialTemplate
  },
  generateMenu() {
    const menuTemplate = [
      {
        label: 'View',
        submenu: [
          {
            role: 'reload'
          },
          {
            role: 'toggledevtools'
          }
        ]
      },
      {
        label: 'Window',
        submenu: [
          {
            role: 'minimize'
          },
          {
            role: 'close'
          }
        ]
      },
      {
        label: 'Sobre',
        submenu: [
          {
            accelerator: 'CmdOrCtrl+I',
            label: 'Sobre o Alura Timer',
            click: () => {
              ipcMain.emit('open-about-window')
            }
          }
        ]
      }
    ]

    if (process.platform == 'darwin') {
      menuTemplate.unshift({
        label: app.getName(),
        submenu: [{ label: 'Mac...' }]
      })
    }

    return menuTemplate
  },
  addCourse(window, course) {
    this._initialTemplate.push({
      label: course,
      type: 'radio',
      checked: true,
      click: () => {
        window.send('course-changed', course)
      }
    })

    return this._initialTemplate
  }
}
