import { useRef, useState, useEffect, useMemo } from "react";

const CHART_H = 280;
const AXIS_H = 48;
const PAD_TOP = 20;
const PAD_BOTTOM = 20;
const TOTAL_H = CHART_H + AXIS_H;
const GAP = 20;
const NUM_LABELS = 6;
const NUM_Y_TICKS = 4;

function formatY(v, isPercent) {
  if (isPercent) return `${v}%`
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + "m";
  if (v >= 1_000) return (v / 1_000).toFixed(1) + "k";
  return v;
}

function niceMax(val) {
  if (val === 0) return 10
  const magnitude = Math.pow(10, Math.floor(Math.log10(val)))
  return Math.ceil(val / magnitude) * magnitude
}

export default function AnalyticsChart({ data = [], loading = false, isPercent = false }) {
  const containerRef = useRef(null);
  const yAxisRef = useRef(null);
  const [W, setW] = useState(800);
  const [yAxisW, setYAxisW] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    setW(containerRef.current.offsetWidth);
    const ro = new ResizeObserver((e) => setW(e[0].contentRect.width));
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!yAxisRef.current) return;
    const bbox = yAxisRef.current.getBBox();
    setYAxisW(bbox.width + GAP);
  }, [W]);

  const values = data.map(d => Number(d.value));
  const labels = data.map(d => {
    const date = new Date(d.date);
    return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
  });

  const PAD_Y_LEFT = yAxisW || 48;
  const max = isPercent ? 100 : niceMax(Math.max(...values, 1));

  const chartStart = PAD_Y_LEFT;
  const chartEnd = W;
  const chartW = chartEnd - chartStart;

  const points = values.map((v, i) => ({
    x: chartStart + (i / Math.max(values.length - 1, 1)) * chartW,
    y: PAD_TOP + (1 - v / max) * (CHART_H - PAD_TOP - PAD_BOTTOM),
  }));

  const linePath = points.reduce((d, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    if (i === points.length - 1) return `${d} L ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const next = points[i + 1];
    const r = 8;
    const d1 = Math.hypot(p.x - prev.x, p.y - prev.y);
    const d2 = Math.hypot(next.x - p.x, next.y - p.y);
    const t1 = Math.min(r / d1, 0.5);
    const t2 = Math.min(r / d2, 0.5);
    const x1 = p.x - (p.x - prev.x) * t1;
    const y1 = p.y - (p.y - prev.y) * t1;
    const x2 = p.x + (next.x - p.x) * t2;
    const y2 = p.y + (next.y - p.y) * t2;
    return `${d} L ${x1} ${y1} Q ${p.x} ${p.y} ${x2} ${y2}`;
  }, "");

  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${CHART_H} L ${points[0].x} ${CHART_H} Z`
    : "";

  const dotY = CHART_H + 12;

  const labelPositions = useMemo(() => {
    if (labels.length === 0) return [];
    return Array.from({ length: NUM_LABELS }, (_, i) => {
      const x = chartStart + (i / (NUM_LABELS - 1)) * chartW;
      const dataIndex = Math.round((i / (NUM_LABELS - 1)) * (labels.length - 1));
      return { x, label: labels[dataIndex] };
    });
  }, [labels, chartStart, chartW]);

  const midDots = labelPositions.slice(0, -1).map((p, i) => ({
    x: (p.x + labelPositions[i + 1].x) / 2,
  }));

  const yTicks = Array.from({ length: NUM_Y_TICKS }, (_, i) => {
    const t = i / (NUM_Y_TICKS - 1);
    return {
      value: Math.round(max * (1 - t)),
      y: PAD_TOP + t * (CHART_H - PAD_TOP - PAD_BOTTOM),
    };
  });

  return (
    <div
      ref={containerRef}
      className="main-chart f-col g36 full-width"
      style={{ opacity: loading ? 0.4 : 1, transition: 'opacity 0.3s ease' }}
    >
      <svg viewBox={`0 0 ${W} ${TOTAL_H}`} width="100%" height={TOTAL_H} style={{ display: "block" }}>
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--blue)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g ref={yAxisRef}>
          {yTicks.map((t, i) => (
            <text key={i} x={0} y={t.y + 4} textAnchor="start" className="text-xsmall axis-point">
              {formatY(t.value, isPercent)}
            </text>
          ))}
        </g>

        {areaPath && <path d={areaPath} fill="url(#fill)" />}
        {linePath && <path d={linePath} fill="none" stroke="var(--blue)" strokeWidth={2} />}

        {labelPositions.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={CHART_H + 20}
            textAnchor={i === 0 ? "start" : i === NUM_LABELS - 1 ? "end" : "middle"}
            className="text-xsmall axis-point"
          >
            {p.label}
          </text>
        ))}

        {midDots.map((d, i) => (
          <circle key={i} cx={d.x} cy={dotY} className="dots" r={2} fill="#D4D4D4" />
        ))}
      </svg>
    </div>
  );
}