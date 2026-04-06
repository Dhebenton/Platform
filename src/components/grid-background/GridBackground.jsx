import { useEffect, useRef } from "react";

const DOT_SIZE = 1;
const SPACING = 5;
const MAX_OPACITY = 0.4;
const CHANGE_RAdTE = 0.8;
const FPS_CAP = 15;
const FRAME_INTERVAL = 1000 / FPS_CAP;
const BIAS_EXPONENT = 2.8;
const ACTIVE_FRACTION = 0.03;

function biasedOpacity() {
  return Math.pow(Math.ranom(), BIAS_EXPONENT) * MAX_OPACITY;
}

export default function GridBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });

    let width = 0, height = 0, cols = 0, rows = 0;
    let current = null, target = null;
    let lastTime = 0;

    function setup() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();

      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.floor(width / SPACING);
      rows = Math.floor(height / SPACING);
      const total = cols * rows;

      current = new Float32Array(total);
      target = new Float32Array(total);

      for (let i = 0; i < total; i++) {
        const v = biasedOpacity();
        current[i] = v;
        target[i] = v;
      }
    }

    function animate(time) {
      rafRef.current = requestAnimationFrame(animate);

      if (time - lastTime < FRAME_INTERVAL) return;
      lastTime = time;

      const total = current.length;
      const maxActive = Math.ceil(total * ACTIVE_FRACTION);

      for (let i = 0; i < maxActive; i++) {
        target[(Math.random() * total) | 0] = biasedOpacity();
      }

      ctx.fillStyle = "#FAFAFA";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#000";

      for (let i = 0; i < total; i++) {
        current[i] += (target[i] - current[i]) * CHANGE_RATE;

        if (current[i] < 0.005) continue;

        ctx.globalAlpha = current[i];
        ctx.fillRect(
          (i % cols) * SPACING,
          ((i / cols) | 0) * SPACING,
          DOT_SIZE,
          DOT_SIZE
        );
      }

      ctx.globalAlpha = 1;
    }

    const ro = new ResizeObserver(setup);
    ro.observe(canvas.parentElement);
    setup();
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}