
import Link from "next/link";

export default function HomePage() {
    return (
        <>
            {/* <main> */}
            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-sm text-blue-300">
                        SSR • PWA • Real-time Notifications
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Smart Task &amp; Notification Platform
                    </h1>

                    <p className="mt-6 text-lg text-slate-300">
                        Manage tasks, receive real-time updates, and keep working even
                        offline.
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/login"
                            className="w-full rounded-xl bg-blue-600 px-6 py-3 text-center font-medium text-white transition hover:bg-blue-700 sm:w-auto"
                        >
                            Login
                        </Link>

                        <Link
                            href="pages/register"
                            className="w-full rounded-xl border border-slate-700 px-6 py-3 text-center font-medium text-slate-200 transition hover:bg-slate-900 sm:w-auto"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-20">
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                        <div className="mb-4 text-2xl">🔔</div>
                        <h2 className="text-lg font-semibold">Real-time notifications</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Get live in-app updates and push notifications when important
                            events happen.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                        <div className="mb-4 text-2xl">📱</div>
                        <h2 className="text-lg font-semibold">Offline support (PWA)</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Install the app and continue using core functionality even with
                            limited connectivity.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                        <div className="mb-4 text-2xl">✅</div>
                        <h2 className="text-lg font-semibold">Task management</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Organize tasks, track status, and keep your workflow clear and
                            simple.
                        </p>
                    </div>
                </div>
            </section>
            {/* </main> */}

        </>
    );
}