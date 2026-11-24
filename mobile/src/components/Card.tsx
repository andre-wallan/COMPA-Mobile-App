
import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "../theme";

export function Card({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
  },
});
