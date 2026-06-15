import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Map as MapView, Camera, Marker, type CameraRef } from '@maplibre/maplibre-react-native';
import { MAP_STYLE_URL } from '@/config/mapConfig';
import { MAP_MIN_ZOOM, MAP_MAX_ZOOM } from '@/services/mapTiles';
import { RootStackParamList } from '../../navigation';
import { Focusable } from '../../components/Focusable';
import { ProjectCard } from './components/ProjectCard';
import { SC_PROJECTS, ScProject, formatPriceShort } from './data';
import { scTheme, scFocusRing } from './theme';

type Nav = NativeStackNavigationProp<RootStackParamList, 'ScBrowse'>;

const INITIAL_CENTER: [number, number] = [100.55, 13.82];
const INITIAL_ZOOM = 10;

const FILTER_CHIPS = ['ทุกประเภท ▾', 'งบประมาณ ▾', 'โครงการใหม่'];

export const ScBrowseScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const cameraRef = useRef<CameraRef>(null);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(SC_PROJECTS[0].id);

  const query = search.trim().toLowerCase();
  const projects = query
    ? SC_PROJECTS.filter(
        p => p.name.toLowerCase().includes(query) || p.location.toLowerCase().includes(query),
      )
    : SC_PROJECTS;

  const selectFromList = (project: ScProject) => {
    setSelectedId(project.id);
    cameraRef.current?.flyTo({
      center: [project.lng, project.lat],
      zoom: 12,
      duration: 600,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapPane}>
        <MapView mapStyle={MAP_STYLE_URL} style={styles.map}>
          <Camera
            ref={cameraRef}
            initialViewState={{ center: INITIAL_CENTER, zoom: INITIAL_ZOOM }}
            minZoom={MAP_MIN_ZOOM}
            maxZoom={MAP_MAX_ZOOM}
          />
          {projects.map(project => (
            <Marker key={project.id} lngLat={[project.lng, project.lat]}>
              <Pressable
                onPress={() => setSelectedId(project.id)}
                style={[styles.pin, project.id === selectedId && styles.pinSelected]}
              >
                <Text
                  style={[styles.pinText, project.id === selectedId && styles.pinTextSelected]}
                >
                  {formatPriceShort(project.priceFrom)}
                </Text>
              </Pressable>
            </Marker>
          ))}
        </MapView>

        <View style={styles.searchOverlay}>
          <Focusable onPress={() => navigation.goBack()} hitSlop={8} focusedStyle={scFocusRing}>
            <Text style={styles.backIcon}>←</Text>
          </Focusable>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="ค้นหาโครงการจากที่นี่..."
            placeholderTextColor={scTheme.colors.textSecondary}
          />
        </View>
      </View>

      <View style={styles.listPane}>
        <View style={styles.listHeader}>
          <Text style={styles.logo}>SC ASSET</Text>
          <View style={styles.miniTabs}>
            {(['Present', 'Consult', 'Browse', 'Register'] as const).map(tab => (
              <Focusable
                key={tab}
                disabled={tab === 'Browse'}
                focusedStyle={scFocusRing}
                onPress={() => {
                  if (tab === 'Present') navigation.navigate('ScPresentNormal');
                  else if (tab === 'Consult') navigation.navigate('ScConsult');
                  else navigation.navigate('ScRegister', {});
                }}
              >
                <Text style={[styles.miniTab, tab === 'Browse' && styles.miniTabActive]}>
                  {tab}
                </Text>
              </Focusable>
            ))}
          </View>
        </View>

        <View style={styles.countRow}>
          <Text style={styles.countText}>{projects.length} โครงการ</Text>
          <Text style={styles.filterIcon}>⚙︎ ตัวกรอง</Text>
        </View>

        <View style={styles.chipsRow}>
          {FILTER_CHIPS.map((chip, i) => (
            <View key={chip} style={[styles.chip, i === 0 && styles.chipActive]}>
              <Text style={[styles.chipText, i === 0 && styles.chipTextActive]}>{chip}</Text>
            </View>
          ))}
        </View>

        <ScrollView contentContainerStyle={styles.cards}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              selected={project.id === selectedId}
              hasTVPreferredFocus={i === 0}
              onPress={() => {
                if (project.id === selectedId) {
                  navigation.navigate('ScProjectDetail', { projectId: project.id });
                } else {
                  selectFromList(project);
                }
              }}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: scTheme.colors.background,
  },
  mapPane: {
    flex: 1.1,
  },
  map: {
    flex: 1,
  },
  searchOverlay: {
    position: 'absolute',
    top: scTheme.spacing.md,
    left: scTheme.spacing.md,
    right: scTheme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: scTheme.spacing.sm,
    backgroundColor: scTheme.colors.surface,
    borderRadius: scTheme.borderRadius.pill,
    paddingHorizontal: scTheme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  backIcon: {
    color: scTheme.colors.text,
    fontSize: scTheme.fontSize.lg,
  },
  searchInput: {
    flex: 1,
    paddingVertical: scTheme.spacing.sm + 2,
    color: scTheme.colors.text,
    fontSize: scTheme.fontSize.sm,
  },
  pin: {
    backgroundColor: '#2B2622',
    borderRadius: scTheme.borderRadius.pill,
    paddingHorizontal: scTheme.spacing.md,
    paddingVertical: 5,
  },
  pinSelected: {
    backgroundColor: scTheme.colors.primary,
    transform: [{ scale: 1.15 }],
  },
  pinText: {
    color: '#FFFFFF',
    fontSize: scTheme.fontSize.xs,
    fontWeight: '700',
  },
  pinTextSelected: {
    color: '#FFFFFF',
  },
  listPane: {
    flex: 1,
    backgroundColor: scTheme.colors.surface,
    paddingHorizontal: scTheme.spacing.lg,
    paddingTop: scTheme.spacing.md,
  },
  listHeader: {
    gap: scTheme.spacing.sm,
  },
  logo: {
    color: scTheme.colors.primary,
    fontSize: scTheme.fontSize.md,
    fontWeight: '800',
    letterSpacing: 3,
  },
  miniTabs: {
    flexDirection: 'row',
    gap: scTheme.spacing.md,
  },
  miniTab: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.xs,
    paddingVertical: 4,
  },
  miniTabActive: {
    color: '#FFFFFF',
    backgroundColor: scTheme.colors.primary,
    borderRadius: scTheme.borderRadius.pill,
    paddingHorizontal: scTheme.spacing.md,
    overflow: 'hidden',
    fontWeight: '700',
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scTheme.spacing.md,
  },
  countText: {
    color: scTheme.colors.text,
    fontSize: scTheme.fontSize.md,
    fontWeight: '700',
  },
  filterIcon: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.xs,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: scTheme.spacing.sm,
    marginTop: scTheme.spacing.sm,
  },
  chip: {
    backgroundColor: scTheme.colors.surfaceMuted,
    borderRadius: scTheme.borderRadius.pill,
    paddingHorizontal: scTheme.spacing.md,
    paddingVertical: 5,
  },
  chipActive: {
    backgroundColor: scTheme.colors.primary,
  },
  chipText: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.xs,
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cards: {
    gap: scTheme.spacing.sm,
    paddingVertical: scTheme.spacing.md,
  },
});
