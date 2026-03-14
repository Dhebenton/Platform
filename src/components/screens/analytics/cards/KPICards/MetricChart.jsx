import { useEffect, useState } from "react";

export const MetricCharts = ({ score = 93 }) => {
  const [animatedDash, setAnimatedDash] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 1340);

  const size = isLarge ? 64 : 58;
  const strokeWidth = isLarge ? 8 : 6;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  const color =
    score >= 75 ? "var(--green)" :
    score >= 60 ? "var(--yellow)" :
    "var(--red)";

  useEffect(() => {
    const handleResize = () => setIsLarge(window.innerWidth >= 1340);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();

    const animate = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);

      setAnimatedScore(Math.round(ease * score));
      setAnimatedDash(circumference * (1 - ease * (score / 100)));

      if (t < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [score]);

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={radius} fill="none" stroke="#e8e8e8" strokeWidth={strokeWidth} />
        <circle
          cx="44" cy="44" r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animatedDash}
          transform="rotate(-90 44 44)"
        />
      </svg>
      <div className="kpi-card-metric" style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        {animatedScore}
      </div>
    </div>
  );
};