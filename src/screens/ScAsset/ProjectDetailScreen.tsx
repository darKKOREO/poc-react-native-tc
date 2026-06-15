import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { Focusable } from "../../components/Focusable";
import { getProject, formatPriceFull } from "./data";
import {
  scTheme,
  scFocusRing,
  scFocusOutline,
  scFocusOnPrimary,
} from "./theme";

type Nav = NativeStackNavigationProp<RootStackParamList, "ScProjectDetail">;
type Route = RouteProp<RootStackParamList, "ScProjectDetail">;

const TABS = ["Overview", "สิ่งอำนวยความสะดวก", "ผังบ้าน"] as const;

export const ScProjectDetailScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const project = getProject(route.params.projectId);

  const [imageIndex, setImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Overview");
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Focusable
          hasTVPreferredFocus
          onPress={() => navigation.goBack()}
          hitSlop={12}
          focusedStyle={scFocusRing}
        >
          <Text style={styles.backText}>← กลับ</Text>
        </Focusable>
        <Text style={styles.logo}>SC ASSET</Text>
        <View style={styles.topActions}>
          <Focusable
            onPress={() => setLiked(!liked)}
            hitSlop={8}
            focusedStyle={scFocusRing}
          >
            <Text style={styles.actionIcon}>{liked ? "❤️" : "♡"}</Text>
          </Focusable>
          <Text style={styles.actionIcon}>↗</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.columns}>
          <View style={styles.leftColumn}>
            <Image
              source={{ uri: project.gallery[imageIndex] }}
              style={styles.mainImage}
            />
            <View style={styles.thumbRow}>
              {project.gallery.map((uri, i) => (
                <Focusable
                  key={uri}
                  onPress={() => setImageIndex(i)}
                  style={styles.thumbWrap}
                  focusedStyle={scFocusOutline}
                >
                  <Image
                    source={{ uri }}
                    style={[
                      styles.thumb,
                      i === imageIndex && styles.thumbActive,
                    ]}
                  />
                </Focusable>
              ))}
            </View>

            <View style={styles.tabsRow}>
              {TABS.map((tab) => (
                <Focusable
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={styles.tabItem}
                  focusedStyle={scFocusRing}
                >
                  <Text
                    style={[
                      styles.tabText,
                      tab === activeTab && styles.tabTextActive,
                    ]}
                  >
                    {tab}
                  </Text>
                  {tab === activeTab && <View style={styles.tabUnderline} />}
                </Focusable>
              ))}
            </View>
            <Text style={styles.description}>{project.description}</Text>
          </View>

          <View style={styles.rightColumn}>
            <Text style={styles.breadcrumb}>
              {project.type} • โครงการ{project.tag}
            </Text>
            <Text style={styles.title}>{project.name}</Text>
            <Text style={styles.location}>📍 {project.location}, กรุงเทพฯ</Text>

            <Text style={styles.priceLabel}>ราคาเริ่มต้น</Text>
            <Text style={styles.price}>
              {formatPriceFull(project.priceFrom)}
            </Text>
            <Text style={styles.priceMax}>
              ~ {formatPriceFull(project.priceTo)}
            </Text>

            <View style={styles.specGrid}>
              <View style={styles.specCard}>
                <Text style={styles.specLabel}>พื้นที่ดิน</Text>
                <Text style={styles.specValue}>{project.landArea}</Text>
              </View>
              <View style={styles.specCard}>
                <Text style={styles.specLabel}>พื้นที่ใช้สอย</Text>
                <Text style={styles.specValue}>{project.usableArea}</Text>
              </View>
              <View style={styles.specCard}>
                <Text style={styles.specLabel}>ห้องนอน</Text>
                <Text style={styles.specValue}>{project.bedrooms}</Text>
              </View>
              <View style={styles.specCard}>
                <Text style={styles.specLabel}>ห้องน้ำ</Text>
                <Text style={styles.specValue}>{project.bathrooms}</Text>
              </View>
            </View>

            <View style={styles.amenities}>
              {project.amenities.map((a) => (
                <View key={a.label} style={styles.amenity}>
                  <Text style={styles.amenityIcon}>{a.icon}</Text>
                  <Text style={styles.amenityLabel}>{a.label}</Text>
                </View>
              ))}
            </View>

            <Focusable
              style={styles.cta}
              focusedStyle={scFocusOnPrimary}
              onPress={() =>
                navigation.navigate("ScRegister", { projectId: project.id })
              }
            >
              <Text style={styles.ctaText}>นำเสนอโครงการนี้</Text>
            </Focusable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: scTheme.colors.background,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scTheme.spacing.xl,
    paddingVertical: scTheme.spacing.md,
  },
  backText: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.md,
  },
  logo: {
    color: scTheme.colors.primary,
    fontSize: scTheme.fontSize.lg,
    fontWeight: "800",
    letterSpacing: 3,
  },
  topActions: {
    flexDirection: "row",
    gap: scTheme.spacing.md,
  },
  actionIcon: {
    fontSize: scTheme.fontSize.lg,
    color: scTheme.colors.primary,
  },
  scroll: {
    paddingHorizontal: scTheme.spacing.xl,
    paddingBottom: scTheme.spacing.xl,
  },
  columns: {
    flexDirection: "row",
    gap: scTheme.spacing.xl,
  },
  leftColumn: {
    flex: 1.2,
    gap: scTheme.spacing.md,
  },
  mainImage: {
    width: "100%",
    aspectRatio: 4 / 3,
    borderRadius: scTheme.borderRadius.lg,
    backgroundColor: scTheme.colors.surfaceMuted,
  },
  thumbRow: {
    flexDirection: "row",
    gap: scTheme.spacing.sm,
  },
  thumbWrap: {
    flex: 1,
  },
  thumb: {
    width: "100%",
    aspectRatio: 4 / 3,
    borderRadius: scTheme.borderRadius.sm,
    borderWidth: 2,
    borderColor: "transparent",
    backgroundColor: scTheme.colors.surfaceMuted,
  },
  thumbActive: {
    borderColor: scTheme.colors.primary,
  },
  tabsRow: {
    flexDirection: "row",
    gap: scTheme.spacing.lg,
    borderBottomWidth: 1,
    borderColor: scTheme.colors.border,
    marginTop: scTheme.spacing.sm,
  },
  tabItem: {
    paddingBottom: scTheme.spacing.sm,
  },
  tabText: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.sm,
  },
  tabTextActive: {
    color: scTheme.colors.text,
    fontWeight: "700",
  },
  tabUnderline: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: scTheme.colors.primary,
  },
  description: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.sm,
    lineHeight: 22,
  },
  rightColumn: {
    flex: 1,
    gap: scTheme.spacing.xs,
  },
  breadcrumb: {
    color: scTheme.colors.primary,
    fontSize: scTheme.fontSize.xs,
    fontWeight: "600",
  },
  title: {
    color: scTheme.colors.text,
    fontSize: scTheme.fontSize.xxl,
    fontWeight: "800",
  },
  location: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.sm,
    marginBottom: scTheme.spacing.md,
  },
  priceLabel: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.xs,
  },
  price: {
    color: scTheme.colors.primary,
    fontSize: scTheme.fontSize.xxl,
    fontWeight: "800",
  },
  priceMax: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.sm,
    marginBottom: scTheme.spacing.md,
  },
  specGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scTheme.spacing.sm,
  },
  specCard: {
    flexBasis: "48%",
    flexGrow: 1,
    backgroundColor: scTheme.colors.surface,
    borderRadius: scTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: scTheme.colors.border,
    padding: scTheme.spacing.md,
    gap: 2,
  },
  specLabel: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.xs,
  },
  specValue: {
    color: scTheme.colors.text,
    fontSize: scTheme.fontSize.md,
    fontWeight: "700",
  },
  amenities: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: scTheme.spacing.md,
    rowGap: scTheme.spacing.md,
  },
  amenity: {
    flexBasis: "50%",
    flexDirection: "row",
    alignItems: "center",
    gap: scTheme.spacing.sm,
  },
  amenityIcon: {
    fontSize: scTheme.fontSize.md,
  },
  amenityLabel: {
    color: scTheme.colors.text,
    fontSize: scTheme.fontSize.sm,
  },
  cta: {
    backgroundColor: scTheme.colors.primary,
    borderRadius: scTheme.borderRadius.pill,
    paddingVertical: scTheme.spacing.md,
    alignItems: "center",
    marginTop: scTheme.spacing.lg,
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: scTheme.fontSize.md,
    fontWeight: "700",
  },
});
