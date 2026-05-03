"use client";

import { useEffect, useRef, useState } from "react";

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
  mouse?: { x: number; y: number }
) {
  const s = 56 * scale;
  if (s <= 0) return;

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
  const [eyeCoords, setEyeCoords] = useState({ x: 0, y: 0 });
  const [isSpooked, setIsSpooked] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 1);

    if (isMobile) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let raf: number;
    let hasMouseMoved = false;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ghostX = mouseX;
    let ghostY = mouseY;
    let bobT = 0;
    let tilt = 0;
    const trail: Array<{ x: number; y: number }> = [];

    const handleMouseMove = (e: MouseEvent) => {
      hasMouseMoved = true;
      mouseX = e.clientX;
      mouseY = e.clientY;

      const cx = window.innerWidth / 2;
      const cy = window.innerHeight * 0.68;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      
      if (dist > 0) {
        const travel = Math.min(dist * 0.015, 5);
        setEyeCoords({
          x: (dx / dist) * travel,
          y: (dy / dist) * travel,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const tick = () => {
      const parent = canvas.parentElement;
      if (parent) {
        if (canvas.width !== parent.clientWidth || canvas.height !== parent.clientHeight) {
          canvas.width = parent.clientWidth;
          canvas.height = parent.clientHeight;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (hasMouseMoved) {
        const prevGhostX = ghostX;
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
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handlePokeGhost = (e: React.PointerEvent) => {
    e.stopPropagation(); // Prevent background clicks from firing
    if (isSpooked) return;
    setIsSpooked(true);
    setTimeout(() => setIsSpooked(false), 800);
  };

  return (
    <main
      className="ghost-bg"
      style={{
        position: "fixed",
        inset: 0,
        height: "100dvh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0083B0, #00B4DB, #005C97, #36D1DC, #0083B0)",
        backgroundSize: "400% 400%",
        animation: "bgShift 18s ease infinite",
      }}
    >
      <style>{`
        @keyframes bgShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        /* Updated: Removed the -50% translations here because the parent wrapper handles it now */
        @keyframes ghost-bob {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        @keyframes ghost-spook {
          0% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(255,255,255,0)); }
          15% { transform: scale(1.15) rotate(-8deg); filter: drop-shadow(0 0 15px rgba(255,255,255,0.8)); }
          30% { transform: scale(1.15) rotate(8deg); }
          45% { transform: scale(1.15) rotate(-8deg); }
          60% { transform: scale(1.15) rotate(8deg); }
          75% { transform: scale(1.15) rotate(-4deg); }
          100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 0px rgba(255,255,255,0)); }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* 
        1. THE HIT-BOX WRAPPER: 
        This div is now the target. It sits absolutely still and creates a massive padding 
        area so mobile users cannot miss it. 
      */}
      <div
        onPointerDown={handlePokeGhost}
        style={{
          position: "absolute",
          left: "50%",
          top: "68%",
          transform: "translate(-50%, -50%)",
          zIndex: 50, // Massive zIndex to ensure it sits on top of everything
          cursor: "pointer",
          touchAction: "manipulation", // Superior to "none", allows taps natively
          WebkitTapHighlightColor: "transparent",
          padding: "40px", // The invisible fat-finger buffer
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 2. THE BOBBING WRAPPER: Isolated animation fixes iOS transform bugs */}
        <div style={{ animation: "ghost-bob 3s ease-in-out infinite" }}>
          {/* 3. THE SVG: Stripped of interactivity, only handles visuals now */}
          <svg
            viewBox="-50 -70 100 130"
            style={{
              width: "clamp(120px, 26vh, 180px)",
              height: "auto",
              overflow: "visible",
              opacity: 0.88,
              animation: isSpooked ? "ghost-spook 0.8s ease" : "none",
              pointerEvents: "none", // Forces the browser to ignore the path and click the div wrapper
            }}
          >
            <path
              d="M -50 -20 A 50 50 0 0 1 50 -20 L 50 35 Q 33 55 17 35 Q 0 55 -17 35 Q -33 55 -50 35 Z"
              fill="rgba(255,255,255,0.95)"
            />
            <g
              style={{
                transform: `translate(${eyeCoords.x}px, ${eyeCoords.y}px)`,
                transition: "transform 0.1s ease-out", 
              }}
            >
              <ellipse cx="-15" cy="-20" rx={isSpooked ? 12 : 9} ry={isSpooked ? 17 : 13} fill="#0f0f1a" style={{ transition: "all 0.2s ease" }} />
              <ellipse cx="15" cy="-20" rx={isSpooked ? 12 : 9} ry={isSpooked ? 17 : 13} fill="#0f0f1a" style={{ transition: "all 0.2s ease" }} />
            </g>
          </svg>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "12vh",
          fontFamily: "sans-serif",
          color: "white",
          textAlign: "center",
          userSelect: "none",
          padding: "12vh 24px 0",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: 18,
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
            fontSize: "clamp(28px, 6vw, 52px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            margin: "0 0 12px",
          }}
        >
          coming soon
        </h1>
        <p style={{ fontSize: "clamp(15px, 2.5vw, 19px)", opacity: 0.65, margin: "0 0 6px" }}>
          not haunted - something&apos;s just materializing
        </p>
        <p style={{ fontSize: "clamp(14px, 2vw, 17px)", opacity: 0.4, margin: 0 }}>
          ezra left a ghost in charge
        </p>
      </div>
    </main>
  );
}