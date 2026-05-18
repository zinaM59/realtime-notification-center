
import Link from "next/link";
import { registerAction } from "./actions";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-slate-950 px-6 py-20 text-white">
            <div className="mx-auto max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8">
                <h1 className="text-2xl font-bold">Register</h1>

                <form action={registerAction} className="mt-6 space-y-4">
                    <div>
                        <label className="mb-2 block text-sm text-slate-300">Name</label>
                        <input
                            name="name"
                            type="text"
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
                            placeholder="Your name"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
                            placeholder=""
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 hover:cursor-pointer"
                    >
                        Create account
                    </button>
                </form>

                <p className="mt-6 text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-400 hover:text-blue-300">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}