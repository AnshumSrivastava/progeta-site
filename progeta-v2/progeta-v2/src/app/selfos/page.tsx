"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function SelfOSPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [why, setWhy] = useState("");

 async function joinWaitlist() {
  if (!name || !email) {
    toast.error("Missing Information", {
      description: "Please fill in your name and email.",
    });
    return;
  }

  const { error } = await supabase
    .from("selfos_waitlist")
    .insert([
      {
        name,
        email,
        goal,
        why,
      },
    ]);

  if (error) {
    console.log("FULL ERROR:", error);
    console.log("MESSAGE:", error?.message);
    console.log("DETAILS:", error?.details);
    console.log("HINT:", error?.hint);
    console.log("CODE:", error?.code);

    if (
      error.message?.includes("selfos_waitlist_email_key") ||
      error.message?.includes("duplicate key")
    ) {
      toast.warning("Already Registered", {
        description:
          "This email is already on the SelfOS waitlist.",
      });
      return;
    }

    toast.error("Database Error", {
      description:
        error.message || "Something went wrong.",
    });

    return;
  }

  toast.success("Welcome to SelfOS 🚀", {
    description:
      "Your spot on the waitlist has been secured.",
  });

  setName("");
  setEmail("");
  setGoal("");
  setWhy("");
}
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000000",
        color: "#FFFFFF",
        overflow: "hidden",
       display: "flex",
flexWrap: "wrap",
alignItems: "center",
justifyContent: "center",
padding: "120px 24px",
gap: "40px",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Left Content */}
      <motion.div
        initial={{
          opacity: 0,
          x: -100,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        style={{
  flex: "1 1 500px",
  maxWidth: "600px",
  padding: "2rem",
  minWidth: "300px",
}}
      >
        <div
          style={{
            color: "#F59E0B",
            marginBottom: "1rem",
            letterSpacing: "3px",
            fontWeight: 700,
          }}
        >
          SELFOS
        </div>

        <h1
          style={{
            fontSize: "clamp(3rem,8vw,5rem)",
            lineHeight: 1,
            fontWeight: 900,
            marginBottom: "1rem",
          }}
        >
          Upgrade
          <br />
          Yourself.
        </h1>

        <p
          style={{
            color: "#B3B3B3",
            fontSize: "1.2rem",
            lineHeight: 1.7,
          }}
        >
          Build habits. Track growth.
          Learn faster.
          Become the person you want to be.
        </p>
      </motion.div>

      {/* Sliding Form */}
      <motion.div
        initial={{
          opacity: 0,
          x: 300,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 1,
          delay: 0.2,
        }}
        style={{
          width: "500px",
          marginRight: "5rem",
          background: "#0A0A0A",
          border: "1px solid #242424",
          borderRadius: "24px",
          padding: "2rem",
          backdropFilter: "blur(20px)",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "1.5rem",
          }}
        >
          Join Waitlist
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={inputStyle}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={inputStyle}
          />

          <input
            placeholder="Biggest Goal"
            value={goal}
            onChange={(e) =>
              setGoal(e.target.value)
            }
            style={inputStyle}
          />

          <textarea
            placeholder="Why SelfOS?"
            value={why}
            onChange={(e) =>
              setWhy(e.target.value)
            }
            style={{
              ...inputStyle,
              minHeight: "140px",
            }}
          />

          <button
            onClick={joinWaitlist}
            style={{
              background: "#F59E0B",
              color: "#000",
              border: "none",
              padding: "1rem",
              borderRadius: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            JOIN WAITLIST
          </button>
        </div>
      </motion.div>
    </main>
  );
}

const inputStyle = {
  background: "#111111",
  border: "1px solid #242424",
  borderRadius: "12px",
  padding: "1rem",
  color: "#FFFFFF",
  fontSize: "1rem",
  outline: "none",
} as const;