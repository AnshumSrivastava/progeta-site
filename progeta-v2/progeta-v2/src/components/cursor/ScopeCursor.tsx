"use client";

import { useEffect, useState } from "react";

export default function ScopeCursor() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener(
        "mousemove",
        move
      );
      window.removeEventListener(
        "mousedown",
        down
      );
      window.removeEventListener(
        "mouseup",
        up
      );
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: clicked ? 40 : 50,
        height: clicked ? 40 : 50,
        transform:
          "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 999999,
        transition:
          "width .15s ease,height .15s ease",
      }}
    >
      {/* Circle */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border:
            "2px solid rgba(255,0,0,.8)",
          borderRadius: "50%",
          boxShadow:
            "0 0 15px rgba(255,0,0,.6)",
        }}
      />

      {/* Horizontal */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: -10,
          right: -10,
          height: 1,
          background:
            "rgba(255,0,0,.9)",
        }}
      />

      {/* Vertical */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: -10,
          bottom: -10,
          width: 1,
          background:
            "rgba(255,0,0,.9)",
        }}
      />

      {/* Center Dot */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#ff0000",
          transform:
            "translate(-50%, -50%)",
          boxShadow:
            "0 0 10px red",
        }}
      />
    </div>
  );
}