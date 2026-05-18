"use client";

import { signIn } from "next-auth/react";

export default function SocialLoginButtons() {
    return (
        <div className="space-y-3">
            <button
                type="button"
                onClick={() =>
                    signIn("google", {
                        callbackUrl: "/dashboard",
                    })
                }
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-medium text-white transition hover:bg-slate-800 hover:cursor-pointer"
            >
                <span className="text-lg">G</span>
                Continue with Google
            </button>

            <button
                type="button"
                onClick={() =>
                    signIn("github", {
                        callbackUrl: "/dashboard",
                    })
                }
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-medium text-white transition hover:bg-slate-800 hover:cursor-pointer"
            >
                <span className="text-lg">⌘</span>
                Continue with GitHub
            </button>
        </div>
    );
}