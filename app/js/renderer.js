const { ipcRenderer } = require('electron')

const aboutLink = document.querySelector('#about-link')

aboutLink.addEventListener('click', () => {
  ipcRenderer.send('open-about-window')
})
