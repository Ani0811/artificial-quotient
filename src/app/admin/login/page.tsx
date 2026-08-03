"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Force a hard refresh to update the navbar server component
        window.location.href = "/admin";
      } else {
        const data = await res.json();
        setError(data.message || "Login failed");
      }
    } catch {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-brand-border rounded-2xl p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-brand-blue" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-brand-text">Admin Login</h1>
          <p className="text-brand-muted text-sm mt-2">Enter your password to access the dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-brand-text mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
              placeholder="Enter password"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3 rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
