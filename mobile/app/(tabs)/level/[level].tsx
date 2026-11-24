
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { Screen } from "../../../src/components/Screen";
import { educationLevels } from "../../../src/data/content";
import { colors } from "../../../src/theme";

const subjects: Record<string, string[]> = {
  primary: ["English", "Mathematics", "Science", "Social Studies"],
  secondary: ["Mathematics", "Biology", "Chemistry", "Physics", "English"],
  college: ["Course Materials", "Assignments", "Research Skills", "Exam Preparation"],
  university: ["Academic Writing", "Research Methods", "Critical Reading", "Subject Studies"],
};

export default function LearningLevelScreen() {
  const { level } = useLocalSearchParams<{ level: string }>();

  const selectedLevel = educationLevels.find(
    (item) => item.id === level
  );

  if (!selectedLevel) {
    return (
      <Screen>
        <Text style={styles.title}>Learning level not found</Text>
        <Text style={styles.description}>
          Please return and select a valid learning level.
        </Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>{selectedLevel.name}</Text>
      <Text style={styles.description}>{selectedLevel.focus}</Text>

      <Text style={styles.sectionTitle}>Your subjects</Text>

      <View style={styles.list}>
        {subjects[selectedLevel.id].map((subject) => (
          <View key={subject} style={styles.subjectCard}>
            <Text style={styles.subjectName}>{subject}</Text>
          </View>
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
  description: {
    color: colors.muted,
    marginTop: 8,
    lineHeight: 22,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "800",
    marginTop: 26,
    marginBottom: 12,
  },
  list: {
    gap: 10,
  },
  subjectCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  subjectName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
});
