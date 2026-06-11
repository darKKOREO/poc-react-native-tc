import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { FocusableItem } from '../../components/FocusableItem';
import { BackButton } from '../../components/BackButton';
import { theme } from '../../theme';
import { loadShows } from '../../services/storage';
import { CachedShow } from '../../services/imageDownloader';

const { width } = Dimensions.get('window');
const COLUMNS = 4;
const CARD_WIDTH = (width - theme.spacing.xl * 2 - theme.spacing.md * (COLUMNS - 1)) / COLUMNS;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

type CardProps = { show: CachedShow };

const ShowCard: React.FC<CardProps> = ({ show }) => (
  <FocusableItem style={styles.card}>
    {({ focused }) => (
      <>
        {show.localImageUri ? (
          <Image
            source={{ uri: show.localImageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <View style={styles.cardInfo}>
          <Text
            style={[styles.showTitle, focused && styles.showTitleFocused]}
            numberOfLines={1}
          >
            {show.name}
          </Text>
          {show.rating.average && (
            <Text style={[styles.rating, focused && styles.ratingFocused]}>
              ★ {show.rating.average.toFixed(1)}
            </Text>
          )}
          {show.genres.length > 0 && (
            <Text
              style={[styles.genres, focused && styles.genresFocused]}
              numberOfLines={1}
            >
              {show.genres.slice(0, 2).join(' · ')}
            </Text>
          )}
        </View>
      </>
    )}
  </FocusableItem>
);

export const DashboardScreen: React.FC = () => {
  const [shows, setShows] = useState<CachedShow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadShows().then(data => {
      if (data) setShows(data);
      setLoading(false);
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: CachedShow }) => <ShowCard show={item} />,
    [],
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton hasTVPreferredFocus />
        <Text style={styles.headerTitle}>MyTV</Text>
      </View>

      <FlatList
        data={shows}
        keyExtractor={item => String(item.id)}
        numColumns={COLUMNS}
        renderItem={renderItem}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centered: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  grid: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  row: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  card: {
    width: CARD_WIDTH,
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: theme.borderRadius.md,
  },
  imagePlaceholder: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  cardInfo: {
    padding: theme.spacing.xs,
    gap: 4,
  },
  showTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
  showTitleFocused: {
    color: theme.colors.background,
  },
  rating: {
    color: '#FFD700',
    fontSize: 16,
  },
  ratingFocused: {
    color: theme.colors.background,
  },
  genres: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  genresFocused: {
    color: theme.colors.background,
  },
});
