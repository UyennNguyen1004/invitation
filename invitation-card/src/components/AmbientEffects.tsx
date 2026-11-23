"use client";

import { useEffect, useRef } from "react";

type ParticleDot = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
  color: string;
};

const PALETTE = [
  "rgba(201, 173, 127, 0.9)", // Champagne Gold
  "rgba(235, 212, 168, 0.85)", // Gold sáng nhẹ
  "rgba(169, 197, 229, 0.85)", // Baby Blue
];

export default function AmbientEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const count = width < 640 ? 18 : 30;
    const dots: ParticleDot[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.6 + Math.random() * 2.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(0.22 + Math.random() * 0.48),
      phase: Math.random() * Math.PI * 2,
      speed: 0.015 + Math.random() * 0.02,
      color: PALETTE[i % PALETTE.length],
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const dot of dots) {
        dot.phase += dot.speed;
        dot.x += dot.vx + Math.sin(dot.phase) * 0.22;
        dot.y += dot.vy;

        if (dot.y < -12) {
          dot.y = height + 12;
          dot.x = Math.random() * width;
        }
        if (dot.x < -12) dot.x = width + 12;
        if (dot.x > width + 12) dot.x = -12;

        const alpha = 0.25 + ((Math.sin(dot.phase) + 1) / 2) * 0.65;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.shadowColor = "rgba(201, 173, 127, 0.7)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}