import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { Focusable } from '../../components/Focusable';
import { ScHeader } from './components/ScHeader';
import { PROJECT_TYPES, PROJECT_LOCATIONS, BUDGET_RANGES } from './data';
import { scTheme, scFocusRing, scFocusOnPrimary } from './theme';

type Nav = NativeStackNavigationProp<RootStackParamList, 'ScConsult'>;

export const ScConsultScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>('สุขุมวิท');
  const [selectedBudget, setSelectedBudget] = useState<string | null>('ทุกราคา');

  return (
    <View style={styles.container}>
      <ScHeader active="Consult" tabs={['Present', 'Consult', 'Browse', 'Register']} />

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>ตัวเลือกที่คุณต้องการ?</Text>
        <Text style={styles.subtitle}>ค้นหาหรือเลือกตัวเลือกได้ก่อนได้ ตามความต้องการ</Text>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="ค้นหาชื่อโครงการ..."
            placeholderTextColor={scTheme.colors.textSecondary}
          />
        </View>

        <Text style={styles.sectionTitle}>ประเภท</Text>
        <View style={styles.grid}>
          {PROJECT_TYPES.map((t, i) => {
            const selected = selectedType === t.label;
            return (
              <Focusable
                key={t.label}
                hasTVPreferredFocus={i === 0}
                onPress={() => setSelectedType(selected ? null : t.label)}
                style={[styles.optionCard, styles.gridThird, selected && styles.optionSelected]}
                focusedStyle={scFocusRing}
              >
                <Text style={styles.optionLabel}>
                  {t.icon}  <Text style={[styles.optionLabelText, selected && styles.optionLabelSelected]}>{t.label}</Text>
                </Text>
                <Text style={styles.optionCount}>{t.count} โครงการ</Text>
              </Focusable>
            );
          })}
        </View>

        <Focusable
          style={styles.mapLink}
          focusedStyle={scFocusRing}
          onPress={() => navigation.navigate('ScBrowse')}
        >
          <Text style={styles.mapLinkText}>🗺️ ดูทั้งหมดบนแผนที่</Text>
        </Focusable>

        <Text style={styles.sectionTitle}>พื้นที่โครงการ</Text>
        <View style={styles.grid}>
          {PROJECT_LOCATIONS.map(loc => {
            const selected = selectedLocation === loc.label;
            return (
              <Focusable
                key={loc.label}
                onPress={() => setSelectedLocation(selected ? null : loc.label)}
                style={[styles.optionCard, styles.gridThird, selected && styles.optionSelected]}
                focusedStyle={scFocusRing}
              >
                <Text style={styles.optionLabel}>
                  📍 <Text style={[styles.optionLabelText, selected && styles.optionLabelSelected]}>{loc.label}</Text>
                </Text>
                <Text style={[styles.optionCount, selected && styles.optionCountSelected]}>
                  {loc.count} โครงการ
                </Text>
              </Focusable>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>งบประมาณ</Text>
        <View style={styles.grid}>
          {BUDGET_RANGES.map(b => {
            const selected = selectedBudget === b.label;
            const empty = b.count === 'ไม่มีโครงการ';
            return (
              <Focusable
                key={b.label}
                disabled={empty}
                onPress={() => setSelectedBudget(selected ? null : b.label)}
                style={[
                  styles.optionCard,
                  styles.gridThird,
                  selected && styles.optionSelected,
                  empty && styles.optionDisabled,
                ]}
                focusedStyle={scFocusRing}
              >
                <Text style={styles.optionLabel}>
                  💵 <Text style={[styles.optionLabelText, selected && styles.optionLabelSelected]}>{b.label}</Text>
                </Text>
                <Text style={styles.optionCount}>{b.count}</Text>
              </Focusable>
            );
          })}
        </View>

        <Focusable
          style={styles.cta}
          focusedStyle={scFocusOnPrimary}
          onPress={() => navigation.navigate('ScBrowse')}
        >
          <Text style={styles.ctaText}>ถัดไป →</Text>
        </Focusable>
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
    paddingHorizontal: scTheme.spacing.xl,
    paddingBottom: scTheme.spacing.xl,
  },
  title: {
    color: scTheme.colors.text,
    fontSize: scTheme.fontSize.xxl,
    fontWeight: '800',
    marginTop: scTheme.spacing.md,
  },
  subtitle: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.sm,
    marginTop: scTheme.spacing.xs,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scTheme.spacing.sm,
    backgroundColor: scTheme.colors.surface,
    borderWidth: 1,
    borderColor: scTheme.colors.border,
    borderRadius: scTheme.borderRadius.pill,
    paddingHorizontal: scTheme.spacing.md,
    marginTop: scTheme.spacing.lg,
  },
  searchIcon: {
    fontSize: scTheme.fontSize.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: scTheme.spacing.sm + 2,
    color: scTheme.colors.text,
    fontSize: scTheme.fontSize.sm,
  },
  sectionTitle: {
    color: scTheme.colors.text,
    fontSize: scTheme.fontSize.md,
    fontWeight: '700',
    marginTop: scTheme.spacing.xl,
    marginBottom: scTheme.spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scTheme.spacing.md,
  },
  gridThird: {
    flexBasis: '30%',
    flexGrow: 1,
  },
  optionCard: {
    backgroundColor: scTheme.colors.surfaceMuted,
    borderRadius: scTheme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
    paddingHorizontal: scTheme.spacing.md,
    paddingVertical: scTheme.spacing.md,
    gap: 4,
  },
  optionSelected: {
    backgroundColor: scTheme.colors.primaryLight,
    borderColor: scTheme.colors.primary,
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionLabel: {
    fontSize: scTheme.fontSize.sm,
  },
  optionLabelText: {
    color: scTheme.colors.text,
    fontWeight: '600',
  },
  optionLabelSelected: {
    color: scTheme.colors.primary,
  },
  optionCount: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.xs,
  },
  optionCountSelected: {
    color: scTheme.colors.primary,
  },
  mapLink: {
    alignSelf: 'flex-end',
    marginTop: scTheme.spacing.md,
  },
  mapLinkText: {
    color: scTheme.colors.primary,
    fontSize: scTheme.fontSize.sm,
    fontWeight: '600',
  },
  cta: {
    backgroundColor: scTheme.colors.primary,
    borderRadius: scTheme.borderRadius.pill,
    paddingVertical: scTheme.spacing.md + 2,
    alignItems: 'center',
    marginTop: scTheme.spacing.xl,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: scTheme.fontSize.md,
    fontWeight: '700',
  },
});
