import { useEffect, useRef, useState } from 'react'
import MinimalNav from './components/MinimalNav.jsx'
import { Link, usePath, redirectLegacy } from './router.jsx'
import HeroLandscape, { LandscapeFragment } from './components/HeroLandscape.jsx'
import SectionHeading from './components/SectionHeading.jsx'
import ResearchItem from './components/ResearchItem.jsx'
import Reveal from './components/Reveal.jsx'
import {
  person,
  hero,
  aboutSection,
  educationList,
  research,
  projects,
  teachingList,
  awards,
  photography,
  nav,
} from './content.js'

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-text">
          <p className="label hero-eyebrow">
            {hero.eyebrow} · {person.field}
          </p>
          <h1 className="hero-name">{person.name}</h1>
          <p className="hero-affiliation">
            {person.school}
            <br />
            {person.affiliation}
          </p>
          <p className="hero-statement">{hero.statement}</p>
          <p className="hero-links">
            <Link className="link" to="/research">
              Research
            </Link>
            <a className="link" href={person.cvUrl} target="_blank" rel="noreferrer">
              Curriculum vitae
            </a>
            <a className="link" href={`mailto:${person.email}`}>
              Email
            </a>
          </p>
          </div>
      </div>
      <HeroLandscape />
    </section>
  )
}

function Research() {
  return (
    <section id="research" className="section section--research">
      <SectionHeading
        label="Research"
        lead="How AI rewrites the operating logic of platforms, firms, and markets."
      />
      <div className="research-list">
        {research.map((item) => (
          <ResearchItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section section--research">
      <SectionHeading
        label="Applied Projects"
        lead="Operations problems from industry partners, through the Boeing Center for Supply Chain Innovation."
      />
      <div className="research-list">
        {projects.map((item) => (
          <ResearchItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

function Teaching() {
  return (
    <section id="teaching" className="section section--teaching">
      <SectionHeading label="Teaching" lead="Teaching assistant, WashU and USTC." />
      <Reveal>
        <ul className="course-list">
          {teachingList.map((c) => (
            <li key={c.id} className="course">
              <span className="course-when">{c.semester}</span>
              <span className="course-name">{c.course}</span>
              <span className="course-where">{c.location}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section section--about">
      <SectionHeading label="About" />
      <div className="about-body">
        <Reveal className="about-text">
          {aboutSection.intro.map((p, i) => (
            <p key={i} className="prose">
              {p}
            </p>
          ))}
        </Reveal>
        <Reveal className="about-aside">
          <img className="portrait" src={person.avatar} alt={`Portrait of ${person.name}`} width="220" height="220" loading="lazy" />
          <p className="label">Education</p>
          <ul className="edu-list">
            {educationList.map((e) => (
              <li key={e.id}>
                <span className="edu-degree">{e.degree}</span>
                <span className="edu-school">
                  {e.institution}, {e.date}
                </span>
                {e.advisor && <span className="edu-advisor">Advisor: {e.advisor}</span>}
              </li>
            ))}
          </ul>
          {awards.length > 0 && (
            <>
              <p className="label">Awards</p>
              <ul className="award-list">
                {awards.map((a) => (
                  <li key={a.id}>
                    <span className="award-title">{a.title}</span>
                    <span className="award-detail">
                      {a.organization} {a.date} · {a.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Reveal>
      </div>
    </section>
  )
}

function Miscellaneous() {
  const dialogRef = useRef(null)
  const [open, setOpen] = useState(null)
  const show = (photo) => {
    setOpen(photo)
    dialogRef.current?.showModal()
  }
  return (
    <section id="misc" className="section section--misc">
      <SectionHeading label="Miscellaneous" lead="Away from the models." />
      <div className="misc-body">
        <Reveal>
          <p className="label">Photography</p>
          <div className="photo-grid">
            {photography.map((p) => (
              <figure key={p.id} className="photo" style={{ '--ar': p.width / p.height }}>
                <button type="button" className="photo-open" onClick={() => show(p)} aria-label={`View larger: ${p.alt}`}>
                  <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" decoding="async" />
                </button>
                {p.caption && <figcaption className="photo-caption">{p.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </Reveal>
        <dialog ref={dialogRef} className="lightbox" onClick={() => dialogRef.current.close()} onClose={() => setOpen(null)}>
          {open && <img src={open.src} alt={open.alt} width={open.width} height={open.height} />}
        </dialog>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section section--contact">
      <SectionHeading label="Contact" />
      <LandscapeFragment />
      <Reveal className="contact-body">
        <a className="contact-email" href={`mailto:${person.email}`}>
          {person.email}
        </a>
        <p className="contact-address">
          {person.office}, {person.school}
          <br />
          {person.affiliation}
        </p>
        <p className="contact-links">
          <a className="link" href={person.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="link" href={person.cvUrl} target="_blank" rel="noreferrer">
            Curriculum vitae
          </a>
        </p>
      </Reveal>
    </section>
  )
}

function NotFound() {
  return (
    <section className="section section--notfound">
      <SectionHeading label="Not found" lead="This page doesn’t exist." />
      <Reveal>
        <Link className="link" to="/">
          Back to the home page
        </Link>
      </Reveal>
    </section>
  )
}

// path -> page. Each nav entry in content.js is its own page; "/" is the hero.
const PAGES = {
  '/': Hero,
  '/research': Research,
  '/projects': Projects,
  '/teaching': Teaching,
  '/about': About,
  '/misc': Miscellaneous,
  '/contact': Contact,
}

const BASE_TITLE = document.title

// Retired pages: Writing (papers now live on Research only).
redirectLegacy(Object.keys(PAGES), { '/writing': '/research' })

// Footer: copyright, and a quiet link on to the next page in reading order.
function Footer({ path }) {
  const order = ['/', ...nav.map((n) => n.href)]
  const next = nav.find((n) => n.href === order[order.indexOf(path) + 1])
  return (
    <footer className="footer">
      <span>
        © {new Date().getFullYear()} {person.name}
      </span>
      {next && (
        <Link className="link link--quiet footer-next" to={next.href}>
          {next.title} →
        </Link>
      )}
    </footer>
  )
}

export default function App() {
  const path = usePath()
  const Page = PAGES[path] ?? NotFound
  const entry = nav.find((n) => n.href === path)
  const mainRef = useRef(null)
  const firstRender = useRef(true)

  useEffect(() => {
    document.title = entry ? `${entry.title} — ${person.name}` : path === '/' ? BASE_TITLE : `Not found — ${person.name}`
    // after an in-site page switch, move keyboard/screen-reader focus to the new page
    if (firstRender.current) firstRender.current = false
    else mainRef.current?.focus({ preventScroll: true })
  }, [path, entry])

  return (
    <>
      <MinimalNav path={path} />
      <main ref={mainRef} tabIndex={-1} className={path === '/' ? 'page page--home' : 'page'}>
        <Page key={path} />
      </main>
      <Footer path={path} />
    </>
  )
}
