"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [userName, setUserName] =
    useState("Member");

  const [email, setEmail] =
    useState("");

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setEmail(user.email || "");

    setUserName(
      user.user_metadata?.full_name ||
        "Member"
    );
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        paddingTop: "140px",
        paddingInline: "clamp(20px,5vw,80px)",
        paddingBottom: "80px",
      }}
    >
      {/* HERO */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <h1
          style={{
            fontSize:
              "clamp(3rem,7vw,5rem)",
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          Welcome Back,
          <br />
          {userName}
        </h1>

        <p
          style={{
            color: "#B3B3B3",
            marginTop: "1rem",
            fontSize: "1.1rem",
          }}
        >
          Your Progeta Control Center
        </p>
      </motion.div>

      {/* STATS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "50px",
        }}
      >
        {[
          {
            title: "Active Tracks",
            value: "03",
          },
          {
            title: "Events",
            value: "06",
          },
          {
            title: "Expert Sessions",
            value: "02",
          },
          {
            title: "InnerCircle",
            value: "Pending",
          },
        ].map((item) => (
          <motion.div
            key={item.title}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            style={card}
          >
            <p
              style={{
                color: "#888",
              }}
            >
              {item.title}
            </p>

            <h2
              style={{
                marginTop: "10px",
                fontSize: "2rem",
              }}
            >
              {item.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* QUICK ACTIONS */}

      <h2
        style={{
          marginTop: "60px",
          marginBottom: "20px",
        }}
      >
        Quick Actions
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        {[
          {
            title: "LaunchPad",
            desc: "Browse Tracks",
            color: "#00D4AA",
          },
          {
            title: "SelfOS",
            desc: "Join Waitlist",
            color: "#F59E0B",
          },
          {
            title: "InnerCircle",
            desc: "View Application",
            color: "#8B5CF6",
          },
          {
            title: "Experts",
            desc: "Book Session",
            color: "#3B82F6",
          },
        ].map((item) => (
          <motion.div
            key={item.title}
            whileHover={{
              scale: 1.03,
              y: -8,
            }}
            style={{
              ...card,
              borderColor:
                item.color,
            }}
          >
            <h3>{item.title}</h3>

            <p
              style={{
                color: "#999",
              }}
            >
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* MAIN GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "2fr 1fr",
          gap: "24px",
          marginTop: "60px",
        }}
      >
        {/* LEFT */}

        <div>
          <div style={card}>
            <h3>
              Learning Progress
            </h3>

            {[
              {
                name:
                  "Cyber Security",
                width: "80%",
              },
              {
                name:
                  "Cloud Computing",
                width: "50%",
              },
              {
                name:
                  "AI Engineering",
                width: "20%",
              },
            ].map((course) => (
              <div
                key={course.name}
                style={{
                  marginTop: "20px",
                }}
              >
                <p>{course.name}</p>

                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    background:
                      "#151515",
                    borderRadius:
                      "999px",
                    marginTop: "10px",
                  }}
                >
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width:
                        course.width,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    style={{
                      height:
                        "100%",
                      background:
                        "#00D4AA",
                      borderRadius:
                        "999px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              ...card,
              marginTop: "24px",
            }}
          >
            <h3>
              Recent Activity
            </h3>

            <ul
              style={{
                marginTop: "20px",
                color: "#B3B3B3",
                lineHeight: 2,
              }}
            >
              <li>
                ✓ Account Created
              </li>
              <li>
                ✓ Joined Community
              </li>
              <li>
                ✓ Registered Event
              </li>
              <li>
                ✓ Profile Updated
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT */}

        <div>
          <div style={card}>
            <h3>Profile</h3>

            <div
              style={{
                marginTop: "20px",
              }}
            >
              <p
                style={{
                  color: "#888",
                }}
              >
                Name
              </p>

              <p>{userName}</p>

              <p
                style={{
                  color: "#888",
                  marginTop:
                    "15px",
                }}
              >
                Email
              </p>

              <p>{email}</p>
            </div>

            <button
              style={{
                width: "100%",
                marginTop: "20px",
                background:
                  "#00D4AA",
                color: "#000",
                border: "none",
                padding: "12px",
                borderRadius:
                  "12px",
                cursor:
                  "pointer",
                fontWeight: 700,
              }}
            >
              Edit Profile
            </button>
          </div>

          <div
            style={{
              ...card,
              marginTop: "24px",
            }}
          >
            <h3>Account</h3>

            <button
              onClick={logout}
              style={{
                width: "100%",
                marginTop: "20px",
                background:
                  "#ef4444",
                color: "#fff",
                border: "none",
                padding: "12px",
                borderRadius:
                  "12px",
                cursor:
                  "pointer",
                fontWeight: 700,
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

const card = {
  background: "#0A0A0A",
  border: "1px solid #242424",
  borderRadius: "24px",
  padding: "24px",
  boxShadow:
    "0 0 30px rgba(0,212,170,.08)",
};