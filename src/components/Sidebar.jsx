import useStudentContext from '../context/useStudentContext.js'
import { NavLink, useNavigate } from 'react-router-dom'

function Sidebar() {
  const { logout, setActiveRange, setCurrentPage } = useStudentContext()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  function resetStudentView() {
    setActiveRange('all')
    setCurrentPage(1)
  }

  return (
    <aside className="sidebar">
      <NavLink className="brand" to="/dashboard/students" onClick={resetStudentView}>
        <span className="brand-mark">S</span>
        <span>scholarly<span className="brand-dot">.</span></span>
      </NavLink>

      <div className="sidebar-label">WORKSPACE</div>
      <nav className="sidebar-nav" aria-label="Main navigation">
        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/dashboard/students" onClick={resetStudentView}>
          <span className="nav-icon">▦</span>
          Students
          <span className="nav-count">60</span>
        </NavLink>
        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/dashboard/range" onClick={resetStudentView}>
          <span className="nav-icon">◷</span>
          Range
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-profile">
          <div className="profile-avatar">AD</div>
          <div>
            <strong>Administrator</strong>
            <span>School admin</span>
          </div>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <span className="nav-icon">↪</span>
          Log out
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
