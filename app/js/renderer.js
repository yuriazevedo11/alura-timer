const { ipcRenderer } = require('electron')

const timer = require('./timer')
const store = require('../../store')

const aboutLink = document.querySelector('#about-link')
const playButton = document.querySelector('.btn-play')
const time = document.querySelector('.time')
const course = document.querySelector('.course')
const formAddCourse = document.querySelector('.group')

window.onload = async () => {
  try {
    const [firstCourse] = await store.getCoursesName()

    if (firstCourse) {
      const courseTime = await store.getCourseData(firstCourse)

      time.textContent = courseTime.timeStudied
      course.textContent = firstCourse
    }
  } catch (err) {
    console.log('Info: window.onload -> err', err)
  }
}

aboutLink.addEventListener('click', () => {
  ipcRenderer.send('open-about-window')
})

let images = ['img/icon-play.svg', 'img/icon-stop.svg']
let timerOn = false
playButton.addEventListener('click', () => {
  images = images.reverse()
  if (timerOn) {
    timer.stop(course.textContent)
    timerOn = false
    new Notification('Alura Timer', {
      body: `O curso ${course.textContent} foi parado`,
      icon: 'img/icon-notification-stop.png'
    })
  } else {
    timer.start(time)
    timerOn = true
    new Notification('Alura Timer', {
      body: `O curso ${course.textContent} foi iniciado`,
      icon: 'img/icon-notification-play.png'
    })
  }
  playButton.src = images[0]
})

ipcRenderer.on('course-changed', async (event, courseName) => {
  try {
    timer.stop(courseName)
    const courseTime = await store.getCourseData(courseName)
    time.textContent = courseTime.timeStudied || '00:00:00'
    course.textContent = courseName
  } catch (err) {
    console.log('Info: err', err)
  }
})

formAddCourse.addEventListener('submit', e => {
  e.preventDefault()
  const newCourse = e.target[0].value
  course.textContent = newCourse
  time.textContent = '00:00:00'
  e.target[0].value = ''

  ipcRenderer.send('course-added', newCourse)
})

ipcRenderer.on('toggle-button-shortcut', () => {
  const click = new MouseEvent('click')
  playButton.dispatchEvent(click)
})
