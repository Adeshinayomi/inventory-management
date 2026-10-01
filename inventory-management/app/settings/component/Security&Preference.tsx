"use client";

import {
  Lock,
  ChevronRight,
  Palette,
  ChevronDown,
  Sun,
  Moon,
  MonitorCog,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";
import { changePassword } from "@/lib/settings";
type Theme = "light" | "dark" | "system";

export function SecurityAndPrefences() {
  const [themeOpen, setThemeOpen] = useState(true);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const [theme, setTheme] = useState<Theme>("system");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /*
   * Load saved theme
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    if (
      savedTheme === "light" ||
      savedTheme === "dark" ||
      savedTheme === "system"
    ) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme("system");
    }
  }, []);

  /*
   * Apply theme to the application
   */
  function applyTheme(selectedTheme: Theme) {
    const root = document.documentElement;

    if (selectedTheme === "dark") {
      root.classList.add("dark");
      return;
    }

    if (selectedTheme === "light") {
      root.classList.remove("dark");
      return;
    }

    // System theme
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }

  /*
   * Select theme
   */
    function handleThemeChange(selectedTheme: Theme) {
        setTheme(selectedTheme);
        applyTheme(selectedTheme);

        localStorage.setItem("theme", selectedTheme);
    }

  /*
   * Save preferences
   */
    function handleSave() {
    setMessage("Preferences saved successfully.");

    setTimeout(() => {
        setMessage("");
    }, 3000);
    }

  /*
   * Change password
   */
    async function handlePasswordChange(
    e: React.FormEvent<HTMLFormElement>
    ) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
        setError("All password fields are required.");
        return;
    }

    if (newPassword !== confirmPassword) {
        setError("New passwords do not match.");
        return;
    }

    if (newPassword.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
    }

    try {
        setLoading(true);

        await changePassword({
        currentPassword,
        newPassword,
        });

        setMessage("Password changed successfully.");

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setPasswordOpen(false);

        setTimeout(() => {
        setMessage("");
        }, 3000);
    } catch (error) {
        setError(
        error instanceof Error
            ? error.message
            : "Failed to change password."
        );

        setTimeout(() => {
        setError("");
        }, 3000);
    } finally {
        setLoading(false);
    }
    }
  return (
    <>
      <div className="grid gap-5 bg-surface px-4 py-2 rounded-md border border-border w-1/2">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="grid gap-2">
            <h1 className="text-xl font-bold">
              Security & Preference
            </h1>

            <p className="text-text-secondary text-sm">
              Manage your security, preference and others
            </p>
          </div>
        </div>

        {/* Settings */}
        <div className="grid gap-3">

          {/* Change Password */}
          <button
            type="button"
            onClick={() => setPasswordOpen(true)}
            className="flex justify-between items-center border-b border-border py-2 text-left hover:bg-background transition-colors rounded-md px-2"
          >
            <div className="flex items-center gap-2">
              <Lock
                className="bg-primary/25 text-primary rounded-md p-2"
                size={35}
              />

              <div className="grid">
                <h1 className="font-medium">
                  Change Password
                </h1>

                <p className="text-sm text-text-muted">
                  Update your account password
                </p>
              </div>
            </div>

            <ChevronRight />
          </button>

          {/* Theme */}
          <div className="border-b border-border py-3 grid gap-5">

            <button
              type="button"
              onClick={() => setThemeOpen(!themeOpen)}
              className="flex justify-between items-center w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Palette
                  className="bg-primary/25 text-primary rounded-md p-2"
                  size={35}
                />

                <div className="grid">
                  <h1 className="font-medium">
                    Theme
                  </h1>

                  <p className="text-sm text-text-muted">
                    Set your preferred theme
                  </p>
                </div>
              </div>

              <ChevronDown
                className={`transition-transform ${
                  themeOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {themeOpen && (
              <div className="flex justify-around items-center gap-3">

                {/* Light */}
                <button
                  type="button"
                  onClick={() => handleThemeChange("light")}
                  className={`flex flex-1 justify-center items-center gap-2 px-4 py-2 rounded-md border transition-colors ${
                    theme === "light"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-background"
                  }`}
                >
                  <Sun size={18} />
                  <span>Light</span>
                </button>

                {/* Dark */}
                <button
                  type="button"
                  onClick={() => handleThemeChange("dark")}
                  className={`flex flex-1 justify-center items-center gap-2 px-4 py-2 rounded-md border transition-colors ${
                    theme === "dark"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-background"
                  }`}
                >
                  <Moon size={18} />
                  <span>Dark</span>
                </button>

                {/* System */}
                <button
                  type="button"
                  onClick={() => handleThemeChange("system")}
                  className={`flex flex-1 justify-center items-center gap-2 px-4 py-2 rounded-md border transition-colors ${
                    theme === "system"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-background"
                  }`}
                >
                  <MonitorCog size={18} />
                  <span>System</span>
                </button>

              </div>
            )}
          </div>
        </div>

        {/* Feedback */}
        {message && (
          <p className="text-sm text-green-600">
            {message}
          </p>
        )}

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Save */}
        <button
          type="button"
          onClick={handleSave}
          className="justify-self-end bg-primary px-3 py-2 rounded-md text-surface font-medium"
        >
          Save Changes
        </button>
      </div>

      {/* Change Password Modal */}
      {passwordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-md rounded-md border border-border bg-surface p-6 shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  Change Password
                </h2>

                <p className="text-sm text-text-secondary mt-1">
                  Update your account password.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPasswordOpen(false)}
                className="rounded-md p-2 hover:bg-background"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handlePasswordChange}
              className="grid gap-4"
            >

              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Current Password
                </label>

                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                  className="border border-border bg-background rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  className="border border-border bg-background rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Confirm New Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="border border-border bg-background rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex justify-end gap-3 mt-3">

                <button
                  type="button"
                  onClick={() => setPasswordOpen(false)}
                  className="border border-border rounded-md px-4 py-2 text-sm hover:bg-background"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-surface rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50"
                >
                  {loading
                    ? "Updating..."
                    : "Change Password"}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}