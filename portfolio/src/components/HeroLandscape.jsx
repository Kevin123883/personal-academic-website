import { useEffect, useRef } from 'react'

// A small ink landscape that enters the hero from the bottom-right edge and
// dissolves into the paper. Three ridgelines, mist between them, a hint of
// water. Purely visual: it is a counterweight to the text, not a metaphor.
//
// Performance: each ridge is its own <svg> so its ink filter is rasterized
// once and then only transformed by the compositor. Mist is plain CSS.
// Motion is limited to a very slow mist drift and a few pixels of layer
// parallax on scroll; both are disabled under prefers-reduced-motion.

const RIDGES = {
  far: 'M-40 480 C 80 474, 150 452, 230 430 Q 300 410, 350 372 Q 380 350, 420 368 Q 470 392, 520 384 Q 600 372, 640 308 Q 655 286, 672 306 Q 720 360, 790 344 Q 850 330, 880 262 Q 892 240, 906 258 Q 960 330, 1040 318 Q 1090 310, 1120 274 Q 1136 258, 1152 276 Q 1200 330, 1260 300 Q 1310 270, 1340 222 Q 1352 206, 1366 224 Q 1400 276, 1450 282 L 1450 720 L -40 720 Z',
  mid: 'M-40 566 C 60 560, 130 540, 200 512 Q 260 490, 320 536 Q 360 562, 400 520 Q 440 470, 466 432 C 478 416, 486 418, 496 434 Q 530 494, 590 500 Q 640 504, 690 420 Q 715 374, 736 340 Q 748 322, 762 344 Q 800 410, 850 458 Q 880 484, 930 440 Q 960 412, 980 376 C 992 356, 1002 358, 1014 376 Q 1050 434, 1100 456 Q 1130 468, 1160 400 Q 1185 336, 1206 296 Q 1216 278, 1228 298 Q 1262 366, 1310 402 Q 1350 430, 1400 380 Q 1425 356, 1450 368 L 1450 720 L -40 720 Z',
  near: 'M 340 680 C 460 672, 560 650, 660 626 Q 740 606, 800 574 Q 850 548, 890 560 Q 930 572, 980 538 Q 1030 502, 1090 526 Q 1120 538, 1150 500 Q 1172 472, 1190 490 Q 1230 536, 1290 548 Q 1340 556, 1380 528 Q 1410 508, 1450 530 L 1450 720 L 340 720 Z',
}

function Fade({ id }) {
  // The painting dissolves into blank paper on its left and top, and softens at the base.
  return (
    <>
      <linearGradient id={`${id}-fx`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#000" />
        <stop offset="0.22" stopColor="#333" />
        <stop offset="0.55" stopColor="#fff" />
      </linearGradient>
      <linearGradient id={`${id}-fy`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.25" stopColor="#000" />
        <stop offset="0.6" stopColor="#fff" />
        <stop offset="0.86" stopColor="#fff" />
        <stop offset="1" stopColor="#000" />
      </linearGradient>
      <mask id={`${id}-mx`}>
        <rect width="1400" height="700" fill={`url(#${id}-fx)`} />
      </mask>
      <mask id={`${id}-my`}>
        <rect width="1400" height="700" fill={`url(#${id}-fy)`} />
      </mask>
    </>
  )
}

function Layer({ id, className, children }) {
  return (
    <svg
      className={`ls-layer ${className}`}
      viewBox="0 0 1400 700"
      preserveAspectRatio="xMaxYMax slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <Fade id={id} />
        {/* Ink wash: soft edge wobble + mottled interior, like pigment on paper. */}
        <filter id={`${id}-ink`} x="-5%" y="-10%" width="110%" height="125%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.02" numOctaves="2" seed="11" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="7" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="4" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.8 0.45" result="grainA" />
          <feComposite in="shape" in2="grainA" operator="in" />
        </filter>
        {/* Distant ridge: wobble, then blurred by atmosphere. */}
        <filter id={`${id}-far`} x="-5%" y="-10%" width="110%" height="125%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.02" numOctaves="2" seed="5" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="9" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feGaussianBlur in="shape" stdDeviation="1.6" />
        </filter>
        {/* Vertical ink gradients: dense at the ridgeline, dissolving at the base. */}
        <linearGradient id={`${id}-g-far`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ink-far)" stopOpacity="0.55" />
          <stop offset="0.55" stopColor="var(--ink-far)" stopOpacity="0.18" />
          <stop offset="1" stopColor="var(--ink-far)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-g-mid`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ink-mid)" stopOpacity="0.72" />
          <stop offset="0.5" stopColor="var(--ink-mid)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--ink-mid)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-g-near`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ink-near)" stopOpacity="0.9" />
          <stop offset="0.45" stopColor="var(--ink-near)" stopOpacity="0.42" />
          <stop offset="1" stopColor="var(--ink-near)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-g-water`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--ink-mid)" stopOpacity="0" />
          <stop offset="0.35" stopColor="var(--ink-mid)" stopOpacity="0.5" />
          <stop offset="1" stopColor="var(--ink-mid)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g mask={`url(#${id}-mx)`}>
        <g mask={`url(#${id}-my)`}>{children}</g>
      </g>
    </svg>
  )
}

export default function HeroLandscape() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return

    // Progress is written on the hero so both the landscape and the text read it.
    const host = el.closest('.hero') || el
    let raf = 0
    const update = () => {
      raf = 0
      const h = window.innerHeight || 1
      const p = Math.min(1, Math.max(0, window.scrollY / h))
      host.style.setProperty('--p', p.toFixed(4))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="landscape" ref={ref} aria-hidden="true">
      <Layer id="ls-a" className="ls-layer--far">
        <path filter="url(#ls-a-far)" fill="url(#ls-a-g-far)" d={RIDGES.far} />
      </Layer>
      <div className="ls-mist ls-mist--a" />
      <Layer id="ls-b" className="ls-layer--mid">
        <path filter="url(#ls-b-ink)" fill="url(#ls-b-g-mid)" d={RIDGES.mid} />
      </Layer>
      <div className="ls-mist ls-mist--b" />
      <Layer id="ls-c" className="ls-layer--near">
        <path filter="url(#ls-c-ink)" fill="url(#ls-c-g-near)" d={RIDGES.near} />
        <g stroke="url(#ls-c-g-water)" strokeLinecap="round" fill="none">
          <path d="M 140 676 L 760 676" strokeWidth="1.2" />
          <path d="M 240 688 L 680 688" strokeWidth="1" />
          <path d="M 100 699 L 560 699" strokeWidth="0.9" />
        </g>
      </Layer>
    </div>
  )
}

// A single distant ridge, used later in the page as a faded closing fragment.
export function LandscapeFragment() {
  return (
    <div className="landscape-fragment" aria-hidden="true">
      <Layer id="ls-f" className="ls-layer--far">
        <path filter="url(#ls-f-far)" fill="url(#ls-f-g-far)" d={RIDGES.far} />
      </Layer>
    </div>
  )
}
