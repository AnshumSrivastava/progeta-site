"use client";

import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section
      style={{
        padding: "140px 24px",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "4rem",
            marginBottom: "30px",
          }}
        >
          Build With Intention.
        </h2>

        <p
          style={{
            color: "#A1A1AA",
            lineHeight: 1.8,
          }}
        >
          Great things are built by people who show
          up every day. Knowledge without execution
          is noise. Privacy matters. Ownership matters.
        </p>
      </motion.div>
    </section>
  );
}