import { useContext } from 'react'
import StudentContext from './studentContextStore.js'

export default function useStudentContext() {
  const context = useContext(StudentContext)
  if (!context) {
    throw new Error('useStudentContext must be used inside StudentProvider')
  }
  return context
}
