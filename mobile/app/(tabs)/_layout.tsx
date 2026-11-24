import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../src/theme";

const tabIcons = {
  index: "home",
  learn: "book",
  quiz: "help-circle",
  library: "library",
  profile: "person",
} as const;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#64748B",
        tabBarStyle: { height: 68, paddingTop: 6, paddingBottom: 8 },
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={tabIcons[route.name as keyof typeof tabIcons] ?? "ellipse"}
            size={typeof size === "number" ? size : 24}
                color={typeof color === "string" ? color : colors.muted}
          />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="learn" options={{ title: "Learn" }} />
      <Tabs.Screen name="quiz" options={{ title: "Quiz" }} />
      <Tabs.Screen name="library" options={{ title: "Library" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
