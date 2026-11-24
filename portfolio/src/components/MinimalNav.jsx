import { useEffect, useState } from 'react'
import { nav, person } from '../content.js'
import { Link } from '../router.jsx'

const THEME_COLOR = { light: '#F5F2EA', dark: '#151716' }

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
}

// Day / night. Follows the system until the reader picks one; the choice is remembered.
function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => {
      let stored = null
      try {
        stored = localStorage.getItem('theme')
      } catch {}
      if (stored) return
      const next = e.matches ? 'dark' : 'light'
      applyTheme(next)
      setTheme(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    root.classList.add('theme-fading')
    applyTheme(next)
    setTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch {}
    window.setTimeout(() => root.classList.remove('theme-fading'), 600)
  }

  return [theme, toggle]
}

export default function MinimalNav({ path }) {
  const [scrolled, setScrolled] = useState(false)
  const [theme, toggleTheme] = useTheme()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [path])
  // On the home page the hero carries the name, so the nav's copy waits for a
  // scroll; on every other page it is the way home and always shows.
  const cls = ['nav', scrolled && 'nav--scrolled', path !== '/' && 'nav--page'].filter(Boolean).join(' ')
  return (
    <header className={cls}>
      <Link to="/" className="nav-name">
        {person.name}
      </Link>
      <nav className="nav-links" aria-label="Pages">
        {nav.map((n) => (
          <Link key={n.href} to={n.href} aria-current={n.href === path ? 'page' : undefined}>
            {n.label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to day mode' : 'Switch to night mode'}
      >
        {theme === 'dark' ? 'Day' : 'Night'}
      </button>
    </header>
  )
}
