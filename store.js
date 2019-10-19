const jsonfile = require('jsonfile-promised')
const fs = require('fs')

module.exports = {
  saveCourseData(course, timeStudied) {
    const formatCourse = course.toLowerCase().replace(/ /g, '-')
    const courseFile = `${__dirname}/data/${formatCourse}.json`

    if (fs.existsSync(courseFile)) {
      this._addCourseTime(courseFile, timeStudied)
    } else {
      this.createCourseFile(courseFile).then(() => {
        this._addCourseTime(courseFile, timeStudied)
      })
    }
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
  async createCourseFile(filename) {
    return jsonfile
      .writeFile(filename, {})
      .then(() => {
        console.log('Arquivo criado com sucesso')
      })
      .catch(err => {
        console.log('Info: createCourseFile -> err', err)
      })
  }
}
