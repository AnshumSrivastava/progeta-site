"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const reveal = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.97,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
};

const whoBelongs = [
  {
    number: "01",
    title: "Builders",
    text: "People obsessed with creating things instead of consuming them.",
  },
  {
    number: "02",
    title: "Operators",
    text: "People who execute consistently when nobody is watching.",
  },
  {
    number: "03",
    title: "Founders",
    text: "People building leverage, companies and opportunities.",
  },
  {
    number: "04",
    title: "Outliers",
    text: "People who never felt like they belonged in normal rooms.",
  },
];

const processSteps = [
  "Application",
  "Review",
  "Conversation",
  "Access",
];

export default function InnerCirclePage() {
  const router = useRouter();

  return (
    <main
      style={{
        background:
          "linear-gradient(180deg,#040404 0%,#07111D 50%,#040404 100%)",
        color: "#F8FAFC",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "fixed",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,158,11,.12), transparent 70%)",
          filter: "blur(120px)",
          top: "-250px",
          right: "-250px",
          pointerEvents: "none",
        }}
      />

      {/* HERO */}
      {/* NEW BATCHES CTA */}
<section
  style={{
    padding: "180px 20px",
    textAlign: "center",
    maxWidth: "1100px",
    margin: "0 auto",
  }}
>
  <motion.div
    variants={reveal}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
  >
    <p
      style={{
        color: "#F59E0B",
        letterSpacing: "4px",
        marginBottom: "20px",
        fontWeight: 700,
      }}
    >
      SUMMER 2026 COHORT
    </p>

    <h2
      style={{
        fontSize: "clamp(3rem,8vw,6rem)",
        lineHeight: 0.95,
        fontWeight: 900,
      }}
    >
      NEW BATCHES
      <br />
      ARE OPEN.
    </h2>

    <p
      style={{
        color: "#94A3B8",
        marginTop: "30px",
        lineHeight: 1.9,
        maxWidth: "700px",
        marginInline: "auto",
      }}
    >
      Learn AI, Cybersecurity, Development,
      Quantum Computing and emerging technologies
      alongside ambitious students building the future.
    </p>

    <button
      onClick={() =>
        router.push("/innercircle/batches")
      }
      style={{
        marginTop: "50px",
        background:
          "linear-gradient(135deg,#D97706,#F59E0B)",
        border: "none",
        color: "#fff",
        padding: "20px 38px",
        borderRadius: "999px",
        fontWeight: 700,
        fontSize: "1rem",
        cursor: "pointer",
        boxShadow:
          "0 20px 60px rgba(245,158,11,.25)",
      }}
    >
      Check Out The New Batch →
    </button>
  </motion.div>
</section>
      
      {/* MANIFESTO */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "160px 20px",
        }}
      >
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <p
            style={{
              color: "#F59E0B",
              letterSpacing: "4px",
              marginBottom: "20px",
            }}
          >
            MANIFESTO
          </p>

          <h2
            style={{
              fontSize: "clamp(2.5rem,7vw,5rem)",
              lineHeight: 1.05,
              fontWeight: 900,
            }}
          >
            You become the
            <br />
            people you spend
            <br />
            time with.
          </h2>

          <p
            style={{
              marginTop: "40px",
              maxWidth: "750px",
              color: "#94A3B8",
              lineHeight: 2,
            }}
          >
            InnerCircle exists to connect ambitious people with
            other ambitious people. Not through algorithms.
            Not through followers. Through proximity.
          </p>
        </motion.div>
      </section>

      {/* WHO BELONGS */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "140px 20px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2rem,6vw,4rem)",
            marginBottom: "80px",
          }}
        >
          Who Gets In
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "40px",
          }}
        >
          {whoBelongs.map((item) => (
            <motion.div
              key={item.title}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{
                paddingBottom: "30px",
                borderBottom:
                  "1px solid rgba(255,255,255,.08)",
              }}
            >
              <p
                style={{
                  color: "#F59E0B",
                  marginBottom: "16px",
                }}
              >
                {item.number}
              </p>

              <h3
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "14px",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: "#94A3B8",
                  lineHeight: 1.8,
                }}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section
        style={{
          padding: "160px 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2rem,6vw,4rem)",
            marginBottom: "80px",
          }}
        >
          The Process
        </h2>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "40px",
          }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div
                style={{
                  color: "#F59E0B",
                  fontSize: "3rem",
                  fontWeight: 900,
                  marginBottom: "20px",
                }}
              >
                0{index + 1}
              </div>

              <h3>{step}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHAT WE REJECT */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "140px 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2.5rem,7vw,5rem)",
            marginBottom: "50px",
          }}
        >
          What We Reject
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {[
            "Noise",
            "Vanity",
            "Excuses",
            "Wantrepreneurs",
          ].map((item) => (
            <div
              key={item}
              style={{
                border:
                  "1px solid rgba(255,255,255,.08)",
                padding: "14px 22px",
                borderRadius: "999px",
                color: "#CBD5E1",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section
        style={{
          padding: "200px 20px",
          textAlign: "center",
        }}
      >
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            fontSize: "clamp(3rem,10vw,8rem)",
            lineHeight: 1,
            fontWeight: 900,
          }}
        >
          The Room
          <br />
          Changes
          <br />
          Everything.
        </motion.h2>
      </section>
<section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 20px",
        }}
      >
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.9 }}
          style={{
            maxWidth: "1100px",
          }}
        >
          <p
            style={{
              color: "#F59E0B",
              letterSpacing: "5px",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: "30px",
            }}
          >
            Progeta // InnerCircle
          </p>

          <h1
            style={{
              fontSize: "clamp(4rem,12vw,10rem)",
              lineHeight: 0.9,
              fontWeight: 900,
              marginBottom: "30px",
            }}
          >
            THE
            <br />
            CIRCLE
          </h1>

          <p
            style={{
              color: "#94A3B8",
              fontSize: "clamp(1rem,2vw,1.3rem)",
              lineHeight: 1.9,
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Not everyone gets in.
            <br />
            And that's the point.
          </p>

          <button
            onClick={() =>
              router.push("/innercircle/apply")
            }
            style={{
              marginTop: "50px",
              background: "#D97706",
              border: "none",
              color: "#fff",
              padding: "18px 34px",
              borderRadius: "999px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Apply Now →
          </button>
        </motion.div>
      </section>


    </main>
  );
}
