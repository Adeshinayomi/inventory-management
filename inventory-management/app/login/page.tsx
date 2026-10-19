"use client";

import { FormEvent, useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  PackageCheck,
  Building2,
  MapPin,
  Phone,
  UserRound,
  CheckCircle2,
} from "lucide-react";
import { loginUser, registerStore } from "@/lib/auth";
import { useRouter } from "next/navigation";

type LoginResponse = {
  token: string;
  user: {
    name: string;
    email: string;
    phone: number;
    role: string;
  };
};

type AuthMode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<AuthMode>("login");

  // Owner account
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Business information
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storeEmail, setStoreEmail] = useState("");
  const [storePhone, setStorePhone] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setError("");
    setSuccess("");
    setShowPassword(false);
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const data: LoginResponse = await loginUser({
        email,
        password,
      });

      if (!data.token || !data.user) {
        throw new Error("The server returned an invalid login response.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRegistration(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const data = await registerStore({
        storeName: storeName.trim(),
        storeAddress: storeAddress.trim(),
        storeEmail: storeEmail.trim(),
        storePhone: storePhone.trim(),
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim(),
      });

      setSuccess(
        `${data.message}. You can now sign in using your owner account.`
      );

      // Registration does not return an authentication token.
      // Switch to login instead of pretending the owner is signed in.
      setMode("login");
      setPassword("");
      setStoreName("");
      setStoreAddress("");
      setStoreEmail("");
      setStorePhone("");
      setName("");
      setPhone("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Business registration failed."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-green-100";

  const labelClass = "grid gap-2 text-sm font-medium text-slate-700";

  return (
    <section className="min-h-screen bg-slate-950 p-5 sm:p-8 lg:grid lg:grid-cols-2 lg:p-0 lg:h-screen lg:overflow-hidden">
      {/* Branding panel */}
      <div className="hidden bg-[radial-gradient(circle_at_top_left,_#3fae2a,_#0f172a_58%)] p-12 text-white lg:flex lg:h-screen lg:flex-col lg:justify-between lg:overflow-hidden">
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
            {mode === "login"
              ? "Run your store with clarity."
              : "Bring your business into focus."}
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-200">
            {mode === "login"
              ? "Track products, sales, and stock levels from one simple workspace."
              : "Register your business, set up your owner account, and manage your inventory from one workspace."}
          </p>
        </div>

        <p className="text-sm text-slate-300">
          Secure access for your store team.
        </p>
      </div>

      {/* Form panel */}
      <div className="mx-auto flex w-full max-w-md items-start lg:max-w-none lg:h-screen lg:min-h-0 lg:overflow-y-auto lg:bg-slate-50 lg:px-16 lg:py-10 xl:px-28">
        <div className="w-full rounded-2xl bg-white p-7 shadow-2xl shadow-black/20 sm:p-10 lg:rounded-none lg:shadow-none">
          <div className="mb-7 lg:hidden">
            <div className="mb-5 flex items-center gap-2 font-semibold text-slate-900">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-white">
                <PackageCheck size={20} />
              </span>
              INVENTORY
            </div>
          </div>

          {/* Mode selector */}
          <div className="mb-8 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => changeMode("login")}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                mode === "login"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={() => changeMode("register")}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                mode === "register"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Register business
            </button>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {mode === "login" ? "Welcome back" : "Register your business"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {mode === "login"
              ? "Sign in to manage your inventory."
              : "Enter your business details and create your owner account."}
          </p>

          {success && (
            <div
              role="status"
              className="mt-5 flex gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800"
            >
              <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
              <p>{success}</p>
            </div>
          )}

          <form
            className="mt-8 grid gap-5"
            onSubmit={mode === "login" ? handleLogin : handleRegistration}
          >
            {mode === "register" && (
              <>
                {/* Business information */}
                <div className="border-b border-slate-200 pb-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Business information
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Details about the store you're registering.
                  </p>
                </div>

                <label className={labelClass}>
                  Business name
                  <span className="relative">
                    <Building2
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />
                    <input
                      className={inputClass}
                      type="text"
                      value={storeName}
                      onChange={(event) => setStoreName(event.target.value)}
                      placeholder="e.g. Greenfield Supermarket"
                      autoComplete="organization"
                      required
                    />
                  </span>
                </label>

                <label className={labelClass}>
                  Business address
                  <span className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />
                    <input
                      className={inputClass}
                      type="text"
                      value={storeAddress}
                      onChange={(event) =>
                        setStoreAddress(event.target.value)
                      }
                      placeholder="Street, city, state"
                      autoComplete="street-address"
                      required
                    />
                  </span>
                </label>

                <label className={labelClass}>
                  Business email
                  <span className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />
                    <input
                      className={inputClass}
                      type="email"
                      value={storeEmail}
                      onChange={(event) => setStoreEmail(event.target.value)}
                      placeholder="business@example.com"
                      autoComplete="organization"
                      required
                    />
                  </span>
                </label>

                <label className={labelClass}>
                  Business phone
                  <span className="relative">
                    <Phone
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />
                    <input
                      className={inputClass}
                      type="tel"
                      value={storePhone}
                      onChange={(event) => setStorePhone(event.target.value)}
                      placeholder="Business contact number"
                      autoComplete="tel"
                      required
                    />
                  </span>
                </label>

                {/* Owner information */}
                <div className="mt-2 border-b border-slate-200 pb-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Owner account
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    These details will be used to sign in.
                  </p>
                </div>

                <label className={labelClass}>
                  Owner's full name
                  <span className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />
                    <input
                      className={inputClass}
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your full name"
                      autoComplete="name"
                      required
                    />
                  </span>
                </label>
              </>
            )}

            <label className={labelClass}>
              {mode === "register" ? "Owner's email address" : "Email address"}
              <span className="relative">
                <Mail
                  className="absolute left-3 top-3 text-slate-400"
                  size={18}
                />
                <input
                  className={inputClass}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </span>
            </label>

            {mode === "register" && (
              <label className={labelClass}>
                Owner's phone number
                <span className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />
                  <input
                    className={inputClass}
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Your contact number"
                    autoComplete="tel"
                    required
                  />
                </span>
              </label>
            )}

            <label className={labelClass}>
              Password
              <span className="relative">
                <LockKeyhole
                  className="absolute left-3 top-3 text-slate-400"
                  size={18}
                />

                <input
                  className={`${inputClass} pr-11`}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={
                    mode === "register"
                      ? "Create a password"
                      : "Enter your password"
                  }
                  autoComplete={
                    mode === "register" ? "new-password" : "current-password"
                  }
                  minLength={mode === "register" ? 8 : undefined}
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

              {mode === "register" && (
                <span className="text-xs font-normal text-slate-500">
                  Use at least 8 characters.
                </span>
              )}
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
              className="mt-2 flex h-11 items-center justify-center rounded-lg bg-primary font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? mode === "login"
                  ? "Signing in..."
                  : "Registering business..."
                : mode === "login"
                  ? "Sign in"
                  : "Register business"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            {mode === "login"
              ? "New to Inventory? "
              : "Already registered? "}

            <button
              type="button"
              onClick={() =>
                changeMode(mode === "login" ? "register" : "login")
              }
              className="font-semibold text-primary hover:underline"
            >
              {mode === "login" ? "Register your business" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}