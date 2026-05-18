
import { auth } from "@/auth";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { TaskStatus, Task } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";
import { formatFullTimeDiff } from "../lib/helper";
import { StatusBadge } from "../components/StatusBage";

function StatCard({
    title,
    value,
    hint,
}: {
    title: string;
    value: string;
    hint: string;
}) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">{title}</p>
            <h3 className="mt-3 text-3xl font-bold text-white">{value}</h3>
            <p className="mt-2 text-sm text-slate-500">{hint}</p>
        </div>
    );
}


export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    const [tasks, notifications] = await Promise.all([
        prisma.task.findMany({
            where: { assignedToId: session.user.id },
            orderBy: { createdAt: "desc" }
        }),
        prisma.notification.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
            take: 20
        }),

    ]);

    const isBrowserSupported = await Promise.all([
        prisma.deviceSubscription.findMany({
            where: { userId: session.user.id }
        })
            .then(subs => {
                console.log('subs.length :', subs.length);
                return { res: subs.length > 0 }

            })

    ])
    console.log(' isBrowserSupported in dashboard:', isBrowserSupported[0].res);



    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <div className="mx-auto flex max-w-full px-8">
                <Sidebar />

                <main className="flex-1 px-6 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="mt-2 text-slate-400">
                            Welcome back {session?.user.name ?? session?.user.email}. Here is your task and notification overview.
                        </p>
                        {(!isBrowserSupported[0].res) ?
                            <p className="mt-2 text-amber-300">Push notifications are not supported in this browser or are currently disabled. You can still receive new tasks and notifications while using the app, but push alerts may not be available.
                            </p>
                            : null}

                    </div>

                    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        <StatCard title="Total Tasks" value={tasks.length.toString()} hint="All active and completed tasks" />
                        <StatCard title="Open Tasks" value={tasks.filter((task: Task) => (task).status === TaskStatus.DONE).length.toString()} hint="Tasks still in progress" />
                        <StatCard title="Completed" value={tasks.filter((task: Task) => (task).status === TaskStatus.DONE).length.toString()} hint="Finished successfully" />
                        <StatCard title="Unread Notifications" value={notifications.filter(n => n.isRead).length.toString()} hint="Live updates waiting for you" />
                    </section>

                    <section className="mt-8 grid gap-6 xl:grid-cols-2">
                        <div className="rounded-2xl border border-slate-800 bg-slate-900">
                            <div className="flex items-center justify-between border-b border-slate-800 p-6">
                                <div>
                                    <h2 className="text-lg font-semibold">Recent Tasks</h2>
                                    <p className="mt-1 text-sm text-slate-400">
                                        Your latest task activity
                                    </p>
                                </div>

                                <Link
                                    href="/tasks"
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 cursor-pointer"
                                >
                                    View all
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="text-left text-sm text-slate-400">
                                        <tr className="border-b border-slate-800">
                                            <th className="px-6 py-4 font-medium">Task</th>
                                            <th className="px-6 py-4 font-medium">Due Date</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.filter((task, key) => key < 3).map((task) => (
                                            <tr key={task.id} className="border-b border-slate-800 last:border-b-0">
                                                <td className="px-6 py-4 text-sm text-white">{task.title}</td>
                                                <td className="px-6 py-4 text-sm text-slate-400">{task.dueDate?.toDateString()}</td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={task.status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-900">
                            <div className="flex items-center justify-between border-b border-slate-800 p-6">
                                <div>
                                    <h2 className="text-lg font-semibold">Recent Notifications</h2>
                                    <p className="mt-1 text-sm text-slate-400">
                                        Real-time and system updates
                                    </p>
                                </div>

                                <Link
                                    href="/notifications"
                                    className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 cursor-pointer"
                                >
                                    View all
                                </Link>
                            </div>

                            <div className="divide-y divide-slate-800">
                                {notifications.filter((item, key) => key < 3).map((item) => (
                                    <div
                                        key={item.id}
                                        className={`p-6 ${!item.isRead ? "border-l-4 border-blue-500 bg-slate-800/60" : ""}`}
                                    >
                                        <p className="text-sm text-white">{item.message}</p>
                                        <p className="mt-2 text-xs text-slate-500">{formatFullTimeDiff(item.createdAt)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
