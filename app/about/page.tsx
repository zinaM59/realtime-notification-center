import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href="/dashboard" className="text-xl font-bold text-white">
                        Realtime Notification Center
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-10">
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold tracking-tight text-white">
                            Realtime Notification Center
                        </h1>

                        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                            A modern full-stack realtime notification and task management
                            platform built with Next.js SSR/PWA, Socket.IO, Prisma,
                            PostgreSQL, Docker, AWS, Push Notifications.
                        </p>
                    </div>

                    <section className="mt-10">
                        <h2 className="text-2xl font-semibold text-white">
                            Core Features
                        </h2>

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                                <h3 className="text-lg font-semibold text-blue-400">
                                    Authentication & Authorization
                                </h3>

                                <ul className="mt-4 space-y-2 text-slate-300">
                                    <li>• Auth.js / NextAuth authentication</li>
                                    <li>• JWT session strategy</li>
                                    <li>• Protected routes</li>
                                    <li>• Role-based access control (USER / ADMIN)</li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                                <h3 className="text-lg font-semibold text-blue-400">
                                    Realtime Communication
                                </h3>

                                <ul className="mt-4 space-y-2 text-slate-300">
                                    <li>• Socket.IO realtime communication</li>
                                    <li>• Realtime task synchronization</li>
                                    <li>• Realtime user notifications</li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                                <h3 className="text-lg font-semibold text-blue-400">
                                    Push Notifications
                                </h3>

                                <ul className="mt-4 space-y-2 text-slate-300">
                                    <li>• Browser Push API support</li>
                                    <li>• Service Worker integration</li>
                                    <li>• VAPID authentication</li>
                                    <li>• Offline/background notifications</li>
                                    <li>• PWA install support</li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                                <h3 className="text-lg font-semibold text-blue-400">
                                    AI Operations Assistant
                                </h3>


                                <div className="mt-6">
                                    <p className="text-sm font-medium text-white">
                                        Planned
                                    </p>

                                    <ul className="mt-2 space-y-2 text-slate-400">
                                        <li>• AI-powered task analysis</li>
                                        <li>• AI-assisted notification generation</li>
                                        <li>• Semantic search</li>
                                        <li>• Embeddings / vector search</li>
                                        <li>• RAG-based assistant</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mt-12">
                        <h2 className="text-2xl font-semibold text-white">
                            Technology Stack
                        </h2>

                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                                <h3 className="font-semibold text-white">Frontend</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-300">
                                    Next.js, React, TypeScript, TailwindCSS, PWA, Service Workers
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                                <h3 className="font-semibold text-white">Backend</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-300">
                                    Next.js API Routes, Socket.IO, Prisma ORM, PostgreSQL
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                                <h3 className="font-semibold text-white">Infrastructure</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-300">
                                    Docker, AWS EC2, GitHub Actions CI/CD, HTTPS deployment
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mt-12">
                        <h2 className="text-2xl font-semibold text-white">
                            Realtime Flow
                        </h2>

                        <div className="mt-6 rounded-2xl border border-slate-800 bg-black/30 p-6 font-mono text-sm text-slate-300">
                            <pre>{`User creates task
      ↓
Task saved in PostgreSQL
      ↓
Socket.IO event emitted
      ↓
Selected users updated instantly
      ↓
Optional push notification sent`}</pre>
                        </div>
                    </section>

                    <section className="mt-12">
                        <h2 className="text-2xl font-semibold text-white">
                            CI/CD Pipeline
                        </h2>

                        <div className="mt-6 rounded-2xl border border-slate-800 bg-black/30 p-6 font-mono text-sm text-slate-300">
                            <pre>{`GitHub Push
    ↓
GitHub Actions
    ↓
Docker Build
    ↓
Docker Deployment
    ↓
AWS EC2 Update`}</pre>
                        </div>
                    </section>

                    <section className="mt-12">
                        <h2 className="text-2xl font-semibold text-white">
                            Planned Features
                        </h2>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                                <h3 className="font-semibold text-blue-400">
                                    AI Features
                                </h3>

                                <ul className="mt-4 space-y-2 text-slate-300">
                                    <li>• Semantic search</li>
                                    <li>• AI summarization</li>
                                    <li>• Embeddings / vector search</li>
                                    <li>• RAG-based assistant</li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                                <h3 className="font-semibold text-blue-400">
                                    Infrastructure & Product
                                </h3>

                                <ul className="mt-4 space-y-2 text-slate-300">
                                    <li>• Sending push notifications to users about project updates and changes</li>
                                    <li>• Local Kubernetes deployment</li>
                                    <li>• USER / ADMIN role-based access</li>
                                    <li>• Email notifications</li>
                                    <li>• Mobile optimization</li>

                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mt-12 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6">
                        <h2 className="text-2xl font-semibold text-white">
                            Push Notification Notes
                        </h2>

                        <div className="mt-4 space-y-3 text-slate-300">
                            <p>
                                Push notifications require HTTPS, Service Workers, and browser
                                notification permissions.
                            </p>

                            <p>
                                On Windows/Chrome, notification delivery may require enabling
                                Google Chrome notifications in:
                            </p>

                            <div className="rounded-xl bg-black/30 p-4 font-mono text-sm text-blue-300">
                                Settings → System → Notifications
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
