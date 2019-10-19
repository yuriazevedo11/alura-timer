const { ipcRenderer } = require('electron')

const timer = require('./timer')
const store = require('../../store')

const aboutLink = document.querySelector('#about-link')
const playButton = document.querySelector('.btn-play')
const time = document.querySelector('.time')
const course = document.querySelector('.course')

window.onload = async () => {
  try {
    const courseTime = await store.getCoursesData(course.textContent)
    time.textContent = courseTime.timeStudied || '00:00:00'
  } catch (err) {
    console.log('Info: window.onload -> err', err)
  }
}

aboutLink.addEventListener('click', () => {
  ipcRenderer.send('open-about-window')
})

let images = ['images/play-button.svg', 'images/stop-button.svg']
let timerOn = false
playButton.addEventListener('click', () => {
  images = images.reverse()
  if (timerOn) {
    timer.stop(course.textContent)
    timerOn = false
  } else {
    timer.start(time)
    timerOn = true
  }
  playButton.src = images[0]
})
