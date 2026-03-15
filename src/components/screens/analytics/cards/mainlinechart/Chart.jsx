import { useMemo } from "react";

const data = [20, 47, 55, 22, 77, 92, 98];
const labels = ["Nov 10", "Nov 11", "Nov 12", "Nov 13", "Nov 14", "Nov 15", "Nov 16"];
const Y_TICKS = [0, 25, 50, 75, 100];

const toX = (i) => (i / (data.length - 1)) * 100;
const toY = (v) => 100 - v;

export default function LineChart() {
  const polyline = useMemo(() =>
    data.map((v, i) => `${toX(i)},${toY(v)}`).join(" "),
  []);

  return (
    <div className="chart-wrap">

      <div className="y-axis f-col j-s-b axis">
        {[...Y_TICKS].reverse().map((t) => (
          <span key={t}>{t}%</span>
        ))}
      </div>

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.07) 0.8px, transparent 0.8px)",
          backgroundSize: "11.5px 11.5px",
        }}
      >
        {Y_TICKS.map((t) => (
               <line
               key={t}
               x1="0" y1={toY(t)}
               x2="100" y2={toY(t)}
               stroke="#EDEDED"
               strokeWidth="1.5"
               strokeDasharray="11,11"
               vectorEffect="non-scaling-stroke"
               />
          ))}
        <polyline
          points={polyline}
          fill="none"
          stroke="#1A7DFF"
          strokeWidth="2"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="x-axis axis f-row j-s-b">
        {labels.map((label) => (
          <div key={label} className="f-row be-rel x-axis-point">
            <span>{label}</span>
          </div>
        ))}
      </div>

    </div>
  );
}