'use client'
import { useCallback, useEffect, useState } from "react";
import { formatFullTimeDiff } from "../lib/helper";
import { useAuthSession } from "../providers/AuthContext";
import { redirect } from "next/navigation";
import { useRealtimeNotifications } from "../hooks/useRealtimeNotifications";


type Notification = {
    id: number | string;
    title: string;
    message: string
    time: string;
    isRead?: boolean;
    createdAt: Date
};

export default function NotificationList() {
    const session = useAuthSession();
    if (!session?.user?.id) {
        redirect("/login");
    }
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showAll, setShowAll] = useState(false)

    const handleNotification = useCallback((payload: Notification) => {
        setNotifications((prev) => {
            const exists = prev.some((t) => t.id === payload.id);
            if (!exists) return [payload, ...prev];
            return prev.map((t) => (t.id === payload.id ? payload : t));
        });
    }, []);

    useRealtimeNotifications(session?.user?.id, handleNotification, () => undefined);

    useEffect(() => {
        async function load() {
            fetch('/api/notifications', { method: "GET", })
                .then(res => res.json())
                .then(data => {
                    setNotifications(data);
                });
        }
        load();
    }, []);
    async function markIsRead(id: string | number) {
        let isReadVAlue = notifications.find((n) => n.id === id)?.isRead
        isReadVAlue = !isReadVAlue
        const navigation = isReadVAlue ? "read" : "unread";
        const res = await fetch(`/api/notifications/${id}/${navigation}`, { method: "PATCH" });
        if (!res.ok) return;
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: isReadVAlue } : n)));
    }
    return (
        <div className="app-panel">
            <div className="flex items-center justify-between border-b border-app-border p-5">
                <h2 className="text-lg font-semibold text-white">Recent Notifications</h2>
                <button className="rounded-xl border border-slate-700 text-sm text-app-primary hover:text-blue-400 px-4 py-2 cursor-pointer" onClick={() => setShowAll(true)}>
                    View all
                </button>
            </div>
            {
                showAll ? (
                    <div className="divide-y divide-app-border"  >
                        {notifications.map((item) => (
                            <div onClick={() => markIsRead(item.id)}
                                key={item.id}
                                className={`p-5 ${!item.isRead ? "border-l-4 border-app-primary bg-app-surface2" : ""}`}
                            >
                                <p className="text-sm text-white">{item.message}</p>
                                <p className="mt-1 text-xs text-app-dim">{formatFullTimeDiff(item.createdAt)}</p>
                            </div>
                        ))}
                    </div>
                ) : (

                    <div className="divide-y divide-app-border">
                        {notifications.filter((item, key) => key < 5).map((item) => (
                            <div onClick={() => markIsRead(item.id)}
                                key={item.id}
                                className={`p-5 ${!item.isRead ? "border-l-4 border-app-primary bg-app-surface2" : ""}`}
                            >
                                <p className="text-sm text-white">{item.message}</p>
                                <p className="mt-1 text-xs text-app-dim">{formatFullTimeDiff(item.createdAt)}</p>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
}