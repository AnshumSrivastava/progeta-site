"use client";

import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function BatchesPage() {
  const tracks = [
    "Artificial Intelligence",
    "Cybersecurity",
    "Web Development",
    "App Development",
    "Programming",
    "Quantum Computing",
    "Project Development",
    "Emerging Technologies",
  ];

  const benefits = [
    "Interactive learning sessions",
    "Hands-on projects",
    "Industry-focused mentorship",
    "Networking opportunities",
    "Portfolio development",
    "Real-world exposure",
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#050608 0%,#0A1018 100%)",
        color: "#F8FAFC",
        paddingTop: "140px",
        paddingBottom: "100px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <motion.section
          variants={reveal}
          initial="hidden"
          animate="show"
        >
          <p style={{
            color:"#F59E0B",
            letterSpacing:"4px",
            fontWeight:700
          }}>
            SUMMER 2026 COHORT
          </p>

          <h1 style={{
            fontSize:"clamp(3.5rem,8vw,6.5rem)",
            fontWeight:900,
            lineHeight:1,
            marginTop:"20px"
          }}>
            Build The Future.
            <br/>
            Before It Arrives.
          </h1>

          <p style={{
            color:"#94A3B8",
            maxWidth:"800px",
            lineHeight:1.9,
            marginTop:"30px"
          }}>
            Join ambitious students learning AI,
            software development, cybersecurity,
            emerging technologies and real-world
            project building.
          </p>
        </motion.section>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once:true }}
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
            gap:"20px",
            marginTop:"80px"
          }}
        >
          {tracks.map((item)=>(
            <motion.div
              key={item}
              variants={reveal}
              whileHover={{ y:-6 }}
              style={{
                padding:"24px",
                borderRadius:"24px",
                background:"#101114",
                border:"1px solid rgba(255,255,255,.08)"
              }}
            >
              {item}
            </motion.div>
          ))}
        </motion.div>

        <div
          style={{
            marginTop:"100px",
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",
            gap:"24px"
          }}
        >
          <div style={{
            padding:"32px",
            borderRadius:"28px",
            background:"#101114"
          }}>
            <h2>What You'll Get</h2>
            {benefits.map((item)=>(
              <p key={item}>✓ {item}</p>
            ))}
          </div>

          <div style={{
            padding:"32px",
            borderRadius:"28px",
            background:"linear-gradient(135deg,#D97706,#F59E0B)",
            color:"#fff"
          }}>
            <h2>Why Join?</h2>
            <p>
              Most students consume.
              Few build.
              This batch is designed for builders.
            </p>
          </div>
        </div>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once:true }}
          style={{
            marginTop:"100px",
            padding:"40px",
            borderLeft:"4px solid #F59E0B",
            background:"rgba(245,158,11,.06)"
          }}
        >
          <p style={{
            fontSize:"1.2rem",
            lineHeight:2
          }}>
            A year from now these technologies
            won't be the future anymore.
            They'll be the standard.
          </p>
        </motion.div>

        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once:true }}
          style={{
            textAlign:"center",
            marginTop:"120px"
          }}
        >
          <h2 style={{
            fontSize:"clamp(2.5rem,5vw,4rem)",
            fontWeight:900
          }}>
            New Batches Are Open
          </h2>

          <p style={{
            color:"#94A3B8",
            marginTop:"20px"
          }}>
            Limited seats available.
          </p>

          <motion.a
            href="https://chat.whatsapp.com/HnFEjYDxZ57K3muqdmAXtf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale:1.04, y:-3 }}
            whileTap={{ scale:0.98 }}
            style={{
              display:"inline-block",
              marginTop:"40px",
              background:
                "linear-gradient(135deg,#22C55E,#16A34A)",
              color:"#fff",
              padding:"18px 34px",
              borderRadius:"999px",
              textDecoration:"none",
              fontWeight:700
            }}
          >
            Join Summer Batch WhatsApp →
          </motion.a>
        </motion.section>
      </div>
    </main>
  );
}
