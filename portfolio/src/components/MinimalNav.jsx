import { useEffect, useState } from 'react'
import { nav, person } from '../content.js'

export default function MinimalNav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <a href="#top" className="nav-name">
        {person.name}
      </a>
      <nav className="nav-links" aria-label="Sections">
        {nav.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
