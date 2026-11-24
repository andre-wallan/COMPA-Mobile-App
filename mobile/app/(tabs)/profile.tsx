import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";

import { Card } from "../../src/components/Card";
import { Screen } from "../../src/components/Screen";
import { isSupabaseConfigured } from "../../src/lib/supabase";
import { useAuth } from "../../src/providers/AuthProvider";
import { colors } from "../../src/theme";

export default function ProfileScreen() {
  const { user, loading, signIn, signUp, resetPassword, signOut } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [status, setStatus] = useState("");

  function getAuthErrorMessage(error: unknown) {
    if (!(error instanceof Error)) return "Please try again.";
    const message = error.message.toLowerCase();
    if (message.includes("invalid login credentials")) return "Email or password is incorrect.";
    if (message.includes("email not confirmed")) return "Confirm your email before signing in.";
    if (message.includes("user already registered")) return "An account already exists for this email.";
    if (message.includes("rate limit")) return "Too many attempts. Please wait and try again.";
    if (message.includes("password")) return "Use a valid password with at least 6 characters.";
    return error.message;
  }

  async function requestPasswordReset() {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setStatus("Enter your email address first.");
      return;
    }
    setBusy(true);
    setStatus("");
    try {
      await resetPassword(normalizedEmail);
      setStatus("Password reset instructions were sent to your email.");
    } catch (error) {
      setStatus(getAuthErrorMessage(error));
    } finally {
      setBusy(false);
    }
  }

  async function submit() {
    setStatus("");
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password || (mode === "register" && !name.trim())) {
      setStatus("Complete all fields before continuing.");
      return;
    }
    if (password.length < 6) {
      setStatus("Use a password with at least 6 characters.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "login") {
        await signIn(normalizedEmail, password);
        setPassword("");
        router.replace("/");
      }
      else {
        const result = await signUp(name.trim(), normalizedEmail, password);
        if (result.needsEmailConfirmation) {
          setStatus("Account created. Confirm your email, then sign in here.");
          setName("");
          setPassword("");
          setMode("login");
          Alert.alert(
            "Check your email",
            "Your account was created. Confirm the email, then sign in here.",
            [{ text: "Go to sign in", onPress: () => setMode("login") }]
          );
        } else {
          router.replace("/");
        }
      }
    } catch (error) {
      setStatus(getAuthErrorMessage(error));
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <Screen>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading your account...</Text>
        </View>
      </Screen>
    );
  }

  if (user) {
    return (
      <Screen>
        <Text style={styles.title}>Profile</Text>
        <Card>
          <View style={styles.avatar}><Text style={styles.avatarText}>{(user.user_metadata?.full_name ?? user.email ?? "S").charAt(0).toUpperCase()}</Text></View>
          <Text style={styles.name}>{user.user_metadata?.full_name ?? "COMPA Student"}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Pressable
            style={[styles.button, styles.signOut, signingOut && styles.disabled]}
            disabled={signingOut}
            onPress={async () => {
              setStatus("");
              setSigningOut(true);
              try {
                await signOut();
              } catch (error) {
                Alert.alert("Sign out failed", getAuthErrorMessage(error));
              } finally {
                setSigningOut(false);
              }
            }}
          >
            <Text style={styles.signOutText}>{signingOut ? "Signing out..." : "Sign out"}</Text>
          </Pressable>
        </Card>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>{mode === "login" ? "Welcome back" : "Create an account"}</Text>
      <Text style={styles.subtitle}>Securely save your progress and study plan.</Text>
      {status ? (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>{status}</Text>
        </View>
      ) : null}
      {!isSupabaseConfigured && (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>Demo mode: add Supabase credentials to enable real accounts.</Text>
        </View>
      )}
      <Card>
        {mode === "register" && (
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Full name"
            autoCapitalize="words"
          />
        )}
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          autoComplete="password"
        />
        <Pressable style={[styles.button, busy && styles.disabled]} onPress={submit} disabled={busy}>
          <Text style={styles.buttonText}>{busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}</Text>
        </Pressable>
        {mode === "login" && (
          <Pressable
            style={styles.switchButton}
            onPress={requestPasswordReset}
            disabled={busy}
          >
            <Text style={styles.switchText}>Forgot your password?</Text>
          </Pressable>
        )}
        <Pressable
          style={styles.switchButton}
          onPress={() => {
            setStatus("");
            setMode(mode === "login" ? "register" : "login");
          }}
        >
          <Text style={styles.switchText}>
            {mode === "login" ? "New to COMPA? Create an account" : "Already have an account? Sign in"}
          </Text>
        </Pressable>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingText: { color: colors.muted, marginTop: 12, fontWeight: "700" },
  title: { color: colors.text, fontSize: 26, fontWeight: "800" },
  subtitle: { color: colors.muted, marginTop: 6, marginBottom: 18, lineHeight: 21 },
  notice: { backgroundColor: "#FEF3C7", borderRadius: 12, padding: 12, marginBottom: 12 },
  noticeText: { color: "#92400E", lineHeight: 19 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 10, color: colors.text, backgroundColor: "#FFFFFF" },
  button: { backgroundColor: colors.primary, borderRadius: 10, alignItems: "center", paddingVertical: 13, marginTop: 4 },
  buttonText: { color: "#422006", fontWeight: "800" },
  disabled: { opacity: 0.6 },
  switchButton: { alignItems: "center", marginTop: 16 },
  switchText: { color: colors.primary, fontWeight: "700" },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" },
  avatarText: { color: colors.primary, fontSize: 24, fontWeight: "900" },
  name: { color: colors.text, fontSize: 20, fontWeight: "800", marginTop: 12 },
  email: { color: colors.muted, marginTop: 4 },
  signOut: { marginTop: 18, backgroundColor: colors.dangerSoft },
  signOutText: { color: colors.danger, fontWeight: "800" },
});
