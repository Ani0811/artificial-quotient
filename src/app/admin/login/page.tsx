"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Lock, ArrowLeft, ShieldAlert, KeyRound, Eye, EyeOff, RotateCcw, CheckCircle2, Mail, UserX, AlertCircle } from "lucide-react";
import Link from "next/link";
import { LogoImage } from "@/components/ui/logo-image";
import { isFirebaseConfigured, getFirebaseAuth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

function AdminLoginForm() {
  const searchParams = useSearchParams();
  const notice = searchParams.get("notice");
  const isNotAdmin = notice === "not-admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Forgot Password state
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryKey, setRecoveryKey] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!isFirebaseConfigured()) {
        setError(
          "Firebase environment variables (NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_PROJECT_ID) are not yet configured in your .env file."
        );
        setGoogleLoading(false);
        return;
      }

      const auth = getFirebaseAuth();
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken,
          email: user.email,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(data.message || `Authenticated as ${user.email}! Redirecting...`);
        setTimeout(() => {
          window.location.href = "/admin";
        }, 800);
      } else {
        setError(data.message || "Access denied: Your Google account is not registered as an administrator.");
      }
    } catch (err: any) {
      if (err?.code === "auth/popup-closed-by-user") {
        setError("Google sign-in popup was closed before completing.");
      } else if (err?.code === "auth/cancelled-popup-request") {
        // Ignored
      } else {
        setError(err?.message || "Failed to sign in with Google. Please try again or use password login.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(data.message || "Authentication successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/admin";
        }, 800);
      } else {
        setError(data.message || "Invalid administrator credentials");
      }
    } catch {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: recoveryEmail, recoveryKey, newPassword }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess("Password updated successfully! Authenticated and redirecting...");
        setTimeout(() => {
          window.location.href = "/admin";
        }, 1200);
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch {
      setError("An unexpected error occurred while resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 relative overflow-hidden bg-brand-bg dark:bg-zinc-950 transition-colors">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 blur-[100px] pointer-events-none"></div>

      {/* Back to main portal button */}
      <div className="mb-6 z-10 w-full max-w-md flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-brand-border/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 text-brand-muted hover:text-brand-text dark:text-zinc-400 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800/80 transition-all group shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white/80 dark:bg-zinc-900/80 border border-brand-border/60 dark:border-zinc-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl relative z-10 overflow-hidden">
        {/* Border glow accent line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue to-purple-500"></div>

        <div className="flex flex-col items-center justify-center mb-6">
          {/* Logo container */}
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-brand-dark dark:bg-zinc-800 flex items-center justify-center transition-transform hover:rotate-6 duration-300 shadow-md border border-brand-border dark:border-zinc-700/50 mb-4 p-1">
            <LogoImage
              alt="Artificial Quotient Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <h1 className="font-heading text-2xl font-bold text-brand-text dark:text-white flex items-center gap-1.5">
            Artificial<span className="text-brand-blue">Quotient</span>
          </h1>
          <p className="text-brand-muted dark:text-zinc-400 text-sm mt-1.5 text-center">
            {isForgotMode ? "Robust Password Recovery System" : "Security Gateway • Authorized Personnel Only"}
          </p>
        </div>

        {isNotAdmin && !isForgotMode && (
          <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-2xl p-4 mb-6 space-y-1 text-left shadow-sm">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-800 dark:text-amber-400">
              <Lock className="w-4.5 h-4.5 text-amber-500 shrink-0" />
              <span>Administrator Authentication Required</span>
            </div>
            <p className="text-xs leading-relaxed opacity-90">
              Please sign in with your administrator credentials or Google account to access the Admin Portal. If you do not have an active account, permission must be granted by a System Administrator.
            </p>
          </div>
        )}

        {!isForgotMode ? (
          /* Standard Login Form with Google Auth */
          <div className="space-y-5">
              {/* Google Sign-in Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading || loading}
                className="w-full bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-100 font-bold py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700/80 transition-all shadow-sm hover:shadow-md active:scale-[0.99] flex items-center justify-center gap-3 text-sm cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
              >
                {googleLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-zinc-400 border-t-zinc-800 dark:border-t-zinc-100 rounded-full animate-spin"></span>
                    Connecting Google Account...
                  </span>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Sign in with Google</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-brand-border/60 dark:bg-zinc-800"></div>
                <span className="text-[11px] font-semibold text-brand-muted dark:text-zinc-500 uppercase tracking-wider">
                  or continue with credentials
                </span>
                <div className="h-px flex-1 bg-brand-border/60 dark:bg-zinc-800"></div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-brand-text dark:text-zinc-200">
                    Admin Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted dark:text-zinc-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border/80 dark:border-zinc-700 bg-white/50 dark:bg-zinc-950/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue dark:focus:border-brand-blue text-brand-text dark:text-white transition-all text-sm"
                      placeholder="admin@artificialquotient.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-brand-text dark:text-zinc-200">
                      Access Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotMode(true);
                        setError("");
                        setSuccess("");
                      }}
                      className="text-xs text-brand-blue hover:underline font-medium transition-colors cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted dark:text-zinc-500">
                      <KeyRound className="w-4.5 h-4.5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-brand-border/80 dark:border-zinc-700 bg-white/50 dark:bg-zinc-950/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue dark:focus:border-brand-blue text-brand-text dark:text-white transition-all text-sm"
                      placeholder="••••••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-muted dark:text-zinc-500 hover:text-brand-text dark:hover:text-white transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {success && (
                  <div className="bg-green-50/50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-xl p-3.5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400 shrink-0 mt-0.5" />
                    <p className="text-green-600 dark:text-green-400 text-xs font-medium leading-relaxed">
                      {success}
                    </p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl p-3.5 flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                    <p className="text-red-600 dark:text-red-400 text-xs font-medium leading-relaxed">
                      {error}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-brand-blue/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Verifying Credentials...
                    </span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Authenticate Access
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Reset Password Form */
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted dark:text-zinc-400">
                Admin Email Address *
              </label>
              <input
                type="email"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border/80 dark:border-zinc-700 bg-white/50 dark:bg-zinc-950/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue dark:focus:border-brand-blue text-brand-text dark:text-white transition-all text-xs sm:text-sm"
                placeholder="admin@artificialquotient.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted dark:text-zinc-400">
                Security Recovery PIN / Key *
              </label>
              <input
                type="text"
                value={recoveryKey}
                onChange={(e) => setRecoveryKey(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border/80 dark:border-zinc-700 bg-white/50 dark:bg-zinc-950/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue dark:focus:border-brand-blue text-brand-text dark:text-white transition-all text-xs sm:text-sm font-mono"
                placeholder="e.g. AQ-SEC-9842"
                required
              />
              <p className="text-[11px] text-brand-muted dark:text-zinc-500">
                Enter your admin account recovery key or system master security key.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted dark:text-zinc-400">
                New Access Password *
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-brand-border/80 dark:border-zinc-700 bg-white/50 dark:bg-zinc-950/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue dark:focus:border-brand-blue text-brand-text dark:text-white transition-all text-xs sm:text-sm font-mono"
                  placeholder="Enter new password (min. 4 chars)"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-muted dark:text-zinc-500 hover:text-brand-text dark:hover:text-white transition-colors"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4 text-emerald-500" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl p-3.5 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-600 dark:text-red-400 text-xs font-medium leading-relaxed">
                  {error}
                </p>
              </div>
            )}

            {success && (
              <div className="bg-green-50/50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-xl p-3.5 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400 shrink-0 mt-0.5" />
                <p className="text-green-600 dark:text-green-400 text-xs font-medium leading-relaxed">
                  {success}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-brand-blue/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Resetting Password...
                </span>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4" />
                  Reset Password &amp; Login
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsForgotMode(false);
                setError("");
                setSuccess("");
              }}
              className="w-full text-center text-xs text-brand-muted hover:text-brand-text dark:text-zinc-400 dark:hover:text-white pt-1 transition-colors block"
            >
              &larr; Return to Standard Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center bg-brand-bg dark:bg-zinc-950">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}
