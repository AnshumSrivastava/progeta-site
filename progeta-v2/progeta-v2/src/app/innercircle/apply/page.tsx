 "use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";

const fadeIn = {
  initial: { opacity: 0, y: 20, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function ApplyPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.from("contact_messages").insert([
      {
        full_name: fullName,
        email,
        linkedin,
        message,
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setSuccess(true);
    setFullName("");
    setEmail("");
    setLinkedin("");
    setMessage("");
  };

  if (success) {
    return (
      <main style={successPage}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          style={successCard}
        >
          <div style={checkmark}>✓</div>

          <p style={eyebrow}>INNERCIRCLE</p>

          <h1 style={successTitle}>Application Submitted</h1>

          <p style={successText}>
            Thank you for applying.
            <br />
            Your application has entered review.
            <br />
            Expected review time: 3–7 business days.
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <motion.div
        {...fadeIn}
        transition={{ duration: 0.7 }}
        style={containerStyle}
      >
        <div style={{ marginBottom: "clamp(32px,5vw,56px)" }}>
          <p style={eyebrow}>PROGETA • INNERCIRCLE</p>

          <h1 style={heroTitle}>Membership Application</h1>

          <p style={heroText}>
            Every application is reviewed manually. We value initiative,
            execution, ambition, and long‑term thinking over traditional
            credentials.
          </p>
        </div>

        <motion.div
          {...fadeIn}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={cardStyle}
        >
          <div style={{ marginBottom: 36 }}>
            <div style={progressHeader}>
              <span>Application Progress</span>
              <span>Step 1 of 1</span>
            </div>

            <div style={progressTrack}>
              <div style={progressFill} />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <Field label="Full Name">
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
                style={inputStyle}
              />
            </Field>

            <Field label="Email Address">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={inputStyle}
              />
            </Field>

            <Field label="LinkedIn / Portfolio">
              <input
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://"
                style={inputStyle}
              />
            </Field>

            <Field label="Personal Statement">
              <textarea
                rows={8}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about yourself, what you are building, and why you want to join InnerCircle."
                required
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: 160,
                }}
              />
            </Field>

            <div style={reviewCard}>
              <h3 style={{ margin: 0, marginBottom: 14 }}>
                Review Process
              </h3>

              <div style={reviewText}>
                ✓ Application Submitted
                <br />
                ✓ Manual Review
                <br />
                ✓ Interview (if selected)
                <br />
                ✓ Membership Decision
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>

          <p style={footerText}>
            Average review time: 3–7 business days
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  paddingTop: "128px",
  paddingLeft: "clamp(20px,4vw,64px)",
  paddingRight: "clamp(20px,4vw,64px)",
  paddingBottom: "64px",
  background: "#08090B",
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
  backgroundSize: "80px 80px",
  color: "#fff",
} as const;
const containerStyle = {
  width: "100%",
  maxWidth: "920px",
  margin: "0 auto",
} as const;

const cardStyle = {
  background: "#101114",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "28px",
  padding: "clamp(24px,4vw,48px)",
  boxShadow: "0 25px 80px rgba(0,0,0,.45)",
} as const;

const heroTitle = {
  fontSize: "clamp(2.25rem,8vw,5rem)",
  fontWeight: 900,
  lineHeight: 1,
  marginBottom: 16,
} as const;

const heroText = {
  color: "#94A3B8",
  lineHeight: 1.8,
  maxWidth: "650px",
} as const;

const eyebrow = {
  color: "#D97706",
  letterSpacing: "3px",
  fontWeight: 700,
  fontSize: ".85rem",
  marginBottom: 12,
} as const;

const progressHeader = {
  display: "flex",
  justifyContent: "space-between",
  color: "#94A3B8",
  fontSize: ".9rem",
  marginBottom: 12,
} as const;

const progressTrack = {
  height: 6,
  borderRadius: 999,
  background: "#1E293B",
  overflow: "hidden",
} as const;

const progressFill = {
  width: "100%",
  height: "100%",
  background: "linear-gradient(90deg,#D97706,#F59E0B)",
} as const;

const inputStyle = {
  width: "100%",
  background: "#0B0D10",
  border: "1px solid #23272F",
  borderRadius: "14px",
  padding: "16px 18px",
  color: "#fff",
  fontSize: "1rem",
  outline: "none",
  boxSizing: "border-box" as const,
} as const;

const labelStyle = {
  display: "block",
  marginBottom: 10,
  fontWeight: 600,
  color: "#E2E8F0",
} as const;

const reviewCard = {
  background: "#0B0D10",
  border: "1px solid rgba(255,255,255,.06)",
  borderRadius: "18px",
  padding: 22,
} as const;

const reviewText = {
  color: "#CBD5E1",
  lineHeight: 2,
} as const;

const buttonStyle = {
  width: "100%",
  height: 58,
  border: "none",
  borderRadius: 14,
  color: "#fff",
  fontWeight: 700,
  fontSize: "1rem",
  cursor: "pointer",
  background: "linear-gradient(135deg,#D97706,#F59E0B)",
} as const;

const footerText = {
  marginTop: 24,
  textAlign: "center" as const,
  color: "#64748B",
  fontSize: ".9rem",
};

const successPage = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "24px",

  backgroundColor: "#08090B",

  color: "#fff",
} as const;

const successCard = {
  width: "100%",
  maxWidth: "700px",
  background: "#101114",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "28px",
  padding: "clamp(24px,5vw,56px)",
  textAlign: "center" as const,
};

const checkmark = {
  fontSize: "4rem",
  marginBottom: 12,
};

const successTitle = {
  fontSize: "clamp(2rem,7vw,4rem)",
  fontWeight: 900,
  marginBottom: 18,
} as const;

const successText = {
  color: "#94A3B8",
  lineHeight: 1.9,
} as const;
