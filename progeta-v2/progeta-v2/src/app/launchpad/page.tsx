"use client";

import { motion } from "framer-motion";

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

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  show: {
    opacity: 1,
    x: 0,
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  show: {
    opacity: 1,
    x: 0,
  },
};

const tracks = [
  {
    title: "Cybersecurity",
    color: "#F97316",
    items: [
      "Ethical Hacking",
      "SOC Analysis",
      "Cloud Security",
      "Network Defense",
    ],
  },
  {
    title: "AI Engineering",
    color: "#3B82F6",
    items: [
      "Prompt Engineering",
      "LLMs",
      "AI Agents",
      "Automation",
    ],
  },
  {
    title: "Full Stack",
    color: "#8B5CF6",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "Databases",
    ],
  },
];

const projects = [
  "AI SaaS Product",
  "Cyber Security Audit",
  "Startup Website",
  "Automation Dashboard",
];

const roadmap = [
  "Foundation",
  "Projects",
  "Specialisation",
  "Portfolio",
  "Interview Prep",
  "Career Launch",
];

export default function LaunchPadPage() {
  return (
    <main
      style={{
        background: "#050505",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      
      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "120px 24px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: "1000px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#F97316",
              letterSpacing: "3px",
              marginBottom: "20px",
            }}
          >
            PROGETA // LAUNCHPAD
          </p>

          <h1
            style={{
              fontSize: "clamp(3rem,8vw,6rem)",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            Stop Collecting
            <br />
            Certificates.
            <br />
            Start Building
            <span style={{ color: "#F97316" }}>
              {" "}
              Capability.
            </span>
          </h1>

          <p
            style={{
              marginTop: "30px",
              color: "#A1A1AA",
              fontSize: "1.2rem",
              maxWidth: "700px",
              marginInline: "auto",
            }}
          >
            Industry projects. Mentorship. Execution.
            Everything required to become dangerously
            employable.
          </p>
        </motion.div>
      </section>

      {/* TRACKS */}
      <section
        style={{
          padding: "120px 24px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "3rem",
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          Specialisation Tracks
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "24px",
          }}
        >
          {tracks.map((track) => (
            <motion.div
              key={track.title}
              whileHover={{
                y: -10,
              }}
              style={{
                background: "#0B0B0B",
                border: "1px solid #222",
                borderRadius: "24px",
                padding: "32px",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "4px",
                  background: track.color,
                  marginBottom: "20px",
                }}
              />

              <h3
                style={{
                  color: track.color,
                  marginBottom: "20px",
                }}
              >
                {track.title}
              </h3>

              {track.items.map((item) => (
                <p
                  key={item}
                  style={{
                    color: "#A1A1AA",
                    marginBottom: "12px",
                  }}
                >
                  • {item}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section
        style={{
          padding: "120px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "3rem",
            marginBottom: "80px",
          }}
        >
          How It Works
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          {[
            "Learn",
            "Build",
            "Ship",
            "Get Hired",
          ].map((step, index) => (
            <motion.div
              key={step}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              initial={{
                opacity: 0,
                y: 40,
              }}
              viewport={{ once: true }}
            >
              <h3
                style={{
                  color: "#F97316",
                }}
              >
                0{index + 1}
              </h3>

              <h2>{step}</h2>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section
        style={{
          padding: "120px 24px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "3rem",
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          Real Projects
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "24px",
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project}
              whileHover={{
                scale: 1.03,
              }}
              style={{
                background: "#0B0B0B",
                border: "1px solid #222",
                borderRadius: "24px",
                padding: "50px 30px",
              }}
            >
              <h3>{project}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ROADMAP */}
      <section
        style={{
          padding: "120px 24px",
        }}
      >
        <h2
          style={{
            fontSize: "3rem",
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          6 Month Roadmap
        </h2>

        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
            paddingBottom: "20px",
          }}
        >
          {roadmap.map((month, index) => (
            <div
              key={month}
              style={{
                minWidth: "220px",
                background: "#0B0B0B",
                border: "1px solid #222",
                borderRadius: "20px",
                padding: "24px",
              }}
            >
              <p
                style={{
                  color: "#F97316",
                }}
              >
                Month {index + 1}
              </p>

              <h3>{month}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section
        style={{
          padding: "120px 24px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "24px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {[
            "500+ Members",
            "100+ Projects",
            "20+ Mentors",
            "3 Tracks",
          ].map((stat) => (
            <div
              key={stat}
              style={{
                background: "#0B0B0B",
                border: "1px solid #222",
                borderRadius: "20px",
                padding: "40px",
                textAlign: "center",
              }}
            >
              <h3>{stat}</h3>
            </div>
          ))}
        </div>
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
            fontSize: "clamp(3rem,7vw,5rem)",
            fontWeight: 900,
          }}
        >
          Ready To Launch?
        </h2>

        <p
          style={{
            color: "#A1A1AA",
            marginTop: "20px",
            fontSize: "1.2rem",
          }}
        >
          Most people consume.
          <br />
          A few build.
          <br />
          Join the few.
        </p>

        <button
          style={{
            marginTop: "40px",
            background: "#F97316",
            border: "none",
            color: "#fff",
            padding: "16px 40px",
            borderRadius: "999px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Apply For LaunchPad
        </button>
      </section>
    </main>
  );
}