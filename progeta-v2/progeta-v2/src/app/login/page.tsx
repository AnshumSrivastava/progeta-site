"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  async function login() {
    if (!email || !password) {
      toast.error("Missing Information", {
        description:
          "Please enter your email and password.",
      });
      return;
    }

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      toast.error("Login Failed", {
        description: error.message,
      });
      return;
    }

    toast.success("Welcome Back 🚀", {
      description:
        "Redirecting to your dashboard.",
    });

    router.push("/dashboard");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4rem",
        flexWrap: "wrap",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
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
            "radial-gradient(circle, rgba(0,212,170,.15) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          flex: 1,
          minWidth: "320px",
          maxWidth: "650px",
          padding: "2rem",
          zIndex: 2,
        }}
      >
        <div
          style={{
            color: "#00D4AA",
            letterSpacing: "3px",
            fontWeight: 700,
            marginBottom: "1rem",
          }}
        >
          PROGETA ACCESS
        </div>

        <h1
          style={{
            fontSize: "clamp(3rem, 8vw, 5rem)",
            lineHeight: 1,
            fontWeight: 900,
            marginBottom: "1rem",
          }}
        >
          Welcome
          <br />
          Back.
        </h1>

        <p
          style={{
            color: "#B3B3B3",
            fontSize: "1.15rem",
            lineHeight: 1.7,
            maxWidth: "550px",
          }}
        >
          Access your dashboard,
          applications, learning journey
          and community.
        </p>
      </motion.div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
          delay: 0.2,
        }}
        style={{
          width: "100%",
          maxWidth: "520px",
          minWidth: "320px",

          background: "#0A0A0A",
          border: "1px solid #242424",
          borderRadius: "24px",

          padding: "2rem",

          backdropFilter: "blur(20px)",
          flexShrink: 0,
          zIndex: 2,
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "1.5rem",
            fontWeight: 700,
          }}
        >
          Login
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <input
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={inputStyle}
          />

          {/* Password */}
          <div
            style={{
              position: "relative",
              width: "100%",
            }}
          >
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              style={{
                ...inputStyle,
                paddingRight: "90px",
              }}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              style={eyeButton}
            >
              {showPassword
                ? "Hide"
                : "Show"}
            </button>
          </div>

          <button
            onClick={login}
            style={{
              background: "#00D4AA",
              color: "#000",
              border: "none",
              padding: "1rem",
              borderRadius: "12px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            LOGIN
          </button>

          <button
            onClick={() =>
              router.push("/signup")
            }
            style={{
              background: "transparent",
              border:
                "1px solid #242424",
              color: "#B3B3B3",
              padding: "1rem",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            Need an account? Sign Up
          </button>
        </div>
      </motion.div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,

  background: "#111111",
  border: "1px solid #242424",
  borderRadius: "12px",

  padding: "1rem",

  color: "#FFFFFF",
  fontSize: "1rem",

  outline: "none",
};

const eyeButton = {
  position: "absolute" as const,
  right: "18px",
  top: "50%",
  transform: "translateY(-50%)",

  background: "transparent",
  border: "none",

  color: "#00D4AA",
  cursor: "pointer",

  fontWeight: 600,
  zIndex: 10,
};