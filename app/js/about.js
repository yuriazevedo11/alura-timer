const { ipcRenderer, shell } = require('electron')
const process = require('process')

const aboutClose = document.querySelector('#about-close')
const creatorLink = document.querySelector('#creator-link')
const electronVersion = document.querySelector('#electron-version')

window.onload = () => {
  electronVersion.textContent = process.versions.electron
}

aboutClose.addEventListener('click', () => {
  ipcRenderer.send('close-about-window')
})

creatorLink.addEventListener('click', () => {
  shell.openExternal('https://www.linkedin.com/in/yuri-azevedo/')
})
