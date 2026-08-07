import { useEffect, useRef, useState } from 'react'
import HeroCanvas from './HeroCanvas.jsx'
import ProjectArt from './ProjectArt.jsx'
import { person, hero, aboutSection, educationList, projects, strengths } from './content.js'

function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark',
  )
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('kl-theme', theme)
    } catch {}
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

function Reveal({ children, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  )
}

function Nav({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="shell nav-inner">
        <a href="#top" className="nav-brand">
          Kaiwen&nbsp;Luo<span className="nav-brand-dot">.</span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#strengths">Strengths</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to day mode' : 'Switch to night mode'}
            title={theme === 'dark' ? 'Day mode' : 'Night mode'}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2.1 2.1M16.9 16.9L19 19M19 5l-2.1 2.1M7.1 16.9L5 19" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M20 13.5A8.2 8.2 0 0 1 10.5 4 8.2 8.2 0 1 0 20 13.5Z" />
              </svg>
            )}
          </button>
          <a className="btn btn-small" href={`mailto:${person.email}`}>
            Get in touch
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  const [videoOk, setVideoOk] = useState(true)
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <HeroCanvas />
        {videoOk && (
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoOk(false)}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        )}
        <div className="hero-veil" />
      </div>
      <div className="shell hero-inner">
        <p className="eyebrow hero-eyebrow">{hero.eyebrow}</p>
        <h1 className="hero-title">
          {hero.headline.map((line, i) => (
            <span key={i} className="hero-line" style={{ '--d': `${0.12 + i * 0.12}s` }}>
              {line}
            </span>
          ))}
        </h1>
        <p className="hero-sub">{hero.sub}</p>
        <div className="hero-cta">
          <a className="btn btn-primary" href={`mailto:${person.email}`}>
            Get in touch
          </a>
          <a className="btn btn-ghost" href="#projects">
            Selected work ↓
          </a>
        </div>
        <div className="hero-foot">
          <span>{person.affiliation}</span>
          <span className="hero-foot-sep" />
          <span>Olin Business School</span>
        </div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to About">
        <span />
      </a>
    </section>
  )
}

function SectionHead({ index, title, note }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">
        {index} — {title}
      </p>
      {note && <p className="section-note">{note}</p>}
    </Reveal>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHead index="01" title="About" />
        <div className="about-grid">
          <Reveal className="about-card">
            <div className="avatar-frame">
              <img src={person.avatar} alt={`Portrait of ${person.name}`} />
            </div>
            <div className="about-card-body">
              <h3 className="about-name">{person.name}</h3>
              <p className="about-role">
                {person.title} · {person.department}
              </p>
              <ul className="contact-list">
                <li>
                  <span className="contact-label">Email</span>
                  <a href={`mailto:${person.email}`}>{person.email}</a>
                </li>
                <li>
                  <span className="contact-label">Office</span>
                  <span>{person.office}, Olin Business School</span>
                </li>
                <li>
                  <span className="contact-label">LinkedIn</span>
                  <a href={person.linkedin} target="_blank" rel="noreferrer">
                    in/kaiwen-luo
                  </a>
                </li>
                <li>
                  <span className="contact-label">CV</span>
                  <a href={person.cvUrl} target="_blank" rel="noreferrer">
                    Download PDF
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
          <div className="about-main">
            <Reveal>
              <h2 className="section-title">
                The world we inherited was designed for humans.
                <em> AI changes the design brief.</em>
              </h2>
              {aboutSection.intro.map((p, i) => (
                <p key={i} className="body-text">
                  {p}
                </p>
              ))}
            </Reveal>
            <Reveal className="edu-block">
              <p className="eyebrow eyebrow-tight">Education</p>
              <ol className="edu-list">
                {educationList.map((e) => (
                  <li key={e.id} className="edu-item">
                    <span className="edu-date">{e.date}</span>
                    <span className="edu-degree">
                      {e.degree}
                      {e.advisor ? <span className="edu-advisor"> · Advisor: {e.advisor}</span> : null}
                    </span>
                    <span className="edu-school">
                      {e.institution}, {e.location}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section section-alt">
      <div className="shell">
        <SectionHead
          index="02"
          title="Selected Work"
          note="One working paper and two award-winning industry engagements."
        />
        <div className="project-stack">
          {projects.map((p, i) => (
            <Reveal key={p.id} className={`project-card ${i % 2 ? 'project-card--flip' : ''}`} as="article">
              <div className="project-art">
                <ProjectArt kind={p.art} />
              </div>
              <div className="project-body">
                <p className="eyebrow eyebrow-tight">
                  {p.index} · {p.kind}
                </p>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-meta">
                  {p.org} · {p.date}
                </p>
                <p className="body-text">{p.description}</p>
                {p.highlight && <p className="project-highlight">{p.highlight}</p>}
                <ul className="tag-row">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                {p.link && (
                  <a className="project-link" href={p.link.href} target="_blank" rel="noreferrer">
                    {p.link.label} ↗
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Strengths() {
  return (
    <section id="strengths" className="section">
      <div className="shell">
        <SectionHead index="03" title="What I Bring" />
        <div className="strength-grid">
          {strengths.map((s, i) => (
            <Reveal key={s.id} className="strength-card">
              <span className="strength-index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="strength-label">{s.label}</h3>
              <p className="body-text">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="shell contact-inner">
        <Reveal>
          <p className="eyebrow">04 — Contact</p>
          <h2 className="contact-title">
            Let’s talk about platforms,
            <br />
            agents, and operations.
          </h2>
          <a className="contact-email" href={`mailto:${person.email}`}>
            {person.email}
          </a>
          <div className="contact-links">
            <a href={person.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href={person.cvUrl} target="_blank" rel="noreferrer">
              Curriculum Vitae ↗
            </a>
            <span>{person.office} · St. Louis, MO</span>
          </div>
        </Reveal>
      </div>
      <footer className="footer">
        <div className="shell footer-inner">
          <span>
            © {new Date().getFullYear()} {person.name}
          </span>
          <span>Washington University in St. Louis</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </section>
  )
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Strengths />
      </main>
      <Contact />
    </>
  )
}
