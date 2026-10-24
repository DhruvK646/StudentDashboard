import { useMemo } from 'react'
import useStudentContext from '../context/useStudentContext.js'
import matchesPerformanceRange from '../data/matchesPerformanceRange.js'

const PAGE_SIZE = 5

function StudentTable({ rangeMode = false, searchTerm = '' }) {
  const {
    students,
    activeRange,
    currentPage,
    setCurrentPage,
  } = useStudentContext()

  const visibleStudents = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase()
    return students.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(normalizedSearch)
      const matchesRange = !rangeMode || matchesPerformanceRange(student, activeRange)
      return matchesSearch && matchesRange
    })
  }, [activeRange, rangeMode, searchTerm, students])

  const pageCount = Math.ceil(visibleStudents.length / PAGE_SIZE)
  const safePage = Math.min(currentPage, Math.max(pageCount, 1))
  const pageStudents = visibleStudents.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  const firstStudent = visibleStudents.length ? (safePage - 1) * PAGE_SIZE + 1 : 0
  const lastStudent = Math.min(safePage * PAGE_SIZE, visibleStudents.length)

  return (
    <>
      <div className="table-wrap">
        <table className="student-table">
          <thead>
            <tr>
              <th>STUDENT</th>
              <th>STD</th>
              <th>SUBJECT MARKS</th>
              <th>TOTAL</th>
              <th>PR (%)</th>
              <th>REVIEW</th>
            </tr>
          </thead>
          <tbody>
            {pageStudents.map((student, index) => (
              <tr key={student.id}>
                <td>
                  <div className="student-cell">
                    <span className={`student-avatar avatar-${(index % 5) + 1}`}>
                      {student.name.split(' ').map((part) => part[0]).join('')}
                    </span>
                    <span>
                      <strong>{student.name}</strong>
                      <small>STU-{String(student.id).padStart(4, '0')}</small>
                    </span>
                  </div>
                </td>
                <td><span className="standard-chip">{student.standard}</span></td>
                <td>
                  <div className="subject-marks">
                    {student.subjects.map((subject) => (
                      <span key={subject.name} title={subject.name}>
                        <b>{subject.name.slice(0, 3).toUpperCase()}</b> {subject.marks}
                      </span>
                    ))}
                  </div>
                </td>
                <td><strong className="total-mark">{student.total}<small> / 300</small></strong></td>
                <td>
                  <div className="percentage-cell">
                    <span>{student.percentage}%</span>
                    <div className="progress-track">
                      <span style={{ width: `${student.percentage}%` }} />
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`review-badge ${student.percentage < 35 ? 'review-fail' : student.percentage < 60 ? 'review-warn' : student.percentage >= 80 ? 'review-high' : 'review-good'}`}>
                    {student.review}
                  </span>
                </td>
              </tr>
            ))}
            {pageStudents.length === 0 && (
              <tr><td colSpan="6" className="empty-state">No students match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span className="pagination-summary">
          Showing <strong>{firstStudent}–{lastStudent}</strong> of <strong>{visibleStudents.length}</strong> students
        </span>
        <div className="pagination-controls">
          <button
            className="page-button page-previous"
            onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
            disabled={safePage <= 1}
          >
            ← <span>Previous</span>
          </button>
          <span className="page-indicator">{safePage} <span>/ {Math.max(pageCount, 1)}</span></span>
          <button
            className="page-button"
            onClick={() => setCurrentPage(Math.min(pageCount, safePage + 1))}
            disabled={safePage >= pageCount}
          >
            <span>Next</span> →
          </button>
        </div>
      </div>
    </>
  )
}

export default StudentTable
