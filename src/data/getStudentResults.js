export default function getStudentResults(student) {
  const subjects = student.subjects.map((marks, index) => ({
    name: ['Mathematics', 'Science', 'English'][index],
    marks,
  }))
  const total = subjects.reduce((sum, subject) => sum + subject.marks, 0)
  const percentage = Math.round((total / (subjects.length * 100)) * 100)
  const review =
    percentage >= 90
      ? 'Outstanding'
      : percentage >= 80
        ? 'Excellent'
        : percentage >= 60
          ? 'Good'
          : percentage >= 35
            ? 'Need improvement'
            : 'Fail'

  return { ...student, subjects, total, percentage, review }
}
