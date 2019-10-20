const jsonfile = require('jsonfile-promised')
const fs = require('fs')

module.exports = {
  saveCourseData(course, timeStudied) {
    const courseFile = this._getCoursePath(course)

    if (fs.existsSync(courseFile)) {
      this._addCourseTime(courseFile, timeStudied)
    } else {
      this._createCourseFile(courseFile).then(() => {
        this._addCourseTime(courseFile, timeStudied)
      })
    }
  },
  getCoursesData(course) {
    const courseFile = this._getCoursePath(course)
    return jsonfile.readFile(courseFile)
  },
  getCoursesName() {
    const coursesFile = fs.readdirSync(`${__dirname}/data`)
    coursesFile.shift()

    const coursesName = coursesFile.map(course => {
      let formattedCourse = course
        .split('-')
        .map(
          value => value.charAt(0).toUpperCase() + value.slice(1, value.length)
        )

      return formattedCourse.join(' ').replace(/.json/g, '')
    })

    return coursesName
  },
  _getCoursePath(course) {
    const formattedCourse = course.toLowerCase().replace(/ /g, '-')
    return (courseFile = `${__dirname}/data/${formattedCourse}.json`)
  },
  _addCourseTime(courseFile, timeStudied) {
    const content = {
      lastStudy: new Date().toString(),
      timeStudied
    }

    jsonfile
      .writeFile(courseFile, content, { spaces: 2 })
      .then(() => console.log('Tempo salvo com sucesso'))
      .catch(err => {
        console.log('Info: _addCourseTime -> err', err)
      })
  },
  async _createCourseFile(filename) {
    return jsonfile
      .writeFile(filename, {})
      .then(() => {
        console.log('Arquivo criado com sucesso')
      })
      .catch(err => {
        console.log('Info: _createCourseFile -> err', err)
      })
  }
}
