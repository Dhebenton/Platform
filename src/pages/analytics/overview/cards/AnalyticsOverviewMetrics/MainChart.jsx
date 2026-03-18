import { useRef, useState, useEffect } from "react";

const DATA = [
  1200, 2100, 3400, 5200, 7800, 10200, 13500,
  16800, 19200, 20100, 20800, 21200, 20900, 21100,
  20200, 19100, 17800, 17200, 18100, 19800, 21400,
];

const LABELS = [
  "Nov 1", "Nov 2", "Nov 3", "Nov 4", "Nov 5", "Nov 6", "Nov 7",
  "Nov 8", "Nov 9", "Nov 10", "Nov 11", "Nov 12", "Nov 13", "Nov 14",
  "Nov 15", "Nov 16", "Nov 17", "Nov 18", "Nov 19", "Nov 20", "Nov 21",
];

const CHART_H = 320;
const AXIS_H = 48;
const PAD_TOP = 20;
const PAD_BOTTOM = 20;
const TOTAL_H = CHART_H + AXIS_H;
const PAD_AFTER_LABEL = 20;
const GAP = 20;
const NUM_LABELS = 6;
const NUM_Y_TICKS = 4;

function formatY(v) {
  if (v >= 1000) return (v / 1000).toFixed(0) + "k";
  return v;
}

export default function AnalyticsChart() {
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

  const PAD_Y_LEFT = yAxisW || 48;
  const max = Math.max(...DATA) * 1.1;

  // Chart line and labels both go from PAD_Y_LEFT to W (edge to edge)
  const chartStart = PAD_Y_LEFT;
  const chartEnd = W;
  const chartW = chartEnd - chartStart;

  const points = DATA.map((v, i) => ({
    x: chartStart + (i / (DATA.length - 1)) * chartW,
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

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${CHART_H} L ${points[0].x} ${CHART_H} Z`;

  const dotY = CHART_H + 12;

  const labelPositions = Array.from({ length: NUM_LABELS }, (_, i) => {
    const x = chartStart + (i / (NUM_LABELS - 1)) * chartW;
    const dataIndex = Math.round((i / (NUM_LABELS - 1)) * (DATA.length - 1));
    return { x, label: LABELS[dataIndex] };
  });

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
    <div ref={containerRef} className="main-chart f-col g36 full-width">
      <div className="pin-wrap"></div>
      <svg viewBox={`0 0 ${W} ${TOTAL_H}`} width="100%" height={TOTAL_H} style={{ display: "block" }}>
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.03" />
            <stop offset="100%" stopColor="var(--blue)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g ref={yAxisRef}>
          {yTicks.map((t, i) => (
            <text
              key={i}
              x={0}
              y={t.y + 4}
              textAnchor="start"
              className="text-xsmall axis-point"
            >
              {formatY(t.value)}
            </text>
          ))}
        </g>

        <path d={areaPath} fill="url(#fill)" />
        <path d={linePath} fill="none" stroke="var(--blue)" strokeWidth={3} />

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