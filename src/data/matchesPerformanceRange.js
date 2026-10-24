export default function matchesPerformanceRange(student, range) {
  switch (range) {
    case '80':
      return student.percentage >= 80
    case '60':
      return student.percentage >= 60 && student.percentage < 80
    case '35':
      return student.percentage >= 35 && student.percentage < 60
    case 'below35':
      return student.percentage < 35
    case 'all':
      return true
    default:
      return false
  }
}
