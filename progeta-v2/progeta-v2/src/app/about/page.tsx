"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

export default function AboutPage() {
  const router = useRouter();

  return (
    <main
      style={{
        background: "#050505",
        color: "#FFFFFF",
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "fixed",
          width: "900px",
          height: "900px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,.15), transparent 70%)",
          filter: "blur(150px)",
          top: "-300px",
          left: "-250px",
          pointerEvents: "none",
        }}
      />

      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px",
          textAlign: "center",
        }}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: "1000px",
          }}
        >
          <p
            style={{
              color: "#3B82F6",
              letterSpacing: "4px",
              marginBottom: "20px",
              fontWeight: 700,
            }}
          >
            ABOUT PROGETA
          </p>

          <h1
            style={{
              fontSize: "clamp(3rem,8vw,7rem)",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            Build A Better
            <br />
            Future.
          </h1>

          <p
            style={{
              marginTop: "30px",
              color: "#A1A1AA",
              fontSize: "1.2rem",
              lineHeight: 1.8,
              maxWidth: "700px",
              marginInline: "auto",
            }}
          >
            Progeta exists to help ambitious
            individuals become builders,
            creators and leaders through
            learning, execution and community.
          </p>
        </motion.div>
      </section>

      {/* MISSION */}
      <section
        style={{
          padding: "140px 24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <p
            style={{
              color: "#3B82F6",
              letterSpacing: "3px",
              marginBottom: "20px",
            }}
          >
            OUR MISSION
          </p>

          <h2
            style={{
              fontSize: "clamp(2.5rem,6vw,5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            Education Should
            <br />
            Create Capability.
          </h2>

          <p
            style={{
              marginTop: "30px",
              color: "#A1A1AA",
              lineHeight: 1.8,
              maxWidth: "700px",
            }}
          >
            Too many people spend years
            collecting information but never
            develop the skills needed to
            create real impact.
            <br />
            <br />
            Progeta focuses on execution,
            projects, accountability and
            community.
          </p>
        </motion.div>
      </section>

      {/* VALUES */}
      <section
        style={{
          padding: "120px 24px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "3rem",
            marginBottom: "60px",
          }}
        >
          Core Values
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "24px",
          }}
        >
          {[
            {
              title: "Execution",
              text: "Ideas mean nothing without action.",
            },
            {
              title: "Ownership",
              text: "Take responsibility for your future.",
            },
            {
              title: "Growth",
              text: "Continuous improvement compounds.",
            },
            {
              title: "Community",
              text: "Great people accelerate growth.",
            },
          ].map((value) => (
            <motion.div
              key={value.title}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              style={{
                background: "#0B0B0B",
                border: "1px solid #222",
                borderRadius: "24px",
                padding: "32px",
              }}
            >
              <h3
                style={{
                  color: "#3B82F6",
                }}
              >
                {value.title}
              </h3>

              <p
                style={{
                  marginTop: "12px",
                  color: "#A1A1AA",
                }}
              >
                {value.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section
        style={{
          padding: "140px 24px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "3rem",
            marginBottom: "60px",
          }}
        >
          The Progeta Ecosystem
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "24px",
          }}
        >
          {[
  {
    title: "LaunchPad",
    color: "#F97316",
    text: "Career acceleration and skill building.",
    route: "/launchpad",
  },
  {
    title: "InnerCircle",
    color: "#8B5CF6",
    text: "Curated network of ambitious people.",
    route: "/innercircle",
  },
  {
    title: "SelfOS",
    color: "#22C55E",
    text: "Systems for personal growth and productivity.",
    route: "/selfos",
  },
].map((item) => (
            <motion.div
  key={item.title}
  onClick={() =>
    router.push(item.route)
  }
  whileHover={{
    y: -10,
    scale: 1.03,
  }}
  whileTap={{
    scale: 0.98,
  }}
  style={{
    background: "#0B0B0B",
    border: "1px solid #222",
    borderRadius: "24px",
    padding: "32px",
    cursor: "pointer",
    transition: "all .3s ease",
  }}
>
            
              <h3
  style={{
    color: item.color,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  {item.title} →
</h3>

              <p
                style={{
                  marginTop: "15px",
                  color: "#A1A1AA",
                }}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section
        style={{
          padding: "180px 24px",
          textAlign: "center",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            fontSize:
              "clamp(3rem,7vw,6rem)",
            fontWeight: 900,
            lineHeight: 1.1,
          }}
        >
          Learn.
          <br />
          Build.
          <br />
          Become.
        </motion.h2>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "160px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize:
              "clamp(3rem,7vw,5rem)",
            fontWeight: 900,
          }}
        >
          The Journey Starts
          <br />
          With A Decision.
        </h2>

        <p
          style={{
            color: "#A1A1AA",
            marginTop: "20px",
            fontSize: "1.1rem",
          }}
        >
          Build your future with Progeta.
        </p>

        <button
          style={{
            marginTop: "40px",
            background: "#3B82F6",
            border: "none",
            color: "#fff",
            padding: "18px 42px",
            borderRadius: "999px",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow:
              "0 0 35px rgba(59,130,246,.35)",
          }}
        >
          Explore Progeta →
        </button>
      </section>
    </main>
  );
}