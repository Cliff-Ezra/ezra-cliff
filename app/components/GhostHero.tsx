"use client";

import { useEffect, useRef } from "react";

const TRAIL_LEN = 10;
const LAG = 0.1;
const BOB_SPEED = 0.04;
const BOB_AMP = 9;

function drawGhost(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  alpha: number,
  angle: number,
  mouse?: { x: number; y: number },
) {
  const s = 56 * scale;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.beginPath();
  ctx.arc(0, -s * 0.2, s * 0.5, Math.PI, 0);
  ctx.lineTo(s * 0.5, s * 0.35);
  ctx.quadraticCurveTo(s * 0.33, s * 0.55, s * 0.17, s * 0.35);
  ctx.quadraticCurveTo(0, s * 0.55, -s * 0.17, s * 0.35);
  ctx.quadraticCurveTo(-s * 0.33, s * 0.55, -s * 0.5, s * 0.35);
  ctx.closePath();
  ctx.fill();

  const maxTravel = s * 0.045;
  function pupilOf(eyeLocalX: number, eyeLocalY: number) {
    const ex = eyeLocalX * s;
    const ey = eyeLocalY * s;
    if (!mouse) return { px: ex, py: ey };
    const cos = Math.cos(-angle);
    const sin = Math.sin(-angle);
    const dx = mouse.x - x;
    const dy = mouse.y - y;
    const lx = dx * cos - dy * sin;
    const ly = dx * sin + dy * cos;
    const vx = lx - ex;
    const vy = ly - ey;
    const dist = Math.hypot(vx, vy);
    if (dist === 0) return { px: ex, py: ey };
    const travel = Math.min(dist * 0.08, maxTravel);
    return { px: ex + (vx / dist) * travel, py: ey + (vy / dist) * travel };
  }

  const lp = pupilOf(-0.15, -0.2);
  const rp = pupilOf(0.15, -0.2);

  ctx.fillStyle = "#0f0f1a";
  ctx.beginPath();
  ctx.ellipse(lp.px, lp.py, s * 0.09, s * 0.13, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(rp.px, rp.py, s * 0.09, s * 0.13, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default function GhostHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lock scroll for the duration this page is mounted
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // Broad touch detection — matchMedia alone can misfire on some devices
    const isMobile =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 1;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ghostX = mouseX;
    let ghostY = mouseY;
    let prevGhostX = ghostX;
    let bobT = 0;
    let statBobT = Math.PI;
    let tilt = 0;
    const trail: Array<{ x: number; y: number }> = [];

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    if (!isMobile) {
      window.addEventListener("mousemove", onMouseMove);
    }

    let raf: number;
    const tick = () => {
      statBobT += BOB_SPEED * 0.7;

      // Text sits at ~45% height (shifted up by the paddingBottom on the flex
      // container). Ghost is placed 180px below that centre — clear of the text.
      const textCentreY = canvas.height * 0.45;
      const statX = canvas.width / 2;
      const statY = textCentreY + 180 + Math.sin(statBobT) * 7;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const eyeTarget = isMobile
        ? {
            x: canvas.width / 2 + Math.sin(statBobT * 0.5) * 110,
            y: canvas.height / 2 + Math.cos(statBobT * 0.37) * 80,
          }
        : { x: mouseX, y: mouseY };

      // Stationary ghost — always drawn regardless of device
      drawGhost(ctx, statX, statY, 1.8, 0.88, 0, eyeTarget);

      // Cursor ghost + trail — desktop only
      if (!isMobile) {
        prevGhostX = ghostX;
        ghostX += (mouseX - ghostX) * LAG;
        ghostY += (mouseY - ghostY) * LAG;
        bobT += BOB_SPEED;
        const bob = Math.sin(bobT) * BOB_AMP;
        const vx = ghostX - prevGhostX;
        tilt += (vx * 0.04 - tilt) * 0.12;
        const drawY = ghostY + bob;
        trail.push({ x: ghostX, y: drawY });
        if (trail.length > TRAIL_LEN) trail.shift();

        trail.forEach((p, i) => {
          const t = (i + 1) / trail.length;
          drawGhost(ctx, p.x, p.y, 0.3 + t * 0.5, t * 0.25, tilt * t);
        });

        drawGhost(ctx, ghostX, drawY, 1, 1, tilt);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {/*
        Canvas is a sibling of <main>, not a child.
        iOS Safari clips position:fixed elements inside overflow:hidden — keeping
        the canvas outside avoids that bug entirely.
      */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
      <main
        className="ghost-bg"
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          cursor: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px 10vh",
            fontFamily: "sans-serif",
            color: "white",
            textAlign: "center",
            userSelect: "none",
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              opacity: 0.8,
              marginBottom: 16,
            }}
          >
            Ezra Cliff
          </span>
          <h1
            style={{
              fontSize: "clamp(32px, 6vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              margin: "0 0 12px",
            }}
          >
            coming soon
          </h1>
          <p style={{ fontSize: "clamp(13px, 2vw, 15px)", opacity: 0.65, margin: "0 0 6px" }}>
            not haunted — something is just materializing
          </p>
          <p style={{ fontSize: "clamp(12px, 1.8vw, 14px)", opacity: 0.4, margin: 0 }}>
            ezra left a ghost in charge
          </p>
        </div>
      </main>
    </>
  );
}
