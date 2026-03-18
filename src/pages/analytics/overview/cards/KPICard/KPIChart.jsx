import { useEffect, useRef, useState } from "react"

export const KPIChart = ({ score = 93 }) => {
  const circleRef = useRef(null)
  const scoreRef = useRef(null)
  const animRef = useRef(null)

  const radius = 36
  const circumference = 2 * Math.PI * radius

  const color =
    score >= 75 ? "var(--green)" :
    score >= 60 ? "var(--yellow)" :
    "var(--red)"

  useEffect(() => {
    const circle = circleRef.current
    const scoreEl = scoreRef.current
    if (!circle || !scoreEl) return

    cancelAnimationFrame(animRef.current)

    // reset immediately via DOM
    circle.style.strokeDashoffset = circumference
    scoreEl.textContent = 0

    const targetOffset = circumference * (1 - score / 100)
    const duration = 1000
    const start = performance.now()

    const animate = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)

      circle.style.strokeDashoffset = circumference - ease * (circumference - targetOffset)
      scoreEl.textContent = Math.round(ease * score)

      if (t < 1) {
        animRef.current = requestAnimationFrame(animate)
      }
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [score])

  return (
    <div style={{ position: "relative", width: 62, height: 62 }}>
      <svg width={62} height={62} viewBox="0 0 88 88">
        <circle
          cx="44" cy="44" r={radius}
          fill="none"
          stroke="var(--t200)"
          strokeWidth={8.5}
        />
        <circle
          ref={circleRef}
          cx="44" cy="44" r={radius}
          fill="none"
          stroke={color}
          strokeWidth={8.5}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          transform="rotate(-90 44 44)"
        />
      </svg>
      <div
        ref={scoreRef}
        className="kpi-card-metric heading-regular weight-semibold"
        style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}
      >
        0
      </div>
    </div>
  )
}