import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { Card } from "../../src/components/Card";
import { Screen } from "../../src/components/Screen";
import { resources } from "../../src/data/content";
import { colors } from "../../src/theme";

export default function LibraryScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Digital Library</Text>
      <Text style={styles.subtitle}>Trusted learning resources for independent study.</Text>
      <View style={styles.list}>
        {resources.map((resource) => (
          <Card key={resource.id}>
            <Text style={styles.subject}>{resource.subject}</Text>
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.description}>{resource.description}</Text>
            <Pressable style={styles.linkButton} onPress={() => Linking.openURL(resource.url)}>
              <Text style={styles.linkText}>Open resource</Text>
            </Pressable>
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
  subject: { color: colors.primary, fontSize: 12, fontWeight: "800", textTransform: "uppercase" },
  resourceTitle: { color: colors.text, fontSize: 17, fontWeight: "800", marginTop: 5 },
  description: { color: colors.muted, lineHeight: 20, marginTop: 6 },
  linkButton: { alignSelf: "flex-start", marginTop: 14, backgroundColor: colors.primarySoft, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  linkText: { color: colors.primaryDark, fontWeight: "800" },
});
