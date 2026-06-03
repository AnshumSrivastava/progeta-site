"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";

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


export default function InnerCirclePage() {
  const router = useRouter();
  const formRef = useRef<HTMLElement>(null);

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
            "radial-gradient(circle, rgba(139,92,246,.18), transparent 70%)",
          filter: "blur(150px)",
          top: "-300px",
          right: "-300px",
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
            zIndex: 2,
          }}
        >
          <p
            style={{
              color: "#8B5CF6",
              letterSpacing: "4px",
              marginBottom: "20px",
              fontWeight: 700,
            }}
          >
            PROGETA // INNERCIRCLE
          </p>

          <h1
            style={{
              fontSize: "clamp(3rem,8vw,7rem)",
              lineHeight: 1,
              fontWeight: 900,
            }}
          >
            THE
            <br />
            CIRCLE
          </h1>

          <p
            style={{
              color: "#A1A1AA",
              fontSize: "1.25rem",
              maxWidth: "700px",
              margin: "30px auto",
              lineHeight: 1.8,
            }}
          >
            Not everyone gets in.
            <br />
            And that's the point.
          </p>

         <button
  onClick={() =>
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
  style={{
    background: "#8B5CF6",
    color: "#FFFFFF",
    border: "none",
    padding: "16px 36px",
    borderRadius: "999px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow:
      "0 0 35px rgba(139,92,246,.3)",
  }}
>
  Apply For InnerCircle
</button>
        </motion.div>
      </section>

      {/* WHY */}
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
              color: "#8B5CF6",
              letterSpacing: "3px",
              marginBottom: "20px",
            }}
          >
            WHY INNERCIRCLE
          </p>

          <h2
            style={{
              fontSize: "clamp(2.5rem,6vw,5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            The internet gives
            <br />
            you information.
            <br />
            InnerCircle gives
            <br />
            you people.
          </h2>

          <p
            style={{
              marginTop: "30px",
              color: "#A1A1AA",
              maxWidth: "700px",
              lineHeight: 1.8,
            }}
          >
            A curated community of builders,
            operators, founders and ambitious
            students focused on execution.
          </p>
        </motion.div>
      </section>

      {/* WHO IS IT FOR */}
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
          Who Is It For?
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
              title: "Builders",
              text: "People actively creating projects.",
            },
            {
              title: "Founders",
              text: "People trying to build something meaningful.",
            },
            {
              title: "Operators",
              text: "People who care about execution.",
            },
            {
              title: "Learners",
              text: "People seeking ambitious peers.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
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
                  color: "#8B5CF6",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: "#A1A1AA",
                  marginTop: "12px",
                }}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* APPLICATION PROCESS */}
      <section
        style={{
          padding: "140px 24px",
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
            "Apply",
            "Review",
            "Interview",
            "Join",
          ].map((step, index) => (
            <motion.div
              key={step}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
              }}
            >
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  border:
                    "2px solid #8B5CF6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow:
                    "0 0 25px rgba(139,92,246,.25)",
                }}
              >
                0{index + 1}
              </div>

              <h3>{step}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
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
          What You Get
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "24px",
          }}
        >
          {[
            "Private Community",
            "Mentorship",
            "Founder Sessions",
            "Peer Accountability",
            "Opportunities",
            "Network",
          ].map((item) => (
            <motion.div
              key={item}
              whileHover={{
                y: -8,
              }}
              style={{
                background: "#0B0B0B",
                border: "1px solid #222",
                borderRadius: "20px",
                padding: "32px",
                textAlign: "center",
              }}
            >
              {item}
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
          Your Environment
          <br />
          Shapes Your Future.
          <br />
          Choose Wisely.
        </motion.h2>
      </section>

     {/* CONTACT FORM */}
<section
  ref={formRef}
  style={{
    padding: "160px 24px",
    maxWidth: "900px",
    margin: "0 auto",
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: "clamp(3rem,7vw,5rem)",
      fontWeight: 900,
    }}
  >
    Let's Build
    <br />
    Something Bigger.
  </h2>

  <p
    style={{
      textAlign: "center",
      color: "#A1A1AA",
      marginTop: "20px",
      marginBottom: "60px",
    }}
  >
    Interested in Progeta? Send us a message.
  </p>

  <form
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      background: "#0B0B0B",
      border: "1px solid #222",
      borderRadius: "24px",
      padding: "32px",
    }}
  >
    <input
      placeholder="Full Name"
      style={inputStyle}
    />

    <input
      placeholder="Email Address"
      style={inputStyle}
    />

    <input
      placeholder="LinkedIn (Optional)"
      style={inputStyle}
    />

    <textarea
      placeholder="Tell us about yourself..."
      rows={6}
      style={{
        ...inputStyle,
        resize: "vertical",
      }}
    />

   <button
  type="submit"
  style={{
    width: "100%",
    background:
      "linear-gradient(135deg, #3B82F6, #2563EB)",
    border: "none",
    color: "#FFFFFF",
    padding: "18px",
    borderRadius: "14px",
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "10px",
    transition: "all 0.3s ease",
    boxShadow:
      "0 0 35px rgba(59,130,246,.35)",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-2px)";
    e.currentTarget.style.boxShadow =
      "0 0 45px rgba(59,130,246,.5)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 0 35px rgba(59,130,246,.35)";
  }}
>
  Apply To Progeta →
</button>
  </form>
</section>
      
    </main>
  );
}
const inputStyle = {
  width: "100%",
  background: "#111111",
  border: "1px solid #242424",
  borderRadius: "12px",
  padding: "16px",
  color: "#FFFFFF",
  fontSize: "1rem",
  outline: "none",
} as const;