"use client";

import { useEffect, useState } from "react";

export default function ScopeCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });

  useEffect(() => {
    setMounted(true);

    const move = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    const hoverCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      setHovering(
        !!(
          target.closest("a") ||
          target.closest("button")
        )
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", hoverCheck);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", hoverCheck);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  if (!mounted) return null;

  const size = clicked
    ? 18
    : hovering
    ? 44
    : 30;

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 999999,
      }}
    >
      {/* OUTER COSMIC MIST */}

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: size * 4.5,
          height: size * 4.5,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",

          background: `
            radial-gradient(
              circle,
              rgba(110,231,255,.18) 0%,
              rgba(56,189,248,.10) 35%,
              rgba(14,165,233,.05) 60%,
              transparent 100%
            )
          `,

          filter: "blur(22px)",
          mixBlendMode: "screen",
          transition: "all .18s ease",
        }}
      />

      {/* GHOST BODY */}

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: size * 2,
          height: size * 2,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",

          background: `
            radial-gradient(
              circle,
              rgba(220,250,255,.32) 0%,
              rgba(125,249,255,.22) 35%,
              rgba(14,165,233,.12) 70%,
              transparent 100%
            )
          `,

          filter: "blur(12px)",
          mixBlendMode: "screen",
          transition: "all .18s ease",
        }}
      />

      {/* ENERGY SPHERE */}

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: size,
          height: size,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",

          background: `
            radial-gradient(
              circle at 40% 35%,
              rgba(255,255,255,.95) 0%,
              rgba(220,250,255,.75) 12%,
              rgba(125,249,255,.45) 35%,
              rgba(56,189,248,.28) 60%,
              rgba(14,165,233,.12) 85%,
              transparent 100%
            )
          `,

          filter: "blur(4px)",

          boxShadow: hovering
            ? `
              0 0 20px rgba(125,249,255,.65),
              0 0 40px rgba(56,189,248,.45),
              0 0 80px rgba(14,165,233,.25)
            `
            : `
              0 0 14px rgba(125,249,255,.45),
              0 0 30px rgba(56,189,248,.25)
            `,

          transition: "all .18s ease",
        }}
      />

      {/* SOUL CORE */}

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",

          width: size * 0.28,
          height: size * 0.28,

          borderRadius: "50%",

          transform: "translate(-50%, -50%)",

          background: "#FFFFFF",

          boxShadow: `
            0 0 12px rgba(255,255,255,1),
            0 0 24px rgba(220,250,255,.95),
            0 0 50px rgba(125,249,255,.85)
          `,

          transition: "all .18s ease",
        }}
      />
    </div>
  );
}