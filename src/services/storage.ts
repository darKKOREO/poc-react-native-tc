import AsyncStorage from '@react-native-async-storage/async-storage';
import { CachedShow } from './imageDownloader';

const SHOWS_KEY = 'cached_shows';

export const saveShows = (shows: CachedShow[]) =>
  AsyncStorage.setItem(SHOWS_KEY, JSON.stringify(shows));

export const loadShows = async (): Promise<CachedShow[] | null> => {
  const raw = await AsyncStorage.getItem(SHOWS_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const hasShows = async (): Promise<boolean> => {
  const raw = await AsyncStorage.getItem(SHOWS_KEY);
  return raw !== null;
};
