import Link from "next/link";
import { signIn } from "@/auth";
import SocialLoginButtons from "@/app/components/SocialLoginButtons";

export default function LoginPage() {
    async function loginAction(formData: FormData): Promise<void> {
        "use server";

        await signIn("credentials", {
            email: String(formData.get("email") ?? ""),
            password: String(formData.get("password") ?? ""),
            redirectTo: "/dashboard",
        });
    }

    return (
        <div className="min-h-screen bg-slate-950 px-6 py-20 text-white">
            <div className="mx-auto max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8">
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="mt-2 text-sm text-slate-400">
                    Sign in with email or a social provider.
                </p>

                <div className="mt-6">
                    <SocialLoginButtons />
                </div>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-800" />
                    <span className="text-xs uppercase text-slate-500">or</span>
                    <div className="h-px flex-1 bg-slate-800" />
                </div>

                <form action={loginAction} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm text-slate-300">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm text-slate-300">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 hover:cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-sm text-slate-400">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-blue-400 hover:text-blue-300">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}