import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import * as Linking from "expo-linking";
import type { Session, User } from "@supabase/supabase-js";

import { isSupabaseConfigured, supabase } from "../lib/supabase";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<{ needsEmailConfirmation: boolean }>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

    let active = true;

    supabase.auth.getSession()
      .then(({ data }) => {
        if (active) setSession(data.session);
      })
      .catch(() => {
        if (active) setSession(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (active) setSession(nextSession);
    });

    async function handleAuthUrl(url: string) {
      if (!supabase) return;
      const parsed = new URL(url);
      const code = parsed.searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) throw error;
        return;
      }

      const hashParams = new URLSearchParams(parsed.hash.replace(/^#/, ""));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (error) throw error;
      }
    }

    const subscription = Linking.addEventListener("url", (event) => {
      void handleAuthUrl(event.url).catch((error) => {
        console.warn("Unable to complete authentication redirect:", error);
      });
    });

    void Linking.getInitialURL().then((url) => {
      if (url) {
        void handleAuthUrl(url).catch((error) => {
          console.warn("Unable to complete authentication redirect:", error);
        });
      }
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
      subscription.remove();
    };
  }, []);

  async function signIn(email: string, password: string) {
    if (!supabase) throw new Error("Add Supabase credentials to enable authentication.");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signUp(name: string, email: string, password: string) {
    if (!supabase) throw new Error("Add Supabase credentials to enable account creation.");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: Linking.createURL("/profile"),
      },
    });
    if (error) throw error;
    return { needsEmailConfirmation: data.session === null };
  }

  async function signOut() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async function resetPassword(email: string) {
    if (!supabase) throw new Error("Add Supabase credentials to enable password recovery.");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: Linking.createURL("/profile"),
    });
    if (error) throw error;
  }

  return (
    <AuthContext.Provider
      value={{ user: session?.user ?? null, session, loading, signIn, signUp, resetPassword, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
