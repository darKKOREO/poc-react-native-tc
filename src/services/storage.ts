import AsyncStorage from '@react-native-async-storage/async-storage';
import { Show } from './api';

const SHOWS_KEY = 'cached_shows';

export const saveShows = (shows: Show[]) =>
  AsyncStorage.setItem(SHOWS_KEY, JSON.stringify(shows));

export const loadShows = async (): Promise<Show[] | null> => {
  const raw = await AsyncStorage.getItem(SHOWS_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const hasShows = async (): Promise<boolean> => {
  const raw = await AsyncStorage.getItem(SHOWS_KEY);
  return raw !== null;
};
