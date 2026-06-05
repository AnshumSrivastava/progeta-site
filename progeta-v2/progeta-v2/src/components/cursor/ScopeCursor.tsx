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

  const ringSize = clicked
    ? 18
    : hovering
    ? 42
    : 26;

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
      {/* Outer ring */}

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          border: hovering
            ? "2px solid #ffffff"
            : "2px solid #00D4D4",
          transform:
            "translate(-50%, -50%)",
          transition: "all .15s ease",
          boxShadow: hovering
            ? "0 0 20px rgba(255,255,255,.35)"
            : "0 0 14px rgba(0,212,212,.45)",
        }}
      />

      {/* Precise center dot */}

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "#fff",
          transform:
            "translate(-50%, -50%)",
          boxShadow:
            "0 0 8px rgba(255,255,255,.8)",
        }}
      />
    </div>
  );
}