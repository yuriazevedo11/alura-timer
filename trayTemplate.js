const store = require('./store')

module.exports = {
  generate() {
    const template = [{ label: 'Cursos' }, { label: '', type: 'separator' }]

    const courses = store.getCoursesName()

    const menuItens = courses.map(course => ({ label: course, type: 'radio' }))

    return [...template, ...menuItens]
  }
}
