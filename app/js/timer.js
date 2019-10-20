const { ipcRenderer } = require('electron')
const moment = require('moment')

let seconds = 0
let timer
module.exports = {
  start(el) {
    let currentTime = moment.duration(el.textContent)
    seconds = currentTime.asSeconds()
    clearInterval(timer)
    timer = setInterval(() => {
      seconds++
      el.textContent = this._secondsToTime(seconds)
    }, 1000)
  },
  stop(course) {
    clearInterval(timer)
    ipcRenderer.send('course-stopped', course, this._secondsToTime(seconds))
  },
  _secondsToTime(seconds) {
    return moment()
      .startOf('day')
      .seconds(seconds)
      .format('HH:mm:ss')
  }
}
