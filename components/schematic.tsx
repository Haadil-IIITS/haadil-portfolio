import type { SchematicKind } from '@/lib/site-data'

function hexagon(cx: number, cy: number, radii: number[]) {
  return radii
    .map((radius, index) => {
      const angle = (Math.PI / 180) * (60 * index - 90)
      return `${(cx + radius * Math.cos(angle)).toFixed(1)},${(cy + radius * Math.sin(angle)).toFixed(1)}`
    })
    .join(' ')
}

const uniform = (radius: number) => Array.from({ length: 6 }, () => radius)

const signalPoints = Array.from({ length: 53 }, (_, index) => {
  const x = 20 + index * 5
  const drift = index > 30 ? (index - 30) * 1.5 : 0
  const y = 58 - Math.sin(index / 3.2) * 16 - Math.sin(index / 1.3) * 6 + drift
  return `${x},${y.toFixed(1)}`
})

const scatter = [
  [34, 112], [54, 102], [72, 108], [90, 92], [108, 96], [128, 80], [144, 86],
  [164, 68], [184, 72], [204, 56], [224, 60], [246, 44], [264, 48], [286, 32],
]

function Radar() {
  const axes = hexagon(160, 70, uniform(54)).split(' ')
  return (
    <>
      {[54, 36, 18].map((radius) => (
        <polygon className="schematic__grid" key={radius} points={hexagon(160, 70, uniform(radius))} />
      ))}
      {axes.map((point) => {
        const [x, y] = point.split(',')
        return <line className="schematic__grid" key={point} x1="160" y1="70" x2={x} y2={y} />
      })}
      <polygon className="schematic__accent" points={hexagon(160, 70, [48, 38, 44, 32, 46, 36])} />
      <polygon
        className="schematic__line"
        data-draw-path
        pathLength={1}
        points={hexagon(160, 70, [48, 38, 44, 32, 46, 36])}
      />
      {['D1', 'D2', 'D3', 'D4', 'D5', 'D6'].map((label, index) => {
        const [x, y] = hexagon(160, 70, uniform(64)).split(' ')[index].split(',')
        return (
          <text className="schematic__label" key={label} x={x} y={Number(y) + 2.5} textAnchor="middle">
            {label}
          </text>
        )
      })}
      <path className="schematic__grid" d="M24 28 H84 M24 40 H68 M24 52 H76 M236 88 H296 M252 100 H296 M244 112 H296" />
    </>
  )
}

function Signal() {
  return (
    <>
      <path className="schematic__grid" d="M20 24 V120 H300" />
      <path className="schematic__hot" d="M20 96 H300" />
      <rect className="schematic__grid" x="200" y="24" width="100" height="96" strokeDasharray="3 4" />
      <polyline
        className="schematic__line"
        data-draw-path
        pathLength={1}
        points={signalPoints.slice(0, 37).join(' ')}
      />
      <polyline className="schematic__dash" points={signalPoints.slice(36).join(' ')} />
      <text className="schematic__label" x="204" y="34">
        FORECAST WINDOW
      </text>
      <text className="schematic__label" x="24" y="92">
        THRESHOLD
      </text>
    </>
  )
}

function Vitals() {
  return (
    <>
      <path className="schematic__grid" d="M20 40 H190 M20 70 H190 M20 100 H190" />
      <path
        className="schematic__line"
        data-draw-path
        pathLength={1}
        d="M20 78 H44 l7 -7 l7 7 h10 l6 -40 l8 64 l8 -24 h22 l7 -7 l7 7 h10 l6 -40 l8 64 l8 -24 H190"
      />
      {[30, 54, 78, 102].map((y) => (
        <g key={y}>
          <rect className="schematic__grid" x="214" y={y} width="86" height="18" />
          <path className="schematic__grid" d={`M242 ${y} v18 M270 ${y} v18`} />
        </g>
      ))}
      <rect className="schematic__accent" x="214" y="30" width="86" height="18" />
      <text className="schematic__label" x="214" y="24">
        READINGS TABLE
      </text>
    </>
  )
}

function Regression() {
  return (
    <>
      <path className="schematic__grid" d="M24 20 V122 H300" />
      {scatter.map(([x, y]) => (
        <circle className="schematic__node" key={`${x}-${y}`} cx={x} cy={y} r="2.5" />
      ))}
      <path className="schematic__line" data-draw-path pathLength={1} d="M28 114 L296 30" />
      <text className="schematic__label" x="206" y="118">
        LOG(PRICE)
      </text>
    </>
  )
}

function Orbit() {
  return (
    <>
      <circle className="schematic__accent" cx="160" cy="70" r="24" />
      <ellipse className="schematic__grid" cx="160" cy="70" rx="10" ry="24" />
      <path className="schematic__grid" d="M136 70 H184" />
      <ellipse
        className="schematic__line"
        data-draw-path
        pathLength={1}
        cx="160"
        cy="70"
        rx="118"
        ry="40"
        transform="rotate(-12 160 70)"
      />
      <circle className="schematic__node" cx="236" cy="27" r="4" />
      <path className="schematic__grid" d="M236 14 V40 M223 27 H249" />
      <text className="schematic__label" x="254" y="24">
        ISS
      </text>
    </>
  )
}

const KINDS: Record<SchematicKind, () => React.ReactElement> = {
  radar: Radar,
  signal: Signal,
  vitals: Vitals,
  regression: Regression,
  orbit: Orbit,
}

export function Schematic({ kind }: { kind: SchematicKind }) {
  const Drawing = KINDS[kind]
  return (
    <svg className="schematic" viewBox="0 0 320 140" aria-hidden="true">
      <Drawing />
    </svg>
  )
}
