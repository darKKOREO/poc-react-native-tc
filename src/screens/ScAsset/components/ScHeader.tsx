import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation";
import { Focusable } from "../../../components/Focusable";
import { scTheme, scFocusOutline, scFocusOnPrimary } from "../theme";

export type ScTab =
  | "Present"
  | "Consult"
  | "Browse"
  | "Register"
  | "Control Center";

type ScNav = NativeStackNavigationProp<RootStackParamList>;

const TAB_ROUTES: Partial<Record<ScTab, keyof RootStackParamList>> = {
  Present: "ScPresentNormal",
  Consult: "ScConsult",
  Browse: "ScBrowse",
  Register: "ScRegister",
};

type Props = {
  active: ScTab;
  /** 'dark' = translucent pills over the hero image; 'light' = on cream background */
  variant?: "dark" | "light";
  tabs?: ScTab[];
};

const DEFAULT_TABS: ScTab[] = [
  "Present",
  "Consult",
  "Browse",
  "Register",
  "Control Center",
];

export const ScHeader: React.FC<Props> = ({
  active,
  variant = "light",
  tabs = DEFAULT_TABS,
}) => {
  const navigation = useNavigation<ScNav>();
  const dark = variant === "dark";

  return (
    <View style={styles.row}>
      <Text style={styles.logo}>SC ASSET</Text>
      <View style={styles.tabs}>
        {tabs.map((tab) => {
          const isActive = tab === active;
          const route = TAB_ROUTES[tab];
          const isFirstFocusable = !isActive && tab === tabs.find((t) => t !== active);
          return (
            <Focusable
              key={tab}
              hasTVPreferredFocus={isFirstFocusable}
              disabled={isActive || !route}
              onPress={() => route && navigation.navigate(route as never)}
              style={[
                styles.tab,
                dark ? styles.tabDark : styles.tabLight,
                isActive && styles.tabActive,
              ]}
              focusedStyle={scFocusOutline}
            >
              <Text
                style={[
                  styles.tabText,
                  dark ? styles.tabTextDark : styles.tabTextLight,
                  isActive && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </Focusable>
          );
        })}
      </View>
      <Focusable
        onPress={() => navigation.navigate("ScPresent")}
        style={styles.presentationModeButton}
        focusedStyle={scFocusOnPrimary}
      >
        <Text style={styles.presentationModeText}>Presentation Mode</Text>
      </Focusable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scTheme.spacing.xl,
    paddingVertical: scTheme.spacing.xl,
  },
  logo: {
    color: scTheme.colors.primary,
    fontSize: scTheme.fontSize.lg,
    fontWeight: "800",
    letterSpacing: 3,
  },
  tabs: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: scTheme.spacing.sm,
    marginLeft: scTheme.spacing.md,
  },
  tab: {
    paddingHorizontal: scTheme.spacing.md - 2,
    paddingVertical: scTheme.spacing.sm - 1,
    borderRadius: scTheme.borderRadius.pill,
  },
  tabDark: {
    backgroundColor: scTheme.colors.chipDark,
  },
  tabLight: {
    backgroundColor: scTheme.colors.surfaceMuted,
  },
  tabActive: {
    backgroundColor: scTheme.colors.primary,
  },
  tabText: {
    fontSize: scTheme.fontSize.sm,
    fontWeight: "600",
  },
  tabTextDark: {
    color: "#FFFFFF",
  },
  tabTextLight: {
    color: scTheme.colors.textSecondary,
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  presentationModeButton: {
    backgroundColor: scTheme.colors.primary,
    borderRadius: scTheme.borderRadius.pill,
    paddingHorizontal: scTheme.spacing.md,
    paddingVertical: scTheme.spacing.sm - 1,
    marginLeft: scTheme.spacing.sm,
  },
  presentationModeText: {
    color: "#FFFFFF",
    fontSize: scTheme.fontSize.sm,
    fontWeight: "700",
  },
});
