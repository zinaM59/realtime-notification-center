"use client";

import { SessionProvider } from "next-auth/react";
import { AuthContextProvider } from "./AuthContext";
import type { Session } from "next-auth";

export default function Providers({ children, session }: { children: React.ReactNode, session: Session | null }) {
  return <SessionProvider session={session}>
    <AuthContextProvider session={session}>
      {children}
    </AuthContextProvider></SessionProvider>;
}