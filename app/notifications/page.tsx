import NotificationList from "@/app/components/NotificationList";

export default function NotificationsPage() {
    return (
        <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold">Notifications</h1>
                <NotificationList />
            </div>
        </div>
    );
}