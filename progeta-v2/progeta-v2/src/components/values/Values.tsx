"use client";

import { motion } from "framer-motion";

const values = [
  {
    title: "Equality",
    color: "#F97316",
    text: "Everyone deserves access to growth and opportunity.",
  },
  {
    title: "Intention",
    color: "#3B82F6",
    text: "Every action should move you toward your purpose.",
  },
  {
    title: "Sovereignty",
    color: "#22C55E",
    text: "Own your future. Depend on yourself.",
  },
];

export default function Values() {
  return (
    <section
      style={{
        padding: "120px 24px",
        background: "#050505",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "3rem",
            marginBottom: "60px",
            textAlign: "center",
          }}
        >
          Our Values
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "24px",
          }}
        >
          {values.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                background: "#0B0B0B",
                border: "1px solid #222",
                padding: "32px",
                borderRadius: "24px",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "4px",
                  background: item.color,
                  marginBottom: "20px",
                }}
              />

              <h3
                style={{
                  color: item.color,
                  marginBottom: "12px",
                }}
              >
                {item.title}
              </h3>

              <p style={{ color: "#A1A1AA" }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}