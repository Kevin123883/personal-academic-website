import { useSyncExternalStore } from 'react'

// A deliberately tiny client-side router: one page per path, History API only.
// Vercel rewrites unknown paths to index.html (see vercel.json) so deep links
// like /research load directly; Vite's dev server does the same.

const NAV_EVENT = 'app:navigate'

const subscribe = (onChange) => {
  window.addEventListener('popstate', onChange)
  window.addEventListener(NAV_EVENT, onChange)
  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener(NAV_EVENT, onChange)
  }
}

/** Current path, without a trailing slash ("/" stays "/"). */
const currentPath = () => window.location.pathname.replace(/(.)\/+$/, '$1') || '/'

export const usePath = () => useSyncExternalStore(subscribe, currentPath)

export function navigate(to) {
  if (to !== currentPath()) {
    window.history.pushState(null, '', to)
    window.dispatchEvent(new Event(NAV_EVENT))
  }
  // a new page starts at its top, without the smooth-scroll animation
  window.scrollTo({ top: 0, behavior: 'instant' })
}

/** An <a> that switches pages in place; modified clicks still open new tabs. */
export function Link({ to, onClick, ...rest }) {
  const handle = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(to)
  }
  return <a href={to} onClick={handle} {...rest} />
}

// Old single-page links (kaiwenluo.me/#research) land on the matching page.
export function redirectLegacyHash(paths) {
  const hash = window.location.hash.slice(1)
  if (window.location.pathname === '/' && hash && paths.includes(`/${hash}`)) {
    window.history.replaceState(null, '', `/${hash}`)
  }
}
