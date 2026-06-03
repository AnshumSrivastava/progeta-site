"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        background:
          "radial-gradient(circle at center,#101633 0%,#050505 70%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          maxWidth: "900px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#8B5CF6",
            letterSpacing: "3px",
            marginBottom: "20px",
          }}
        >
          PROGETA COMMUNITY
        </p>

        <h1
          style={{
            fontSize: "clamp(3rem,8vw,6rem)",
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          Build The Life
          <br />
          You Actually Want.
        </h1>

        <p
          style={{
            color: "#9CA3AF",
            marginTop: "24px",
            fontSize: "1.2rem",
            maxWidth: "700px",
            marginInline: "auto",
          }}
        >
          Learn. Build. Connect. Launch your future with
          LaunchPad, SelfOS and InnerCircle.
        </p>
      </motion.div>
    </section>
  );
}