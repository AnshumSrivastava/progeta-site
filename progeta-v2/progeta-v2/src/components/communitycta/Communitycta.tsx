"use client";

import { motion } from "framer-motion";

export default function CommunityCTA() {
  return (
    <section
      style={{
        padding: "150px 24px",
        textAlign: "center",
      }}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          fontSize: "4rem",
        }}
      >
        Join The Community
      </motion.h2>

      <p
        style={{
          color: "#A1A1AA",
          marginTop: "20px",
        }}
      >
        Build your future alongside people who are
        serious about growth.
      </p>
    </section>
  );
}