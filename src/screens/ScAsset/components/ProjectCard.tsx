import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { ScProject, formatPriceShort } from '../data';
import { scTheme } from '../theme';

type Props = {
  project: ScProject;
  selected?: boolean;
  onPress?: () => void;
};

/** Compact card used in the Present sidebar and the Browse list panel. */
export const ProjectCard: React.FC<Props> = ({ project, selected = false, onPress }) => (
  <Pressable onPress={onPress} style={[styles.card, selected && styles.cardSelected]}>
    <Image source={{ uri: project.imageUrl }} style={styles.thumb} />
    <View style={styles.info}>
      <Text style={styles.name} numberOfLines={1}>
        {project.name}
      </Text>
      <Text style={styles.meta} numberOfLines={1}>
        {project.type} • {project.location}
      </Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{formatPriceShort(project.priceFrom)}</Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{project.tag}</Text>
        </View>
      </View>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scTheme.spacing.md,
    backgroundColor: scTheme.colors.surface,
    borderRadius: scTheme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: scTheme.colors.border,
    padding: scTheme.spacing.sm,
  },
  cardSelected: {
    borderColor: scTheme.colors.primary,
    backgroundColor: '#FFF9F4',
  },
  thumb: {
    width: 72,
    height: 56,
    borderRadius: scTheme.borderRadius.sm,
    backgroundColor: scTheme.colors.surfaceMuted,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    color: scTheme.colors.text,
    fontSize: scTheme.fontSize.sm,
    fontWeight: '700',
  },
  meta: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scTheme.spacing.sm,
    marginTop: 2,
  },
  price: {
    color: scTheme.colors.primary,
    fontSize: scTheme.fontSize.sm,
    fontWeight: '800',
  },
  tag: {
    backgroundColor: scTheme.colors.surfaceMuted,
    borderRadius: scTheme.borderRadius.pill,
    paddingHorizontal: scTheme.spacing.sm,
    paddingVertical: 2,
  },
  tagText: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.xs,
  },
});
