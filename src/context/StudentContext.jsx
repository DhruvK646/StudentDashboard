import { useMemo, useState } from 'react'
import studentsData from '../data/students.json'
import getStudentResults from '../data/getStudentResults.js'
import StudentContext from './studentContextStore.js'

function StudentProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeRange, setActiveRange] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const students = useMemo(()=>
     studentsData.map(getStudentResults)
  , [])

  const login = () => {
    setIsLoggedIn(true)
    setActiveRange('all')
    setCurrentPage(1)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setActiveRange('all')
    setCurrentPage(1)
  }

  return (
    <StudentContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        students,
        activeRange,
        setActiveRange,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </StudentContext.Provider>
  )
}

export default StudentProvider
