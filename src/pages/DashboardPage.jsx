import Sidebar from '../components/Sidebar.jsx'
import StudentTable from '../components/StudentTable.jsx'
import useStudentContext from '../context/useStudentContext.js'
import matchesPerformanceRange from '../data/matchesPerformanceRange.js'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const ranges = [
  { id: '80', label: '80% and above', short: '80+', color: 'range-purple' },
  { id: '60', label: '60% to below 80%', short: '60–79', color: 'range-blue' },
  { id: '35', label: '35% to below 60%', short: '35–59', color: 'range-green' },
  { id: 'below35', label: 'Below 35%', short: '<35', color: 'range-orange' },
]

function DashboardPage() {
  const { students, activeRange, setActiveRange, setCurrentPage } = useStudentContext()
  const { pathname } = useLocation()
  const isRangePage = pathname === '/dashboard/range'
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim())
    }, 300)

    return () => window.clearTimeout(timeoutId)
  }, [searchInput])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, setCurrentPage])

  const matchingStudents = students.filter((student) =>
    student.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  )

  const filteredCount = students.filter((student) =>
    matchesPerformanceRange(student, activeRange),
  ).length

  function selectRange(rangeId) {
    setActiveRange(rangeId)
    setCurrentPage(1)
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>{isRangePage ? 'Performance ranges' : 'Students'}</strong></div>
          <div className="topbar-right">
            <span className="today-label">ACADEMIC YEAR 2024–25</span>
            <div className="topbar-avatar">AD</div>
          </div>
        </header>
        <div className="dashboard-content">
          <div className="page-heading">
            <div>
              <span className="eyebrow"><span className="eyebrow-line" /> STUDENT SUCCESS, SIMPLIFIED</span>
              <h1>{isRangePage ? 'Performance ranges' : 'Students'}</h1>
              <p>{isRangePage ? 'Explore student performance by achievement range.' : 'A complete overview of your students and their progress.'}</p>
            </div>
            <div className="student-count"><span>✳</span><strong>{isRangePage ? filteredCount : matchingStudents.length}</strong> students</div>
          </div>

          {isRangePage && (
            <section className="range-section">
              <div className="section-heading">
                <div><h2>Find a performance group</h2><p>Select a range to see matching students.</p></div>
                {activeRange !== 'all' && <button className="clear-filter" onClick={() => selectRange('all')}>Clear filter <span>×</span></button>}
              </div>
              <div className="range-cards">
                {ranges.map((range) => (
                  <button
                    key={range.id}
                    className={`range-card ${activeRange === range.id ? 'range-selected' : ''}`}
                    onClick={() => selectRange(activeRange === range.id ? 'all' : range.id)}
                  >
                    <span className={`range-card-icon ${range.color}`}>{range.short}</span>
                    <span className="range-card-label">{range.label}</span>
                    <span className="range-card-arrow">↗</span>
                  </button>
                ))}             
              </div>
            </section>
          )}

          <section className="students-section">
            <div className="section-heading table-heading">
              <div>
                <h2>{isRangePage && activeRange !== 'all' ? `${ranges.find((range) => range.id === activeRange)?.label} students` : 'All students'}</h2>
                <p>{isRangePage ? 'Student results for the selected range.' : 'Review marks, overall percentage, and class standing.'}</p>
              </div>
              <div className="table-heading-actions">
                {!isRangePage && (
                  <label className="student-search">
                    <span aria-hidden="true">⌕</span>
                    <input
                      type="search"
                      aria-label="Search students by name"
                      placeholder="Search students..."
                      value={searchInput}
                      onChange={(event) => setSearchInput(event.target.value)}
                    />
                    {searchInput && (
                      <button type="button" aria-label="Clear student search" onClick={() => setSearchInput('')}>×</button>
                    )}
                  </label>
                )}
                <span className="records-label"><span className="status-dot" /> {isRangePage ? filteredCount : matchingStudents.length} RECORDS</span>
              </div>
            </div>
            <div className="table-card"><StudentTable rangeMode={isRangePage} searchTerm={isRangePage ? '' : debouncedSearch} /></div>
          </section>
        </div>
        <footer className="dashboard-footer"><span>© 2025 Scholarly</span><span>Supporting every student's next step.</span></footer>
      </main>
    </div>
  )
}

export default DashboardPage
