import { Link } from 'react-router-dom'

const highlights = [
  { icon: '✳', value: '60', label: 'Students tracked', className: 'highlight-violet' },
  { icon: '↗', value: '3', label: 'Subjects monitored', className: 'highlight-blue' },
  { icon: '◎', value: 'Real-time', label: 'Academic insights', className: 'highlight-green' },
]

function HomePage() {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <Link className="brand landing-brand" to="/">
          <span className="brand-mark">S</span>
          <span>scholarly<span className="brand-dot">.</span></span>
        </Link>
        <span className="landing-header-note"><span className="status-dot" /> STUDENT SUCCESS, SIMPLIFIED</span>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-line" /> YOUR SCHOOL, IN FOCUS</span>
          <h1>Every student.<br />Every <em>possibility.</em></h1>
          <p className="hero-description">
            A clearer picture of student progress. Bring performance, achievement, and the next steps together in one thoughtful dashboard.
          </p>
          <Link className="primary-button hero-cta" to="/login">
            Explore the dashboard <span>↗</span>
          </Link>
          <div className="hero-footnote"><span>✦</span> Built for educators who make a difference</div>
        </div>
        <div className="hero-art" aria-label="Illustration of student progress">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-sun">✳</div>
          <div className="art-card art-card-main">
            <div className="art-card-top"><span>CLASS OVERVIEW</span><span className="art-dots">•••</span></div>
            <div className="art-score">84<span>%</span></div>
            <div className="art-score-label">Average performance</div>
            <div className="art-chart">
              <span style={{ height: '34%' }} /><span style={{ height: '54%' }} />
              <span style={{ height: '43%' }} /><span style={{ height: '72%' }} />
              <span style={{ height: '60%' }} /><span style={{ height: '88%' }} />
              <span style={{ height: '76%' }} />
            </div>
            <div className="art-chart-labels"><span>MON</span><span>WED</span><span>FRI</span></div>
          </div>
          <div className="art-card art-card-float">
            <span className="float-icon">↗</span>
            <span className="float-value">+12.8%</span>
            <span className="float-label">this semester</span>
          </div>
          <div className="art-avatar art-avatar-one">M</div>
          <div className="art-avatar art-avatar-two">J</div>
          <div className="art-caption">A little progress, every day.</div>
        </div>
      </section>

      <section className="highlights" aria-label="Dashboard highlights">
        {highlights.map((item) => (
          <article className="highlight-card" key={item.label}>
            <span className={`highlight-icon ${item.className}`}>{item.icon}</span>
            <span className="highlight-value">{item.value}</span>
            <span className="highlight-label">{item.label}</span>
          </article>
        ))}
      </section>

      <footer className="landing-footer">
        <span>© 2025 Scholarly. Made for better learning.</span>
        <Link className="footer-login" to="/login">
          Login to your dashboard <span>→</span>
        </Link>
      </footer>
    </main>
  )
}

export default HomePage
