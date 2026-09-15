"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, PackageCheck } from "lucide-react";
import { loginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

type loginResponse={
  token:string,
  user:{
    name:string,
    email:string,
    phone:number,
    role:string
  }
}
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const data:loginResponse = await loginUser({
        email,
        password,
      });

      console.log("Login successful:", data);

      // Store the token returned by your backend.
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user))
      
      // Redirect to dashboard.
      router.push("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen bg-slate-950 p-5 sm:p-8 lg:grid lg:grid-cols-2 lg:p-0">
      <div className="hidden bg-[radial-gradient(circle_at_top_left,_#3fae2a,_#0f172a_58%)] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3 text-xl font-semibold tracking-wide">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-primary">
            <PackageCheck />
          </span>
          INVENTORY
        </div>
        <div className="max-w-md">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-green-200">
            Inventory management
          </p>
          <h1 className="text-5xl font-semibold leading-tight">
            Run your store with clarity.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-200">
            Track products, sales, and stock levels from one simple workspace.
          </p>
        </div>
        <p className="text-sm text-slate-300">
          Secure access for your store team.
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-md items-center lg:max-w-none lg:bg-slate-50 lg:px-16 xl:px-28">
        <div className="w-full rounded-2xl bg-white p-7 shadow-2xl shadow-black/20 sm:p-10 lg:rounded-none lg:p-0 lg:shadow-none">
          <div className="mb-8 lg:hidden">
            <div className="mb-6 flex items-center gap-2 font-semibold text-slate-900">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-white"><PackageCheck size={20} /></span>
              INVENTORY
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to manage your inventory.
          </p>

          <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Email address
              <span className="relative">
                <Mail
                  className="absolute left-3 top-3 text-slate-400"
                  size={18}
                />
                <input
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-green-100"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </span>
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Password
              <span className="relative">
                <LockKeyhole
                  className="absolute left-3 top-3 text-slate-400"
                  size={18}
                />
                <input
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-11 outline-none transition focus:border-primary focus:ring-2 focus:ring-green-100"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>

            {error && (
              <p
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              className="mt-2 h-11 rounded-lg bg-primary font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
