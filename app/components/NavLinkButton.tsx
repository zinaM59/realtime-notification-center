"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
};

export default function NavLinkButton({ href, children }: NavLinkProps) {
    const pathname = usePathname();

    const isActive =
        pathname === href || pathname.startsWith(href + "/");

    const baseStyle = "rounded-lg px-4 py-2 text-sm font-medium  transition hover:cursor-pointer";

    const activeStyle = "bg-blue-600 text-slate-200 hover:bg-blue-700";
    const inactiveStyle = "border border-slate-700 text-slate-400 hover:bg-slate-800 ";

    return (
        <Link
            href={href}
            className={`${baseStyle} ${isActive ? activeStyle : inactiveStyle
                }`}
        >
            {children}
        </Link>
    );
}

