"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    await supabase.auth.signOut();

    setUser(null);

    router.push("/");
    router.refresh();
  }

  return (
    <nav
      style={{
        position: "fixed",
        top: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "900px",
        maxWidth: "95%",
        padding: "18px 28px",
        background: "#050505",
        border: "1px solid #161616",
        borderRadius: "999px",
        zIndex: 1000,
      }}
    >
      {/* LEFT LINKS */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          alignItems: "center",
        }}
      >
        <Link href="/">Home</Link>
        <Link href="/launchpad">LaunchPad</Link>
        <Link href="/innercircle">InnerCircle</Link>
        <Link href="/selfos">SelfOS</Link>
        <Link href="/about">About</Link>
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {user ? (
          <>
            <Link href="/dashboard">
              Dashboard
            </Link>

            <button
              onClick={logout}
              style={{
                background: "#ff4d4d",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                borderRadius: "999px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              Login
            </Link>

            <Link
              href="/signup"
              style={{
                background: "#ffffff",
                color: "#000000",
                padding: "10px 18px",
                borderRadius: "999px",
                fontWeight: 700,
              }}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}