"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ─── Eye configuration ────────────────────────────────────────────────────────
// These values are percentages of the image dimensions (0–100).
// Tweak them to align the pupils with YOUR monkey image.
// Left eye center:  ~38% from left, ~58% from top
// Right eye center: ~60% from left, ~60% from top
const EYES = {
  left:  { xPct: 38, yPct: 58, radiusPct: 4.5 },
  right: { xPct: 60, yPct: 60, radiusPct: 3.8 },
};

export default function MonkeyHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [smileAmt, setSmileAmt] = useState(0);

  // Pupil positions as percentages
  const [leftPupil,  setLeftPupil]  = useState({ x: EYES.left.xPct,  y: EYES.left.yPct  });
  const [rightPupil, setRightPupil] = useState({ x: EYES.right.xPct, y: EYES.right.yPct });

  // Smooth smile lerp
  useEffect(() => {
    const target = isHovered ? 1 : 0;
    let raf: number;
    let current = smileAmt;

    const tick = () => {
      current += (target - current) * 0.1;
      setSmileAmt(current);
      if (Math.abs(target - current) > 0.001) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isHovered]);

  // Eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();

      const movePupil = (eye: typeof EYES.left) => {
        // World coords of eye centre
        const eyeWorldX = rect.left + (eye.xPct / 100) * rect.width;
        const eyeWorldY = rect.top  + (eye.yPct / 100) * rect.height;

        const dx = e.clientX - eyeWorldX;
        const dy = e.clientY - eyeWorldY;
        const dist = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);

        // Max travel = radiusPct of image width, clamped by distance
        const maxTravel = (eye.radiusPct / 100) * rect.width;
        const travel = Math.min(dist / 8, maxTravel);

        return {
          x: eye.xPct + (Math.cos(angle) * travel / rect.width)  * 100,
          y: eye.yPct + (Math.sin(angle) * travel / rect.height) * 100,
        };
      };

      setLeftPupil(movePupil(EYES.left));
      setRightPupil(movePupil(EYES.right));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f0e8",
        fontFamily: "sans-serif",
      }}
    >
      {/* ── Monkey wrapper ── */}
      <div
        ref={wrapRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "relative",
          width: 320,
          height: 320,
          cursor: "pointer",
          transform: isHovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Neutral image — always visible */}
        <Image
          src="/monkey-neutral.png"
          alt="Monkey mascot"
          fill
          style={{ objectFit: "contain", userSelect: "none" }}
          priority
        />

        {/* Smile image — fades in on hover */}
        <Image
          src="/monkey-happy.png"
          alt="Monkey mascot smiling"
          fill
          style={{
            objectFit: "contain",
            userSelect: "none",
            opacity: smileAmt,
            transition: "none", // opacity driven by JS lerp above
          }}
        />

        {/* ── Invisible SVG eye overlay ── */}
        {/* This sits on top of both images and renders the moving pupils.        */}
        {/* The clipPaths keep pupils inside the eye whites.                      */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
            pointerEvents: "none",
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Clip pupils to stay within eye white area */}
            <clipPath id="clipLeft">
              <ellipse
                cx={EYES.left.xPct}
                cy={EYES.left.yPct}
                rx={EYES.left.radiusPct}
                ry={EYES.left.radiusPct * 1.15}
              />
            </clipPath>
            <clipPath id="clipRight">
              <ellipse
                cx={EYES.right.xPct}
                cy={EYES.right.yPct}
                rx={EYES.right.radiusPct}
                ry={EYES.right.radiusPct * 1.15}
              />
            </clipPath>
          </defs>

          {/* Left pupil */}
          <g clipPath="url(#clipLeft)">
            <circle cx={leftPupil.x} cy={leftPupil.y} r={2.8} fill="#1a0800" />
            <circle
              cx={leftPupil.x + 0.9}
              cy={leftPupil.y - 0.9}
              r={0.9}
              fill="white"
              opacity={0.65}
            />
          </g>

          {/* Right pupil */}
          <g clipPath="url(#clipRight)">
            <circle cx={rightPupil.x} cy={rightPupil.y} r={2.4} fill="#1a0800" />
            <circle
              cx={rightPupil.x + 0.8}
              cy={rightPupil.y - 0.8}
              r={0.8}
              fill="white"
              opacity={0.65}
            />
          </g>
        </svg>
      </div>

      {/* ── Text ── */}
      <div style={{ marginTop: 32, textAlign: "center" }}>
        <h1
          style={{
            fontSize: 36,
            fontWeight: 500,
            color: "#2c2018",
            margin: "0 0 10px",
            letterSpacing: "-0.02em",
          }}
        >
          coming soon
        </h1>
        <p style={{ fontSize: 15, color: "#8a7060", margin: 0 }}>
          {isHovered ? "oh hey, you found me!" : "something cool is on its way"}
        </p>
      </div>
    </main>
  );
}
