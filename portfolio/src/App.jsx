import MinimalNav from './components/MinimalNav.jsx'
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
  papers,
  talks,
  teachingList,
  awards,
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
            <a className="link" href="#research">
              Research
            </a>
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

const statusText = {
  in_review: 'Under review',
  working: 'Working paper',
  published: 'Published',
}

function Writing() {
  return (
    <section id="writing" className="section section--writing">
      <SectionHeading label="Writing" />
      <div className="writing-body">
        <Reveal>
          <ol className="paper-list">
            {papers.map((p) => (
              <li key={p.id} className="paper">
                <p className="paper-title">
                  {p.ssrn ? (
                    <a className="link link--quiet" href={p.ssrn} target="_blank" rel="noreferrer">
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                </p>
                <p className="paper-authors">{p.authors.join(', ')}</p>
                <p className="paper-note">
                  {(p.note || statusText[p.status] || '').replace(/\.$/, '')}
                  {p.highlight ? ` · ${p.highlight}` : ''}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
        {talks.length > 0 && (
          <Reveal className="talks">
            <p className="label">Talks</p>
            <ul className="talk-list">
              {talks.map((t) => (
                <li key={t.id}>
                  <span className="talk-event">{t.event}</span>
                  <span className="talk-date">{t.date}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
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

function Footer() {
  return (
    <footer className="footer">
      <span>
        © {new Date().getFullYear()} {person.name}
      </span>
      <a className="link link--quiet" href="#top">
        Top
      </a>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <MinimalNav />
      <main>
        <Hero />
        <Research />
        <Writing />
        <Teaching />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
