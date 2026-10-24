import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useStudentContext from '../context/useStudentContext.js'

function LoginPage() {
  const { login } = useStudentContext()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!username.trim() || !password) {
      setError('Enter both your username and password to continue.')
      return
    }

    if (password.length < 6) {
      return setError('password length must be 6 digits')
    }

    if (username === "dhruv" && password === "123456") {
      navigate('/dashboard/students', { replace: true })
    }
    else {
      return setError('user name and password are not match')
    }
    login()
    setError('')
  }

  return (
    <main className="login-page">
      <div className="login-decoration login-decoration-one" />
      <div className="login-decoration login-decoration-two" />
      <header className="login-header">
        <Link className="brand" to="/">
          <span className="brand-mark">S</span>
          <span>scholarly<span className="brand-dot">.</span></span>
        </Link>
        <Link className="back-home" to="/">← Back to home</Link>
      </header>
      <section className="login-card">
        <div className="login-icon">✳</div>
        <span className="eyebrow login-eyebrow">WELCOME BACK</span>
        <h1>Good to see you.</h1>
        <p className="login-subtitle">Sign in to continue to your student dashboard.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && <p className="login-error" role="alert">{error}</p>}
          <button className="primary-button login-submit" type="submit">Sign in <span>→</span></button>
        </form>
        <p className="login-help">Demo dashboard · Use any username and password</p>
      </section>
      <footer className="login-footer">© 2025 Scholarly. Made for better learning.</footer>
    </main>
  )
}

export default LoginPage
