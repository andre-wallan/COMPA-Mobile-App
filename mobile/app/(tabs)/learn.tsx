
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Card } from "../../src/components/Card";
import { Screen } from "../../src/components/Screen";
import { educationLevels } from "../../src/data/content";
import { colors } from "../../src/theme";

export default function LearnScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Choose your level</Text>
      <Text style={styles.subtitle}>
        Learning content organized for every stage.
      </Text>

      <View style={styles.list}>
        {educationLevels.map((level) => (
          <Pressable
            key={level.id}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/level/[level]",
                params: { level: level.id },
              })
            }
            style={({ pressed }) => [
              styles.pressable,
              pressed && styles.pressed,
            ]}
          >
            <Card>
              <View style={styles.row}>
                <View style={styles.icon}>
                  <Ionicons
                    name={level.icon as never}
                    size={26}
                    color={colors.primary}
                  />
                </View>

                <View style={styles.details}>
                  <Text style={styles.cardTitle}>{level.name}</Text>
                  <Text style={styles.cardCaption}>{level.focus}</Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.muted}
                />
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "800",
  },
  subtitle: {
    color: colors.muted,
    marginTop: 6,
    marginBottom: 18,
    lineHeight: 21,
  },
  list: {
    gap: 10,
  },
  pressable: {
    borderRadius: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    flex: 1,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  cardCaption: {
    color: colors.muted,
    marginTop: 5,
    lineHeight: 18,
  },
});
