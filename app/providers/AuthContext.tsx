"use client";

import { createContext, useContext, useEffect } from "react";
import type { Session } from "next-auth";
import { ServiceWorkerRegister } from "../pwa/clients/ServiceWorkerRegister";


const AuthContext = createContext<Session | null>(null);

export function AuthContextProvider({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session | null;

}) {

    useEffect(() => {
        if (session?.user?.id) {
            ServiceWorkerRegister();
        }

    }, [session?.user?.id])
    return (
        <AuthContext.Provider value={session}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthSession() {
    return useContext(AuthContext);
}