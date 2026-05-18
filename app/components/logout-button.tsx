"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { headerButtonStyle } from "./ButtonStyle";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!toastMessage) {
            return;
        }

        const timer = window.setTimeout(() => {
            setToastMessage(null);
        }, 4000);

        return () => window.clearTimeout(timer);
    }, [toastMessage]);

    async function handleLogout() {
        try {
            if ("serviceWorker" in navigator && navigator.serviceWorker?.getRegistration) {
                const registration = await Promise.race([
                    navigator.serviceWorker.getRegistration(),
                    new Promise<null>((resolve) => setTimeout(() => resolve(null), 1000)),
                ]);

                const getSub = registration?.pushManager?.getSubscription;
                const subscription = typeof getSub === "function" ? await getSub.call(registration?.pushManager) : null;

                if (subscription) {
                    await fetch("/api/push/unsubscribe", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            endpoint: subscription.endpoint,
                        }),
                    });

                    try {
                        await subscription.unsubscribe();
                    } catch (e) {
                        console.error("push unsubscribe failed", e);
                        setToastMessage("Unable to fully unsubscribe from push notifications.");
                    }
                }
            }
        } catch (err) {
            console.error("Failed while cleaning up push subscription:", err);
            setToastMessage("Push cleanup failed. Logging out anyway.");
        }

        window.dispatchEvent(new CustomEvent("app:close-mobile-menu"));

        try {
            await signOut({
                callbackUrl: "/login",
            });

        } catch (e) {
            console.error("signOut failed:", e);
            setToastMessage("Logout failed. Please try again.");
            try {
                router.push("/login");
            } catch (err) {
                console.error("router push failed:", err);
            }
        }
    }
    return (
        <>
            <button
                onClick={handleLogout}
                className={`${headerButtonStyle} `}
            >
                Logout
            </button>
            {toastMessage ? (
                <div className="fixed bottom-4 right-4 z-50 max-w-xs rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-100 shadow-xl ring-1 ring-white/10">
                    {toastMessage}
                </div>
            ) : null}
        </>
    );
}
