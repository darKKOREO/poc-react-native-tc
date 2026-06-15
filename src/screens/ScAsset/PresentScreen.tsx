import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { Focusable } from '../../components/Focusable';
import { ProjectGridCard } from './components/ProjectGridCard';
import { SC_PROJECTS } from './data';
import { scTheme, scFocusOutline, presentationTheme } from './theme';

type Nav = NativeStackNavigationProp<RootStackParamList, 'ScPresent'>;

export const ScPresentScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>&SC</Text>
        <View style={styles.modeBadge}>
          <Text style={styles.modeBadgeText}>Presentation View</Text>
        </View>
        <View style={styles.topActions}>
          <Focusable
            style={styles.closePill}
            focusedStyle={scFocusOutline}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closePillText}>ปิดนำเสนอ</Text>
          </Focusable>
          <Focusable
            style={styles.closeButton}
            focusedStyle={scFocusOutline}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </Focusable>
        </View>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchPlaceholder}>
          เลือกโครงการที่ต้องการนำเสนอลูกค้าที่นี่
        </Text>
      </View>

      <FlatList
        data={SC_PROJECTS}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({ item, index }) => (
          <ProjectGridCard
            project={item}
            hasTVPreferredFocus={index === 0}
            onPress={() =>
              navigation.navigate('ScProjectDetail', { projectId: item.id })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: presentationTheme.colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scTheme.spacing.xl,
    paddingVertical: scTheme.spacing.lg,
    gap: scTheme.spacing.md,
  },
  logo: {
    color: scTheme.colors.primary,
    fontSize: scTheme.fontSize.lg,
    fontWeight: '800',
    letterSpacing: 3,
  },
  modeBadge: {
    backgroundColor: scTheme.colors.primary,
    borderRadius: scTheme.borderRadius.pill,
    paddingHorizontal: scTheme.spacing.md,
    paddingVertical: scTheme.spacing.sm - 1,
  },
  modeBadgeText: {
    color: '#FFFFFF',
    fontSize: scTheme.fontSize.sm,
    fontWeight: '700',
  },
  topActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: scTheme.spacing.md,
  },
  closePill: {
    backgroundColor: presentationTheme.colors.surface,
    borderRadius: scTheme.borderRadius.pill,
    paddingHorizontal: scTheme.spacing.md,
    paddingVertical: scTheme.spacing.sm - 1,
  },
  closePillText: {
    color: presentationTheme.colors.textMuted,
    fontSize: scTheme.fontSize.sm,
    fontWeight: '600',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: presentationTheme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: presentationTheme.colors.text,
    fontSize: scTheme.fontSize.md,
    fontWeight: '700',
  },
  searchBar: {
    marginHorizontal: scTheme.spacing.xl,
    marginBottom: scTheme.spacing.lg,
    backgroundColor: presentationTheme.colors.surface,
    borderRadius: scTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: presentationTheme.colors.border,
    paddingHorizontal: scTheme.spacing.md,
    paddingVertical: scTheme.spacing.md,
  },
  searchPlaceholder: {
    color: presentationTheme.colors.textMuted,
    fontSize: scTheme.fontSize.sm,
  },
  grid: {
    paddingHorizontal: scTheme.spacing.xl,
    paddingBottom: scTheme.spacing.xl,
    gap: scTheme.spacing.md,
  },
  row: {
    gap: scTheme.spacing.md,
    marginBottom: scTheme.spacing.md,
  },
});
