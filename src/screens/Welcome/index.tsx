import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, findNodeHandle } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FocusableItem } from '../../components/FocusableItem';
import { BackButton } from '../../components/BackButton';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation';
import { fetchShows } from '../../services/api';
import { saveShows, hasShows } from '../../services/storage';
import { downloadAllImages } from '../../services/imageDownloader';

type WelcomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

type SyncState = 'idle' | 'syncing' | 'done' | 'error';

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeNavProp>();
  const [syncState, setSyncState] = useState<SyncState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [dataExists, setDataExists] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const railRef = useRef<ScrollView>(null);
  const syncRef = useRef<View>(null);
  const browseRef = useRef<View>(null);
  const mapRef = useRef<View>(null);

  const scrollItemIntoView = (itemRef: React.RefObject<View | null>) => {
    const rail = railRef.current;
    const item = itemRef.current;
    if (!rail || !item) return;
    const railHandle = findNodeHandle(rail);
    if (!railHandle) return;
    item.measureLayout(
      railHandle,
      x => rail.scrollTo({ x: Math.max(0, x - theme.spacing.lg), animated: true }),
      () => {},
    );
  };

  useEffect(() => {
    hasShows().then(setDataExists);
  }, []);

  const handleSync = async () => {
    console.log('[Sync] button pressed');
    setSyncState('syncing');
    setErrorMsg('');
    try {
      console.log('[Sync] fetching from TVMaze...');
      const shows = await fetchShows();
      console.log(`[Sync] got ${shows.length} shows, downloading images...`);
      setProgress({ done: 0, total: shows.length });
      const cachedShows = await downloadAllImages(shows, (done, total) => {
        setProgress({ done, total });
      });
      await saveShows(cachedShows);
      setDataExists(true);
      setSyncState('done');
      console.log('[Sync] done');
    } catch (e: any) {
      console.error('[Sync] error:', e.message);
      setErrorMsg(e.message ?? 'Unknown error');
      setSyncState('error');
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.logo}>MyTV</Text>
      <Text style={styles.tagline}>Your entertainment, on every screen</Text>

      {syncState === 'syncing' ? (
        <View style={styles.syncingRow}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.syncingText}>
            {progress.total === 0
              ? 'Fetching shows...'
              : `Downloading images... ${progress.done}/${progress.total}`}
          </Text>
        </View>
      ) : (
        <ScrollView
          ref={railRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonRow}
        >
          <View ref={syncRef} collapsable={false}>
            <FocusableItem
              hasTVPreferredFocus={!dataExists}
              onPress={handleSync}
              onFocus={() => scrollItemIntoView(syncRef)}
              style={styles.button}
            >
              {({ focused }) => (
                <Text style={[styles.buttonText, focused && styles.buttonTextFocused]}>
                  {syncState === 'done' ? 'Sync Again' : 'Sync Data'}
                </Text>
              )}
            </FocusableItem>
          </View>

          {dataExists && (
            <View ref={browseRef} collapsable={false}>
              <FocusableItem
                hasTVPreferredFocus
                onPress={() => navigation.navigate('Dashboard')}
                onFocus={() => scrollItemIntoView(browseRef)}
                style={styles.button}
              >
                {({ focused }) => (
                  <Text style={[styles.buttonText, focused && styles.buttonTextFocused]}>
                    Browse
                  </Text>
                )}
              </FocusableItem>
            </View>
          )}

          <View ref={mapRef} collapsable={false}>
            <FocusableItem
              onPress={() => navigation.navigate('MapProject')}
              onFocus={() => scrollItemIntoView(mapRef)}
              style={styles.button}
            >
              {({ focused }) => (
                <Text style={[styles.buttonText, focused && styles.buttonTextFocused]}>
                  Map Demo
                </Text>
              )}
            </FocusableItem>
          </View>
        </ScrollView>
      )}

      {syncState === 'done' && (
        <Text style={styles.successText}>Sync complete — data saved to device</Text>
      )}
      {syncState === 'error' && (
        <Text style={styles.errorText}>Error: {errorMsg}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.lg,
  },
  logo: {
    color: theme.colors.primary,
    fontSize: 96,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  tagline: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.md,
    marginBottom: theme.spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    height: 100,
  },
  button: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.sm,
    minWidth: 260,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
  buttonTextFocused: {
    color: theme.colors.background,
    fontWeight: '700',
  },
  syncingRow: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  syncingText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.md,
  },
  successText: {
    color: '#4CAF50',
    fontSize: theme.fontSize.sm,
  },
  errorText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.sm,
  },
});
