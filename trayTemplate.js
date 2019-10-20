const store = require('./store')

module.exports = {
  _initialTemplate: [],
  generate(window) {
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
