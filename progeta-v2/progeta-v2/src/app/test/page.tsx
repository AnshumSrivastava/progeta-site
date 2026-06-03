"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function TestPage() {
  useEffect(() => {
    async function testConnection() {
      const { data, error } =
        await supabase.auth.getSession();

      console.log("DATA:", data);
      console.log("ERROR:", error);
    }

    testConnection();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <h1>Supabase Connected</h1>
    </main>
  );
}