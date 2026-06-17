import { useEffect, useState } from "react";
import { useAuthSession } from "../providers/AuthContext";
import NavLinkText from "./NavLinkText";

export default function HeaderDashboardItems() {
    const session = useAuthSession();
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) {
                setMenuOpen(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const closeMenu = () => setMenuOpen(false);
        window.addEventListener("app:close-mobile-menu", closeMenu);
        return () => window.removeEventListener("app:close-mobile-menu", closeMenu);
    }, []);

    return (
        <div className="relative flex items-center gap-3 justify-end">
            {session?.user ? (
                <>
                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-200 transition hover:border-slate-500 hover:text-white md:hidden"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-expanded={menuOpen}
                        aria-label="Toggle navigation"
                    >
                        <span className="sr-only">Toggle navigation</span>
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            {menuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <>
                                    <path d="M3 12h18" />
                                    <path d="M3 6h18" />
                                    <path d="M3 18h18" />
                                </>
                            )}
                        </svg>
                    </button>

                    <nav className="hidden items-center gap-6 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 md:flex">
                        <NavLinkText href="/dashboard">Dashboard</NavLinkText>
                        <NavLinkText href="/tasks">Tasks</NavLinkText>
                        <NavLinkText href="/notifications">Notifications</NavLinkText>
                        <NavLinkText href="/about">About</NavLinkText>
                    </nav>

                    {isMobile && menuOpen ? (
                        <div className="absolute left-0 top-full z-20 mt-2 w-auto min-w-[14rem] max-w-sm overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-xl md:hidden">
                            <div className="flex flex-col gap-2">
                                <NavLinkText href="/dashboard">Dashboard</NavLinkText>
                                <NavLinkText href="/tasks">Tasks</NavLinkText>
                                <NavLinkText href="/notifications">Notifications</NavLinkText>
                            </div>
                        </div>
                    ) : null}
                </>
            ) : null}
        </div>
    );
}
