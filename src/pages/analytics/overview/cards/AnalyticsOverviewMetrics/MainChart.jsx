import { useRef, useState, useEffect, useMemo } from "react";

const CHART_H = 280;
const AXIS_H = 48;
const PAD_TOP = 20;
const PAD_BOTTOM = 20;
const TOTAL_H = CHART_H + AXIS_H;
const GAP = 20;
const NUM_LABELS = 6;
const NUM_Y_TICKS = 4;
const TOOLTIP_W = 180;
const TOOLTIP_H = 70;

function formatY(v, isPercent) {
  if (isPercent) return `${v}%`;
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + "m";
  if (v >= 1_000) return (v / 1_000).toFixed(1) + "k";
  return v;
}

function formatTooltipValue(v, isPercent) {
  if (isPercent) return `${v}%`;
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + "m";
  if (v >= 1_000) return v.toLocaleString();
  return v;
}

function formatTooltipDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11 ? "st"
    : day % 10 === 2 && day !== 12 ? "nd"
    : day % 10 === 3 && day !== 13 ? "rd"
    : "th";
  return (
    date.toLocaleDateString("en-US", { month: "long" }) +
    " " + day + suffix + ", " + date.getFullYear()
  );
}

function niceMax(val) {
  if (val === 0) return 10;
  const magnitude = Math.pow(10, Math.floor(Math.log10(val)));
  return Math.ceil(val / magnitude) * magnitude;
}

export default function AnalyticsChart({
  data = [],
  loading = false,
  isPercent = false,
  label = "Visitors",
}) {
  const containerRef = useRef(null);
  const yAxisRef = useRef(null);
  const linePathRef = useRef(null);
  const [W, setW] = useState(800);
  const [yAxisW, setYAxisW] = useState(0);
  const [hoverX, setHoverX] = useState(null);
  const [hoverY, setHoverY] = useState(null);

  // ── Responsive width ──────────────────────────────────────────
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

  // ── Derived values ────────────────────────────────────────────
  const values = data.map((d) => Number(d.value));
  const labels = data.map((d) =>
    new Date(d.date).toLocaleDateString("en-GB", { month: "short", day: "numeric" })
  );

  const PAD_Y_LEFT = yAxisW || 48;
  const max = isPercent ? 100 : niceMax(Math.max(...values, 1));
  const chartStart = PAD_Y_LEFT;
  const chartEnd = W;
  const chartW = chartEnd - chartStart;

  const points = useMemo(
    () =>
      values.map((v, i) => ({
        x: chartStart + (i / Math.max(values.length - 1, 1)) * chartW,
        y: PAD_TOP + (1 - v / max) * (CHART_H - PAD_TOP - PAD_BOTTOM),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values.join(","), chartStart, chartW, max]
  );

  // ── Line + area paths ─────────────────────────────────────────
  const linePath = useMemo(() => {
    return points.reduce((d, p, i) => {
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
  }, [points]);

  const areaPath = useMemo(
    () =>
      points.length > 0
        ? `${linePath} L ${points[points.length - 1].x} ${CHART_H} L ${points[0].x} ${CHART_H} Z`
        : "",
    [linePath, points]
  );

  const labelPositions = useMemo(() => {
    if (labels.length === 0 || points.length === 0) return [];
    return Array.from({ length: NUM_LABELS }, (_, i) => {
      const dataIndex = Math.round((i / (NUM_LABELS - 1)) * (labels.length - 1));
      return { x: points[dataIndex].x, label: labels[dataIndex], dataIndex };
    });
  }, [labels, points]);

  const midDots = labelPositions.slice(0, -1).map((p, i) => ({
    x: (p.x + labelPositions[i + 1].x) / 2,
  }));

  const dotY = CHART_H + 12;

  const yTicks = Array.from({ length: NUM_Y_TICKS }, (_, i) => {
    const t = i / (NUM_Y_TICKS - 1);
    return {
      value: Math.round(max * (1 - t)),
      y: PAD_TOP + t * (CHART_H - PAD_TOP - PAD_BOTTOM),
    };
  });

  function handleMouseMove(e) {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const scaleX = parseFloat(svg.getAttribute("viewBox").split(" ")[2]) / rect.width;
    const scaleY = parseFloat(svg.getAttribute("viewBox").split(" ")[3]) / rect.height;
    const svgX = Math.max(chartStart, Math.min((e.clientX - rect.left) * scaleX, chartEnd));
    const svgY = (e.clientY - rect.top) * scaleY;
    setHoverX(svgX);
    setHoverY(svgY);
  }

  function handleMouseLeave() {
    setHoverX(null);
    setHoverY(null);
  }

  const hoverPoint = useMemo(() => {
    if (hoverX === null || points.length === 0) return null;

    // Nearest data index for tooltip value snapping
    let leftIdx = 0;
    for (let i = 0; i < points.length - 1; i++) {
      if (hoverX >= points[i].x) leftIdx = i;
    }
    const rightIdx = Math.min(leftIdx + 1, points.length - 1);
    const left = points[leftIdx];
    const right = points[rightIdx];
    const t = left.x === right.x ? 0 : (hoverX - left.x) / (right.x - left.x);
    const dataIndex = Math.max(0, Math.min(1, t)) < 0.5 ? leftIdx : rightIdx;

    // Use the actual rendered SVG path to get the true Y at hoverX
    // Binary search along path length until we match the X coordinate
    let dotY = left.y + (right.y - left.y) * Math.max(0, Math.min(1, t)); // fallback
    const pathEl = linePathRef.current;
    if (pathEl) {
      const totalLength = pathEl.getTotalLength();
      let lo = 0, hi = totalLength;
      for (let i = 0; i < 64; i++) {
        const mid = (lo + hi) / 2;
        const pt = pathEl.getPointAtLength(mid);
        if (pt.x < hoverX) lo = mid;
        else hi = mid;
      }
      dotY = pathEl.getPointAtLength((lo + hi) / 2).y;
    }

    return { x: hoverX, y: dotY, dataIndex };
  }, [hoverX, points]);

  // ── Tooltip position (clamped) ────────────────────────────────
  const TOOLTIP_OFFSET = 12;
  const tooltipX = hoverPoint
    ? Math.max(chartStart, Math.min(hoverPoint.x + TOOLTIP_OFFSET, W - TOOLTIP_W))
    : 0;
  const tooltipY = hoverY !== null
    ? Math.max(PAD_TOP, Math.min(hoverY + TOOLTIP_OFFSET, TOTAL_H - TOOLTIP_H))
    : 0;

  // ── Pill label on x-axis ──────────────────────────────────────
  const pillLabel = hoverPoint ? labels[hoverPoint.dataIndex] : null;
  const pillW = pillLabel ? pillLabel.length * 7 + 16 : 0;
  const pillX = hoverPoint
    ? Math.max(chartStart, Math.min(hoverPoint.x - pillW / 2, W - pillW))
    : 0;

  return (
    <div
      ref={containerRef}
      className="main-chart f-col g36 full-width"
      style={{ opacity: loading ? 0.4 : 1, transition: "opacity 0.3s ease" }}
    >
      <svg
        viewBox={`0 0 ${W} ${TOTAL_H}`}
        width="100%"
        height={TOTAL_H}
        style={{ display: "block", cursor: "crosshair" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--blue)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y-axis labels */}
        <g ref={yAxisRef}>
          {yTicks.map((t, i) => (
            <text key={i} x={0} y={t.y + 4} textAnchor="start" className="text-xsmall axis-point">
              {formatY(t.value, isPercent)}
            </text>
          ))}
        </g>

        {/* Area fill + line */}
        {areaPath && <path d={areaPath} fill="url(#fill)" />}
        {linePath && <path ref={linePathRef} d={linePath} fill="none" stroke="var(--blue)" strokeWidth={2.5} />}

        {/* Vertical cursor line */}
        {hoverPoint && (
          <line
            x1={hoverPoint.x} y1={PAD_TOP}
            x2={hoverPoint.x} y2={CHART_H}
            stroke="var(--blue)"
            strokeWidth={1}
            strokeDasharray="4 3"
            opacity={0.4}
            style={{ transition: "x1 0.05s linear, x2 0.05s linear" }}
          />
        )}

        {/* Dot — uses transform so transition works cleanly */}
        {hoverPoint && (
          <g
            transform={`translate(${hoverPoint.x}, ${hoverPoint.y})`}
            style={{ transition: "transform 0.05s linear" }}
          >
            <circle r={6} fill="white" stroke="var(--blue)" strokeWidth={2} />
            <circle r={3} fill="var(--blue)" />
          </g>
        )}

        {/* Tooltip card */}
        {hoverPoint && (
          <g style={{ transition: "transform 0.05s linear" }}>
            <rect
              x={tooltipX} y={tooltipY}
              width={TOOLTIP_W} height={TOOLTIP_H}
              rx={10} ry={10}
              fill="#1f2023"
            />
            <text
              x={tooltipX + 14} y={tooltipY + 22}
              fill="#9ca3af" fontSize={11} fontFamily="inherit"
            >
              {formatTooltipDate(data[hoverPoint.dataIndex].date)}
            </text>
            <rect
              x={tooltipX + 14} y={tooltipY + 36}
              width={8} height={8} rx={2}
              fill="var(--blue)"
            />
            <text
              x={tooltipX + 28} y={tooltipY + 44}
              fill="white" fontSize={13} fontWeight={500} fontFamily="inherit"
            >
              {label}:
            </text>
            <text
              x={tooltipX + TOOLTIP_W - 14} y={tooltipY + 44}
              fill="white" fontSize={13} fontWeight={700}
              textAnchor="end" fontFamily="inherit"
            >
              {formatTooltipValue(values[hoverPoint.dataIndex], isPercent)}
            </text>
          </g>
        )}

        {/* X-axis labels — hide when pill overlaps */}
        {labelPositions.map((p, i) => {
          const isNearHover =
            hoverPoint && Math.abs(p.x - hoverPoint.x) < chartW / (NUM_LABELS * 2);
          return (
            <text
              key={i}
              x={p.x}
              y={CHART_H + 20}
              textAnchor={i === 0 ? "start" : i === NUM_LABELS - 1 ? "end" : "middle"}
              className="text-xsmall axis-point"
              style={{ transition: "opacity 0.15s ease", opacity: isNearHover ? 0 : 1 }}
            >
              {p.label}
            </text>
          );
        })}

        {/* Mid-point dots between labels */}
        {midDots.map((d, i) => (
          <circle key={i} cx={d.x} cy={dotY} className="dots" r={2} fill="#D4D4D4" />
        ))}

        {/* Pill label — tracks hovered point exactly */}
        {hoverPoint && pillLabel && (
          <g style={{ transition: "transform 0.05s linear" }}>
            <rect
              x={pillX} y={CHART_H + 6}
              width={pillW} height={20}
              rx={10} fill="#e5e7eb"
            />
            <text
              x={pillX + pillW / 2} y={CHART_H + 19}
              textAnchor="middle"
              fontSize={11} fill="#374151" fontFamily="inherit"
            >
              {pillLabel}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}