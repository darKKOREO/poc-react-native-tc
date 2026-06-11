import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, NativeSyntheticEvent } from 'react-native';
import {
  Map as MapView,
  Camera,
  Marker,
  type CameraRef,
  type ViewStateChangeEvent,
  type LngLatBounds,
} from '@maplibre/maplibre-react-native';
import Supercluster from 'supercluster';
import { MAP_STYLE_URL } from '@/config/mapConfig';
import { BANGKOK_BOUNDS, MAP_MIN_ZOOM, MAP_MAX_ZOOM, ensureOfflinePack } from '@/services/mapTiles';
import { Project, MOCK_PROJECTS } from '@/services/projects';
import { saveProjects, loadProjects, hasProjects } from '@/services/storage';
import { BackButton } from '@/components/BackButton';
import { PriceBubble } from './PriceBubble';
import { ClusterBubble } from './ClusterBubble';
import { ProjectListPanel } from './ProjectListPanel';
import { styles, mapTheme } from './styles';

type PointProps = { projectId: string };

const INITIAL_ZOOM = MAP_MIN_ZOOM + 2;
const INITIAL_CENTER: [number, number] = [
  (BANGKOK_BOUNDS[0] + BANGKOK_BOUNDS[2]) / 2,
  (BANGKOK_BOUNDS[1] + BANGKOK_BOUNDS[3]) / 2,
];
const DETAIL_ZOOM = MAP_MAX_ZOOM - 2;

const isWithinBounds = (project: Project, bounds: LngLatBounds): boolean => {
  const [west, south, east, north] = bounds;
  return project.lng >= west && project.lng <= east && project.lat >= south && project.lat <= north;
};

export const MapProjectScreen: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [visibleBounds, setVisibleBounds] = useState<LngLatBounds>(BANGKOK_BOUNDS);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const cameraRef = useRef<CameraRef>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        await ensureOfflinePack((percentage) => {
          if (!cancelled) setDownloadProgress(percentage);
        });
      } catch (e) {
        console.error('[MapProject] offline pack setup failed:', e);
      }

      if (!(await hasProjects())) {
        await saveProjects(MOCK_PROJECTS);
      }
      const loaded = await loadProjects();
      if (!cancelled) {
        setProjects(loaded ?? MOCK_PROJECTS);
        setLoading(false);
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const clusterIndex = useMemo(() => {
    const index = new Supercluster<PointProps>({ radius: 50, maxZoom: MAP_MAX_ZOOM });
    const points: Supercluster.PointFeature<PointProps>[] = projects.map((project) => ({
      type: 'Feature',
      properties: { projectId: project.id },
      geometry: { type: 'Point', coordinates: [project.lng, project.lat] },
    }));
    index.load(points);
    return index;
  }, [projects]);

  const projectsById = useMemo(() => {
    const map: Record<string, Project> = {};
    projects.forEach((p) => {
      map[p.id] = p;
    });
    return map;
  }, [projects]);

  const clusters = useMemo(() => {
    return clusterIndex.getClusters(visibleBounds, Math.round(zoom));
  }, [clusterIndex, visibleBounds, zoom]);

  const visibleProjects = useMemo(
    () => projects.filter((project) => isWithinBounds(project, visibleBounds)),
    [projects, visibleBounds],
  );

  const handleRegionDidChange = useCallback(
    (event: NativeSyntheticEvent<ViewStateChangeEvent>) => {
      const { bounds, zoom: newZoom } = event.nativeEvent;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setVisibleBounds(bounds);
        setZoom(newZoom);
      }, 250);
    },
    [],
  );

  const handleSelectFromMap = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
  }, []);

  const handleSelectFromList = useCallback((project: Project) => {
    setSelectedProjectId(project.id);
    cameraRef.current?.flyTo({
      center: [project.lng, project.lat],
      zoom: Math.max(zoom, DETAIL_ZOOM),
      duration: 600,
    });
  }, [zoom]);

  const handleClusterPress = useCallback(
    (clusterId: number, coordinates: [number, number]) => {
      const expansionZoom = clusterIndex.getClusterExpansionZoom(clusterId);
      cameraRef.current?.flyTo({
        center: coordinates,
        zoom: Math.min(expansionZoom, MAP_MAX_ZOOM),
        duration: 600,
      });
    },
    [clusterIndex],
  );

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <BackButton hasTVPreferredFocus style={styles.backButton} />
        <MapLibreMap
          onRegionDidChange={handleRegionDidChange}
          cameraRef={cameraRef}
        >
          {clusters.map((feature) => {
            const [lng, lat] = feature.geometry.coordinates;
            if ('cluster' in feature.properties && feature.properties.cluster) {
              const clusterFeature = feature as Supercluster.ClusterFeature<PointProps>;
              return (
                <Marker key={`cluster-${clusterFeature.properties.cluster_id}`} lngLat={[lng, lat]}>
                  <ClusterBubble
                    count={clusterFeature.properties.point_count}
                    onPress={() =>
                      handleClusterPress(clusterFeature.properties.cluster_id, [lng, lat])
                    }
                  />
                </Marker>
              );
            }
            const pointFeature = feature as Supercluster.PointFeature<PointProps>;
            const project = projectsById[pointFeature.properties.projectId];
            if (!project) return null;
            return (
              <Marker key={`project-${project.id}`} lngLat={[lng, lat]}>
                <PriceBubble
                  priceFrom={project.priceFrom}
                  selected={project.id === selectedProjectId}
                  onPress={() => handleSelectFromMap(project.id)}
                />
              </Marker>
            );
          })}
        </MapLibreMap>

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={mapTheme.colors.bubbleSelected} />
            <Text style={styles.loadingText}>
              {downloadProgress !== null
                ? `Downloading offline map... ${downloadProgress.toFixed(0)}%`
                : 'Preparing map...'}
            </Text>
          </View>
        )}
      </View>

      <ProjectListPanel
        projects={visibleProjects}
        selectedProjectId={selectedProjectId}
        onSelectProject={handleSelectFromList}
      />
    </View>
  );
};

type MapLibreMapProps = {
  onRegionDidChange: (event: NativeSyntheticEvent<ViewStateChangeEvent>) => void;
  cameraRef: React.Ref<CameraRef>;
  children?: React.ReactNode;
};

const MapLibreMap: React.FC<MapLibreMapProps> = ({ onRegionDidChange, cameraRef, children }) => (
  <MapView mapStyle={MAP_STYLE_URL} style={styles.map} onRegionDidChange={onRegionDidChange}>
    <Camera
      ref={cameraRef}
      initialViewState={{ center: INITIAL_CENTER, zoom: INITIAL_ZOOM }}
      minZoom={MAP_MIN_ZOOM}
      maxZoom={MAP_MAX_ZOOM}
      maxBounds={BANGKOK_BOUNDS}
    />
    {children}
  </MapView>
);
