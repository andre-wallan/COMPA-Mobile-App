"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

import { getSupabaseBrowserClient, isSupabaseConfigured } from "../../src/lib/supabase";

export default function ProfilePage() {
  const supabase = getSupabaseBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setMessage("Supabase credentials are not configured.");
      return;
    }

    setBusy(true);
    setMessage("");
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (error) throw error;
        setMessage("Check your email to confirm your account.");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Authentication failed.");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) setMessage(error.message);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-extrabold text-yellow-700">COMPA</Link>
          <Link href="/" className="font-semibold text-slate-600 hover:text-slate-900">Back to home</Link>
        </nav>
      </header>

      <div className="mx-auto max-w-md px-6 py-16">
        {user ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wider text-yellow-700">Profile</p>
            <h1 className="mt-2 text-3xl font-extrabold">{user.user_metadata?.full_name ?? "COMPA Student"}</h1>
            <p className="mt-2 text-slate-600">{user.email}</p>
            <button type="button" onClick={signOut} className="mt-6 rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-yellow-950 hover:bg-yellow-300">
              Sign out
            </button>
          </section>
        ) : (
          <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wider text-yellow-700">{mode === "login" ? "Welcome back" : "Create an account"}</p>
            <h1 className="mt-2 text-3xl font-extrabold">{mode === "login" ? "Sign in" : "Join COMPA"}</h1>
            {!isSupabaseConfigured && (
              <p className="mt-4 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-900">Demo mode: Supabase credentials are not configured.</p>
            )}
            <form onSubmit={submit} className="mt-6 grid gap-3">
              {mode === "register" && (
                <input value={name} onChange={(event) => setName(event.target.value)} required placeholder="Full name" className="rounded-lg border border-slate-300 px-4 py-3" />
              )}
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="Email address" className="rounded-lg border border-slate-300 px-4 py-3" />
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required placeholder="Password" className="rounded-lg border border-slate-300 px-4 py-3" />
              <button type="submit" disabled={busy} className="rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-yellow-950 hover:bg-yellow-300 disabled:opacity-60">
                {busy ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
              </button>
            </form>
            <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")} className="mt-5 text-sm font-bold text-yellow-700">
              {mode === "login" ? "New to COMPA? Create an account" : "Already have an account? Sign in"}
            </button>
            {message && <p className="mt-4 rounded-lg bg-slate-100 p-3 text-sm text-slate-700" role="status">{message}</p>}
          </section>
        )}
      </div>
    </main>
  );
}
