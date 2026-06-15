import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Focusable } from '../../../components/Focusable';
import { ScProject, formatPriceRange } from '../data';
import { scTheme, scFocusOutline, presentationTheme } from '../theme';

type Props = {
  project: ScProject;
  onPress?: () => void;
  hasTVPreferredFocus?: boolean;
};

/** Vertical project card for the Presentation Mode project list grid. */
export const ProjectGridCard: React.FC<Props> = ({ project, onPress, hasTVPreferredFocus }) => (
  <Focusable
    hasTVPreferredFocus={hasTVPreferredFocus}
    onPress={onPress}
    style={styles.card}
    focusedStyle={scFocusOutline}
  >
    <View style={styles.imageWrap}>
      <Image source={{ uri: project.imageUrl }} style={styles.image} />
      <View style={styles.tag}>
        <Text style={styles.tagText}>โครงการ{project.tag}</Text>
      </View>
      <View style={styles.priceBadge}>
        <Text style={styles.priceText}>
          {formatPriceRange(project.priceFrom, project.priceTo)}
        </Text>
      </View>
    </View>
    <View style={styles.info}>
      <Text style={styles.name} numberOfLines={1}>
        {project.name}
      </Text>
      <Text style={styles.location} numberOfLines={1}>
        📍 {project.location}
      </Text>
      <Text style={styles.cta} numberOfLines={1}>
        ▸ นำเสนอโครงการนี้
      </Text>
    </View>
  </Focusable>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: presentationTheme.colors.surface,
    borderRadius: scTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: presentationTheme.colors.border,
    overflow: 'hidden',
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: presentationTheme.colors.border,
  },
  tag: {
    position: 'absolute',
    top: scTheme.spacing.sm,
    left: scTheme.spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: scTheme.borderRadius.pill,
    paddingHorizontal: scTheme.spacing.sm,
    paddingVertical: 2,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: scTheme.fontSize.xs,
  },
  priceBadge: {
    position: 'absolute',
    bottom: scTheme.spacing.sm,
    left: scTheme.spacing.sm,
    backgroundColor: scTheme.colors.primary,
    borderRadius: scTheme.borderRadius.pill,
    paddingHorizontal: scTheme.spacing.sm,
    paddingVertical: 2,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: scTheme.fontSize.xs,
    fontWeight: '700',
  },
  info: {
    padding: scTheme.spacing.sm,
    gap: 2,
  },
  name: {
    color: presentationTheme.colors.text,
    fontSize: scTheme.fontSize.md,
    fontWeight: '700',
  },
  location: {
    color: presentationTheme.colors.textMuted,
    fontSize: scTheme.fontSize.xs,
  },
  cta: {
    color: scTheme.colors.primary,
    fontSize: scTheme.fontSize.xs,
    fontWeight: '600',
    marginTop: 2,
  },
});
