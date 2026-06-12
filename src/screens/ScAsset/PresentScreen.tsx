import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Animated,
  PanResponder,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { ScHeader } from "./components/ScHeader";
import { ProjectCard } from "./components/ProjectCard";
import { SC_PROJECTS, formatPriceThai } from "./data";
import { scTheme } from "./theme";

type Nav = NativeStackNavigationProp<RootStackParamList, "ScPresent">;

export const ScPresentScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [projectIndex, setProjectIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const { height } = useWindowDimensions();

  const project = SC_PROJECTS[projectIndex];
  const gallery = project.gallery.length ? project.gallery : [project.imageUrl];
  const suggestions = SC_PROJECTS.filter((p) => p.id !== project.id).slice(
    0,
    3,
  );

  useEffect(() => {
    setImageIndex(0);
    fadeAnim.setValue(1);
  }, [project.id]);

  const showImage = (direction: 1 | -1) => {
    if (gallery.length <= 1) return;
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setImageIndex(
        (prev) => (prev + direction + gallery.length) % gallery.length,
      );
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const showImageRef = useRef(showImage);
  showImageRef.current = showImage;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 10 &&
        Math.abs(gesture.dx) > Math.abs(gesture.dy),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx <= -50) showImageRef.current(1);
        else if (gesture.dx >= 50) showImageRef.current(-1);
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View
          style={[styles.hero, { height: height / 1.5 }]}
          {...panResponder.panHandlers}
        >
          <Animated.Image
            source={{ uri: gallery[imageIndex] }}
            style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}
            resizeMode="cover"
          />
          <Pressable
            style={styles.heroOverlay}
            onPress={() =>
              navigation.navigate("ScProjectDetail", { projectId: project.id })
            }
          >
            <ScHeader active="Present" variant="dark" />

            <View style={styles.heroBottom}>
              <View style={styles.newTag}>
                <Text style={styles.newTagText}>โครงการ{project.tag}</Text>
              </View>
              <Text style={styles.heroTitle}>{project.name}</Text>
              <Text style={styles.heroSubtitle}>
                {project.type} • {project.location}
              </Text>
              {gallery.length > 1 && (
                <View style={styles.dots}>
                  {gallery.map((_, i) => (
                    <View
                      key={i}
                      style={[styles.dot, i === imageIndex && styles.dotActive]}
                    />
                  ))}
                </View>
              )}
            </View>
          </Pressable>
        </View>

        <View style={styles.body}>
          <View style={styles.priceColumn}>
            <Text style={styles.priceLabel}>ราคาเริ่มต้น</Text>
            <Text style={styles.price}>
              {formatPriceThai(project.priceFrom)}
            </Text>
            <Text style={styles.priceMax}>
              ~ {formatPriceThai(project.priceTo)}
            </Text>

            <View style={styles.specsRow}>
              <View style={styles.specCell}>
                <Text style={styles.specLabel}>ที่ดิน</Text>
                <Text style={styles.specValue}>{project.landArea}</Text>
              </View>
              <View style={[styles.specCell, styles.specCellDivider]}>
                <Text style={styles.specLabel}>บ้าน</Text>
                <Text style={styles.specValue}>{project.usableArea}</Text>
              </View>
              <View style={styles.specCell}>
                <Text style={styles.specLabel}>ห้องนอน</Text>
                <Text style={styles.specValue}>{project.bedrooms}</Text>
              </View>
            </View>

            <View style={styles.ctaRow}>
              <Pressable
                style={styles.cta}
                onPress={() =>
                  navigation.navigate("ScRegister", { projectId: project.id })
                }
              >
                <Text style={styles.ctaText}>นำเสนอโครงการนี้</Text>
              </Pressable>
              <Pressable
                style={styles.heartButton}
                onPress={() => setLiked(!liked)}
              >
                <Text style={styles.heartText}>{liked ? "❤️" : "♡"}</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.sideColumn}>
            <Text style={styles.sideTitle}>โครงการอื่นๆ ที่น่าสนใจ</Text>
            {suggestions.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onPress={() =>
                  setProjectIndex(SC_PROJECTS.findIndex((sp) => sp.id === p.id))
                }
              />
            ))}
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
  scroll: {
    flexGrow: 1,
  },
  hero: {
    width: "100%",
    backgroundColor: scTheme.colors.text,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: scTheme.colors.heroOverlay,
    justifyContent: "space-between",
  },
  heroBottom: {
    paddingHorizontal: scTheme.spacing.xl,
    paddingBottom: scTheme.spacing.lg,
    gap: scTheme.spacing.sm,
  },
  newTag: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    borderRadius: scTheme.borderRadius.pill,
    paddingHorizontal: scTheme.spacing.md,
    paddingVertical: 3,
  },
  newTagText: {
    color: "#FFFFFF",
    fontSize: scTheme.fontSize.xs,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: scTheme.fontSize.display,
    fontWeight: "800",
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: scTheme.fontSize.md,
  },
  dots: {
    flexDirection: "row",
    gap: scTheme.spacing.sm,
    marginTop: scTheme.spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  dotActive: {
    backgroundColor: scTheme.colors.primary,
    width: 24,
  },
  body: {
    flex: 1,
    flexDirection: "row",
    gap: scTheme.spacing.xl,
    paddingHorizontal: scTheme.spacing.xl,
    paddingVertical: scTheme.spacing.lg,
  },
  priceColumn: {
    flex: 1.4,
    gap: scTheme.spacing.xs,
  },
  priceLabel: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.sm,
  },
  price: {
    color: scTheme.colors.primary,
    fontSize: scTheme.fontSize.xxl,
    fontWeight: "800",
  },
  priceMax: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.sm,
  },
  specsRow: {
    flexDirection: "row",
    backgroundColor: scTheme.colors.surface,
    borderRadius: scTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: scTheme.colors.border,
    paddingVertical: scTheme.spacing.md,
    marginTop: scTheme.spacing.md,
  },
  specCell: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  specCellDivider: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: scTheme.colors.border,
  },
  specLabel: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.xs,
  },
  specValue: {
    color: scTheme.colors.text,
    fontSize: scTheme.fontSize.sm,
    fontWeight: "700",
  },
  ctaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scTheme.spacing.md,
    marginTop: scTheme.spacing.lg,
  },
  cta: {
    flex: 1,
    backgroundColor: scTheme.colors.primary,
    borderRadius: scTheme.borderRadius.pill,
    paddingVertical: scTheme.spacing.md,
    alignItems: "center",
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: scTheme.fontSize.md,
    fontWeight: "700",
  },
  heartButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: scTheme.colors.border,
    backgroundColor: scTheme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  heartText: {
    fontSize: scTheme.fontSize.lg,
    color: scTheme.colors.primary,
  },
  sideColumn: {
    flex: 1,
    gap: scTheme.spacing.md,
  },
  sideTitle: {
    color: scTheme.colors.text,
    fontSize: scTheme.fontSize.md,
    fontWeight: "700",
  },
});
