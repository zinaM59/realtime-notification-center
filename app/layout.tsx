import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers/Providers";

import { auth } from "../auth";
import HeaderClient from "./components/HeaderClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Real-time Notification Center",
  description: "Real-time Notification Center",
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon.ico",
    // apple: "/icons/apple-touch-icon.png"
  },
  manifest: "/manifest.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers session={session}>
          <header className="border-b border-slate-800">
            <div className="flex w-screen items-center justify-between px-6 py-4">
              <div className="text-xl font-bold tracking-tight">ModernStacks</div>
              <HeaderClient />
            </div>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
