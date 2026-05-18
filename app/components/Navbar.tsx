"use client";

import Link from "next/link";

type NavbarProps = {
    unreadCount?: number;
};

export default function Navbar({ unreadCount = 3 }: NavbarProps) {
    return (
        <header className="sticky top-0 z-50 border-b border-app-border bg-app-surface/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-lg font-semibold text-white">
                        ModernStacks
                    </Link>

                    <nav className="hidden items-center gap-6 md:flex">
                        <Link href="/dashboard" className="app-link">
                            Dashboard
                        </Link>
                        <Link href="/tasks" className="app-link">
                            Tasks
                        </Link>
                        <Link href="/notifications" className="app-link">
                            Notifications
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        className="relative rounded-xl border border-app-border bg-app-surface2 px-3 py-2 text-white hover:bg-slate-700"
                        aria-label="Notifications"
                    >
                        <span className="text-lg">🔔</span>
                        {unreadCount > 0 && (
                            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-app-danger px-1 text-xs font-semibold text-white">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    <div className="hidden rounded-xl border border-app-border bg-app-surface2 px-3 py-2 text-sm text-app-muted sm:block">
                        User
                    </div>
                </div>
            </div>
        </header>
    );
}