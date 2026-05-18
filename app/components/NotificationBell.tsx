"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRealtimeNotifications } from "../hooks/useRealtimeNotifications";

export default function NotificationBell() {
    const { data: session } = useSession();
    const [count, setCount] = useState(0);

    useEffect(() => {
        async function loadUnread() {
            const res = await fetch("/api/notifications/unread-count", { cache: "no-store" });
            if (!res.ok) return;
            const data = await res.json();
            setCount(data.count);
        }
        if (session?.user?.id) {
            void loadUnread();
        }
    }, [session?.user?.id]);

    useRealtimeNotifications(session?.user?.id, () => {
        setCount((prev) => prev + 1);
    });

    return (
        <div className="flex items-center gap-4">
            <button className="relative rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 transition hover:bg-slate-800">
                <span className="text-lg">🔔</span>
                {count > 0 ? (
                    // <span style={{ position: 'absolute' }} className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-200 px-1 text-xs font-semibold text-slate-900">
                    //     {count}
                    // </span>
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                        {count}
                    </span>
                ) : null}
            </button>
        </div>
    );
}
