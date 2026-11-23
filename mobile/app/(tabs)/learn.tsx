import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Card } from "../../src/components/Card";
import { Screen } from "../../src/components/Screen";
import { educationLevels } from "../../src/data/content";
import { colors } from "../../src/theme";

export default function LearnScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Choose your level</Text>
      <Text style={styles.subtitle}>Learning content organized for every stage.</Text>
      <View style={styles.list}>
        {educationLevels.map((level) => (
          <Card key={level.id}>
            <View style={styles.row}>
              <View style={styles.icon}>
                <Ionicons name={level.icon as never} size={26} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{level.name}</Text>
                <Text style={styles.cardCaption}>{level.focus}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.muted} />
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 26, fontWeight: "800" },
  subtitle: { color: colors.muted, marginTop: 6, marginBottom: 18, lineHeight: 21 },
  list: { gap: 10 },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  icon: { width: 48, height: 48, borderRadius: 14, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: "800" },
  cardCaption: { color: colors.muted, marginTop: 5, lineHeight: 18 },
});
