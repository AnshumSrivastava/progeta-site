"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const initiatives = [
  {
    title: "LaunchPad",
    color: "#F97316",
    text: "Career and industry focused learning.",
    route: "/launchpad",
  },
  {
    title: "SelfOS",
    color: "#3B82F6",
    text: "Build systems for your life and goals.",
    route: "/selfos",
  },
  {
    title: "InnerCircle",
    color: "#22C55E",
    text: "Network with ambitious people.",
    route: "/innercircle",
  },
];

export default function Initiatives() {
  const router = useRouter();

  return (
    <section
      style={{
        padding: "120px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {initiatives.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{
              x: 15,
            }}
            onClick={() =>
              router.push(item.route)
            }
            style={{
              borderBottom: "1px solid #222",
              padding: "50px 0",
              cursor: "pointer",
              transition: "all .3s ease",
            }}
          >
            <h2
              style={{
                color: item.color,
                fontSize: "2rem",
                marginBottom: "10px",
              }}
            >
              {item.title} →
            </h2>

            <p
              style={{
                color: "#A1A1AA",
                marginTop: "10px",
              }}
            >
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}