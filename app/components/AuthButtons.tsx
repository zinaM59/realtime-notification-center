"use client";

import { useAuthSession } from "../providers/AuthContext";
import LogoutButton from "./logout-button";
import NavLinkButton from "./NavLinkButton";

export default function AuthButtons() {
    const session = useAuthSession();
    if (!session?.user) {
        return (
            <nav className="flex items-center gap-3">
                <NavLinkButton href="/login">Login</NavLinkButton>
                <NavLinkButton href="/register">Register</NavLinkButton>
            </nav>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <div className={`{"border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-400"}`}>
                {session.user.email}
            </div>
            <LogoutButton />
        </div>
    );
}
