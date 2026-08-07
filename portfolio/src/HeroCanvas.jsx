import { useEffect, useRef } from 'react'

// Slow-drifting node network — reads as "platform / agents" without shouting.
// Colors are pulled from CSS variables so it adapts to the day/night theme.
export default function HeroCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf = 0
    let nodes = []
    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let colors = { dot: 'rgba(255,255,255,0.5)', line: 'rgba(255,255,255,0.08)' }

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      colors = {
        dot: cs.getPropertyValue('--canvas-dot').trim() || colors.dot,
        line: cs.getPropertyValue('--canvas-line').trim() || colors.line,
      }
    }

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(90, Math.floor((w * h) / 22000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 0.8 + Math.random() * 1.4,
      }))
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      const LINK = 130
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        a.x += a.vx
        a.y += a.vy
        if (a.x < -20) a.x = w + 20
        if (a.x > w + 20) a.x = -20
        if (a.y < -20) a.y = h + 20
        if (a.y > h + 20) a.y = -20
      }
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK * LINK) {
            const t = 1 - Math.sqrt(d2) / LINK
            ctx.globalAlpha = t
            ctx.strokeStyle = colors.line
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
      ctx.fillStyle = colors.dot
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    readColors()
    resize()
    tick()

    const onResize = () => resize()
    window.addEventListener('resize', onResize)
    const observer = new MutationObserver(readColors)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
    }
  }, [])

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />
}
