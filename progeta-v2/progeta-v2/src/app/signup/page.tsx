"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  async function signup() {
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
try {
  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

  console.log("========== SIGNUP ==========");
  console.log("DATA:", data);
  console.log("ERROR:", error);
  console.log("============================");

  if (error) {
    console.error("SIGNUP ERROR:", error);

    toast.error(
      JSON.stringify(error, null, 2)
    );

    return;
  }

  console.log("SUCCESS");
  toast.success("Account created");
  router.push("/login");
} catch (err) {
  console.error("CATCH ERROR:", err);

  toast.error(
    err instanceof Error
      ? err.message
      : "Unknown error"
  );
}
console.log("SUCCESS");

    toast.success("Account created");
    router.push("/login");
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,.15) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          flex: 1,
          maxWidth: "600px",
          padding: "4rem",
          zIndex: 2,
        }}
      >
        <div
          style={{
            color: "#8B5CF6",
            letterSpacing: "3px",
            fontWeight: 700,
            marginBottom: "1rem",
          }}
        >
          PROGETA COMMUNITY
        </div>

        <h1
          style={{
            fontSize: "5rem",
            lineHeight: 1,
            fontWeight: 900,
          }}
        >
          Join The
          <br />
          Community.
        </h1>

        <p
          style={{
            color: "#B3B3B3",
            marginTop: "1rem",
            lineHeight: 1.7,
          }}
        >
          Connect with builders,
          innovators and ambitious learners
          shaping the future.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        style={{
  width: "100%",
  maxWidth: "520px",
  minWidth: "320px",

  background: "#0A0A0A",
  border: "1px solid #242424",
  borderRadius: "24px",
  padding: "2rem",

  position: "relative",
  zIndex: 999,

  flexShrink: 0,
}}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "1.5rem",
          }}
        >
          Create Account
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
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            style={inputStyle}
          />

          <input
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={inputStyle}
          />

          <div style={{ position: "relative" }}>
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
              style={inputStyle}
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

          <div style={{ position: "relative" }}>
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              style={eyeButton}
            >
              {showConfirmPassword
                ? "Hide"
                : "Show"}
            </button>
          </div>

          <button
            onClick={signup}
            style={{
              background: "#8B5CF6",
              color: "#fff",
              border: "none",
              padding: "1rem",
              borderRadius: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            CREATE ACCOUNT
          </button>

          <button
            onClick={() =>
              router.push("/login")
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
            Already have an account? Login
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
  pointerEvents: "auto" as const,
};

const eyeButton = {
  position: "absolute" as const,
  right: "15px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "transparent",
  border: "none",
  color: "#8B5CF6",
  cursor: "pointer",
};