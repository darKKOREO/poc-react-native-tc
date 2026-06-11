import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { Project } from '@/services/projects';
import { mapTheme } from './styles';

const formatPrice = (price: number): string => `From ฿${(price / 1000000).toFixed(2)}M`;

type ProjectListPanelProps = {
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (project: Project) => void;
};

export const ProjectListPanel: React.FC<ProjectListPanelProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
}) => {
  const listRef = useRef<FlatList<Project>>(null);

  useEffect(() => {
    if (!selectedProjectId) return;
    const index = projects.findIndex((p) => p.id === selectedProjectId);
    if (index >= 0) {
      listRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
    }
  }, [selectedProjectId, projects]);

  return (
    <View style={styles.panel}>
      <Text style={styles.header}>Projects in view ({projects.length})</Text>
      <FlatList
        ref={listRef}
        data={projects}
        keyExtractor={(item) => item.id}
        onScrollToIndexFailed={() => {}}
        renderItem={({ item }) => {
          const selected = item.id === selectedProjectId;
          return (
            <Pressable
              onPress={() => onSelectProject(item)}
              style={[styles.card, selected && styles.cardSelected]}
            >
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.name}
              </Text>
              {item.province && <Text style={styles.cardSubtitle}>{item.province}</Text>}
              <Text style={styles.cardPrice}>{formatPrice(item.priceFrom)}</Text>
            </Pressable>
          );
        }}
        ListEmptyComponent={<Text style={styles.empty}>No projects in this area</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    flex: 35,
    backgroundColor: mapTheme.colors.panelBackground,
    borderLeftWidth: 1,
    borderLeftColor: mapTheme.colors.border,
  },
  header: {
    padding: mapTheme.spacing.md,
    fontSize: mapTheme.fontSize.md,
    fontWeight: '700',
    color: mapTheme.colors.text,
  },
  card: {
    marginHorizontal: mapTheme.spacing.md,
    marginBottom: mapTheme.spacing.sm,
    padding: mapTheme.spacing.md,
    borderRadius: mapTheme.borderRadius.sm,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: mapTheme.colors.border,
  },
  cardSelected: {
    borderColor: mapTheme.colors.bubbleSelected,
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: mapTheme.fontSize.md,
    fontWeight: '600',
    color: mapTheme.colors.text,
  },
  cardSubtitle: {
    fontSize: mapTheme.fontSize.sm,
    color: mapTheme.colors.textSecondary,
    marginTop: 2,
  },
  cardPrice: {
    fontSize: mapTheme.fontSize.sm,
    color: mapTheme.colors.bubbleSelected,
    fontWeight: '700',
    marginTop: mapTheme.spacing.xs,
  },
  empty: {
    padding: mapTheme.spacing.md,
    color: mapTheme.colors.textSecondary,
    textAlign: 'center',
  },
});
