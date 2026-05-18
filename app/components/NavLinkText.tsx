"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
};

export default function NavLinkText({ href, children }: NavLinkProps) {
    const pathname = usePathname();

    const isActive =
        pathname === href || pathname.startsWith(href + "/");

    const baseStyle =
        "text-sm font-medium transition px-3 py-1 rounded-md hover:cursor-pointer";

    const activeStyle = "text-blue-400 bg-slate-800 hover:text-white";
    const inactiveStyle = "text-slate-300 hover:text-blue-400 ";

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