import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { Card } from "../../src/components/Card";
import { Screen } from "../../src/components/Screen";
import { useAuth } from "../../src/providers/AuthProvider";
import { colors } from "../../src/theme";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <Screen>
      <Text style={styles.greeting}>Good day, {user?.user_metadata?.full_name ?? "Learner"} 👋</Text>
      <Text style={styles.title}>Ready to learn something new?</Text>

      <View style={styles.hero}>
        <Text style={styles.heroLabel}>DAILY CHALLENGE</Text>
        <Text style={styles.heroTitle}>One quiz. One step forward.</Text>
        <Link href="/quiz" asChild>
          <Text style={styles.heroButton}>Start today&apos;s quiz</Text>
        </Link>
      </View>

      <Text style={styles.sectionTitle}>Your learning tools</Text>
      <View style={styles.grid}>
        {[
          { href: "/learn", icon: "book-outline", title: "Subjects", caption: "Explore by level" },
          { href: "/quiz", icon: "help-circle-outline", title: "Quiz", caption: "Check knowledge" },
          { href: "/library", icon: "library-outline", title: "Library", caption: "Find resources" },
        ].map((item) => (
          <Link key={item.title} href={item.href} asChild>
            <Card>
              <Ionicons name={item.icon as never} size={26} color={colors.primary} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardCaption}>{item.caption}</Text>
            </Card>
          </Link>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Today</Text>
      <Card>
        <View style={styles.activityRow}>
          <View style={styles.activityIcon}><Ionicons name="checkmark" size={18} color={colors.success} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Continue Mathematics</Text>
            <Text style={styles.cardCaption}>One 10-minute practice session</Text>
          </View>
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  greeting: { color: colors.muted, fontSize: 15 },
  title: { color: colors.text, fontSize: 25, fontWeight: "800", marginTop: 4, marginBottom: 18 },
  hero: { backgroundColor: colors.primaryDark, borderRadius: 20, padding: 20, marginBottom: 22 },
  heroLabel: { color: "#BFDBFE", fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  heroTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "800", marginTop: 8, maxWidth: 240 },
  heroButton: { alignSelf: "flex-start", marginTop: 18, backgroundColor: "#FFFFFF", color: colors.primaryDark, fontWeight: "800", paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, overflow: "hidden" },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: "800", marginBottom: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 24 },
  cardTitle: { color: colors.text, fontSize: 15, fontWeight: "800", marginTop: 10 },
  cardCaption: { color: colors.muted, fontSize: 13, marginTop: 4 },
  activityRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  activityIcon: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: colors.successSoft },
});
