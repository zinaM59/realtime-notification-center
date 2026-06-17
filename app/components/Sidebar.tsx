"use client";

import Link from "next/link";


const items = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/tasks", label: "Tasks" },
    { href: "/notifications", label: "Notifications" },
    { href: "/about", label: "About" },
    { href: "/settings", label: "Settings" },
    { href: "/admin", label: "Admin" },
];

export default function Sidebar() {
    return (
        <aside className="hidden w-64 border-r border-app-border bg-app-surface md:block">
            <div className="p-4">
                <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-app-dim">
                    Navigation
                </div>

                <nav className="space-y-2">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block rounded-xl px-4 py-3 text-app-muted transition-colors hover:bg-app-surface2 hover:text-white"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
}