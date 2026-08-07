// Abstract line-art covers for the featured projects.
// Everything is drawn with CSS variables so the same art works day and night.

function Agentic() {
  const nodes = [
    [90, 70], [230, 40], [370, 90], [510, 50], [620, 130],
    [70, 210], [200, 170], [350, 220], [500, 180], [640, 260],
    [130, 320], [280, 300], [430, 330], [570, 350],
  ]
  const links = [
    [0, 1], [1, 2], [2, 3], [3, 4], [0, 6], [1, 6], [2, 7], [3, 8],
    [5, 6], [6, 7], [7, 8], [8, 9], [5, 10], [6, 11], [7, 12], [8, 13],
    [10, 11], [11, 12], [12, 13], [4, 9],
  ]
  const path = [5, 6, 7, 8, 4]
  return (
    <svg viewBox="0 0 700 400" className="art" role="img" aria-label="Abstract agent network">
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} className="art-line" />
      ))}
      <polyline
        points={path.map((i) => nodes[i].join(',')).join(' ')}
        className="art-accent-line"
      />
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={path.includes(i) ? 7 : 4.5} className={path.includes(i) ? 'art-accent-dot' : 'art-dot'} />
      ))}
      <circle cx={nodes[4][0]} cy={nodes[4][1]} r="16" className="art-ring" />
    </svg>
  )
}

function Warehouse() {
  const cells = []
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 9; c++) {
      cells.push([50 + c * 68, 50 + r * 64])
    }
  }
  const route = '50,306 186,306 186,178 390,178 390,242 594,242'
  return (
    <svg viewBox="0 0 700 400" className="art" role="img" aria-label="Abstract warehouse grid with pick path">
      {cells.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="48" height="44" rx="3" className={[4, 12, 21, 30, 38].includes(i) ? 'art-fill' : 'art-cell'} />
      ))}
      <polyline points={route} className="art-accent-line art-route" />
      <circle cx="50" cy="306" r="7" className="art-accent-dot" />
      <circle cx="594" cy="242" r="7" className="art-accent-dot" />
      <circle cx="594" cy="242" r="15" className="art-ring" />
    </svg>
  )
}

function Funnel() {
  const stages = [
    { w: 560, y: 40 },
    { w: 430, y: 110 },
    { w: 310, y: 180 },
    { w: 200, y: 250 },
    { w: 110, y: 320 },
  ]
  return (
    <svg viewBox="0 0 700 400" className="art" role="img" aria-label="Abstract capacity funnel">
      {stages.map((s, i) => (
        <rect
          key={i}
          x={(700 - s.w) / 2}
          y={s.y}
          width={s.w}
          height="40"
          rx="4"
          className={i === 3 ? 'art-fill' : 'art-cell'}
        />
      ))}
      {stages.slice(0, -1).map((s, i) => {
        const next = stages[i + 1]
        return (
          <line
            key={i}
            x1="350"
            y1={s.y + 40}
            x2="350"
            y2={next.y}
            className="art-accent-line"
          />
        )
      })}
      {[130, 265, 350, 435, 570].map((x, i) => (
        <circle key={i} cx={x} cy={60} r="4" className="art-dot" />
      ))}
      <circle cx="350" cy="340" r="7" className="art-accent-dot" />
      <circle cx="350" cy="340" r="15" className="art-ring" />
    </svg>
  )
}

export default function ProjectArt({ kind }) {
  if (kind === 'agentic') return <Agentic />
  if (kind === 'warehouse') return <Warehouse />
  return <Funnel />
}
