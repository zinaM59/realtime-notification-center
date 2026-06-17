'use client';
import { useRouter } from "next/navigation";
import { useAuthSession } from "../providers/AuthContext";

export default function SettingsPage() {
    const session = useAuthSession();
    const router = useRouter();

    if (!session?.user?.id) {
        router.replace("/login");
    }

    async function sendPushNotification() {
        console.log("Send push notification clicked.");
        await fetch("/api/send-push", {})

    }

    const isAdmin = session?.user?.email === "zinamej@gmail.com";

    if (!session?.user?.id) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="mt-2 text-slate-400">Settings page will go here.</p>

                {isAdmin ? (
                    <button
                        type="button"
                        className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                        onClick={sendPushNotification}
                    >
                        Send Push Notification
                    </button>
                ) : null}
            </div>
        </div>
    );
}