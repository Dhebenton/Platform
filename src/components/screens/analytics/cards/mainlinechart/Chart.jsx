import { useMemo } from 'react'

const Y_TICK_COUNT = 5
const FLOOR = 5 // minimum bottom padding so line never hugs the baseline

function niceMax(val) {
  if (val === 0) return 10
  const magnitude = Math.pow(10, Math.floor(Math.log10(val)))
  return Math.ceil(val / magnitude) * magnitude
}

function formatYLabel(val, isPercent) {
  if (isPercent) return `${val}%`
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}m`
  if (val >= 1_000) return `${(val / 1_000).toFixed(1)}k`
  return String(val)
}

export default function LineChart({ data = [], loading, isPercent = false }) {
  const values = data.map(d => Number(d.value))
  const labels = data.map(d => {
    const date = new Date(d.date)
    return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
  })

  const { yTicks, yMax, polyline } = useMemo(() => {
    const max = isPercent ? 100 : niceMax(Math.max(...values, 1))
    const step = max / (Y_TICK_COUNT - 1)
    const ticks = Array.from({ length: Y_TICK_COUNT }, (_, i) => Math.round(i * step))

    // FLOOR keeps the line off the very bottom — maps value=0 to y=(100-FLOOR)
    const toX = (i) => (i / Math.max(values.length - 1, 1)) * 100
    const toY = (v) => (1 - v / max) * (100 - FLOOR)

    const points = values.length >= 2
      ? values.map((v, i) => `${toX(i)},${toY(v)}`).join(' ')
      : ''

    return { yTicks: ticks, yMax: max, polyline: points }
  }, [values, isPercent])

  // Gridlines use same toY so they align with labels
  const gridLines = yTicks.map(t => (1 - t / yMax) * (100 - FLOOR))

  // Cap x-axis at 12 labels
  const xLabels = useMemo(() => {
    if (labels.length <= 12) return labels
    const step = (labels.length - 1) / 11
    return Array.from({ length: 12 }, (_, k) => labels[Math.round(k * step)])
  }, [labels])

  return (
    <div className="chart-wrap">

      <div className="y-axis f-col j-s-b axis">
        {[...yTicks].reverse().map((t, i) => (
          <span key={i}>{formatYLabel(t, isPercent)}</span>
        ))}
      </div>

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 0.8px, transparent 0.8px)',
          backgroundSize: '11.5px 11.5px',
          opacity: loading ? 0.4 : 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        {gridLines.map((y, i) => (
          <line
            key={i}
            x1="0" y1={y}
            x2="100" y2={y}
            stroke="#EDEDED"
            strokeWidth="1.5"
            strokeDasharray="11,11"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {polyline ? (
          <polyline
            points={polyline}
            fill="none"
            stroke="#1A7DFF"
            strokeWidth="2.5"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ) : values.length === 1 ? (
          <circle
            cx="50"
            cy={(1 - values[0] / yMax) * (100 - FLOOR)}
            r="3"
            fill="#1A7DFF"
            vectorEffect="non-scaling-stroke"
          />
        ) : (
          <line
            x1="0" y1="80" x2="100" y2="80"
            stroke="#EDEDED"
            strokeWidth="3"
            strokeDasharray="4,4"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>

      <div className="x-axis axis f-row j-s-b">
        {xLabels.map((label, idx) => (
          <div key={idx} className="f-row be-rel x-axis-point">
            <span>{label}</span>
          </div>
        ))}
      </div>

    </div>
  )
}