import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navigation/Navbar";
import { Toaster } from "sonner";
import "./globals.css";
import ScopeCursor from "@/components/cursor/ScopeCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PROGETA",
  description: "LaunchPad • InnerCircle • SelfOS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <ScopeCursor />
        <Navbar />

        {children}

        <Toaster
          position="top-right"
          theme="dark"
          richColors
          toastOptions={{
            style: {
              background: "#0A0A0A",
              color: "#FFFFFF",
              border: "1px solid #242424",
              borderRadius: "16px",
            },
          }}
        />
      </body>
    </html>
  );
}