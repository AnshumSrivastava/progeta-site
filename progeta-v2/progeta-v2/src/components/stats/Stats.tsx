"use client";

import { motion } from "framer-motion";

export default function Stats() {
  return (
    <section
      style={{
        padding: "120px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "24px",
        }}
      >
        {[
          "500+ Members",
          "3 Core Programs",
          "100+ Projects",
          "1 Community",
        ].map((stat) => (
          <motion.div
            key={stat}
            whileHover={{ y: -8 }}
            style={{
              background: "#0B0B0B",
              border: "1px solid #222",
              borderRadius: "24px",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <h3>{stat}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}