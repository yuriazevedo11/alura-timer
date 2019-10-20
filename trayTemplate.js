const store = require('./store')

module.exports = {
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

    return [...template, ...menuItens]
  }
}
