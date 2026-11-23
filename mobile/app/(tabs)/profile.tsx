import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { Card } from "../../src/components/Card";
import { Screen } from "../../src/components/Screen";
import { isSupabaseConfigured } from "../../src/lib/supabase";
import { useAuth } from "../../src/providers/AuthProvider";
import { colors } from "../../src/theme";

export default function ProfileScreen() {
  const { user, signIn, signUp, signOut } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!email.trim() || !password || (mode === "register" && !name.trim())) {
      Alert.alert("Missing information", "Complete all fields before continuing.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "login") await signIn(email.trim(), password);
      else await signUp(name.trim(), email.trim(), password);
      if (mode === "register") {
        Alert.alert("Check your email", "Confirm your account if email confirmation is enabled.");
      }
    } catch (error) {
      Alert.alert("Authentication error", error instanceof Error ? error.message : "Please try again.");
    } finally {
      setBusy(false);
    }
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
            style={[styles.button, styles.signOut]}
            onPress={() => signOut().catch((error) => Alert.alert("Sign out failed", error.message))}
          >
            <Text style={styles.signOutText}>Sign out</Text>
          </Pressable>
        </Card>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>{mode === "login" ? "Welcome back" : "Create an account"}</Text>
      <Text style={styles.subtitle}>Securely save your progress and study plan.</Text>
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
        <Pressable
          style={styles.switchButton}
          onPress={() => setMode(mode === "login" ? "register" : "login")}
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
  title: { color: colors.text, fontSize: 26, fontWeight: "800" },
  subtitle: { color: colors.muted, marginTop: 6, marginBottom: 18, lineHeight: 21 },
  notice: { backgroundColor: "#FEF3C7", borderRadius: 12, padding: 12, marginBottom: 12 },
  noticeText: { color: "#92400E", lineHeight: 19 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 10, color: colors.text, backgroundColor: "#FFFFFF" },
  button: { backgroundColor: colors.primary, borderRadius: 10, alignItems: "center", paddingVertical: 13, marginTop: 4 },
  buttonText: { color: "#FFFFFF", fontWeight: "800" },
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
