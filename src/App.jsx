import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import StudentProvider from './context/StudentContext.jsx'
import useStudentContext from './context/useStudentContext.js'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'

function ProtectedDashboard() {
  const { isLoggedIn } = useStudentContext()

  return isLoggedIn ? <DashboardPage /> : <Navigate to="/login" replace />
}

function PublicLogin() {
  const { isLoggedIn } = useStudentContext()

  return isLoggedIn ? <Navigate to="/dashboard/students" replace /> : <LoginPage />
}

function App() {
  return (
    <StudentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<PublicLogin />} />
          <Route path="/dashboard/students" element={<ProtectedDashboard />} />
          <Route path="/dashboard/range" element={<ProtectedDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StudentProvider>
  )
}

export default App
