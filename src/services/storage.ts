import AsyncStorage from '@react-native-async-storage/async-storage';
import { CachedShow } from './imageDownloader';
import { Project } from './projects';

const SHOWS_KEY = 'cached_shows';
const PROJECTS_KEY = 'map_projects';

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

export const saveProjects = (projects: Project[]) =>
  AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));

export const loadProjects = async (): Promise<Project[] | null> => {
  const raw = await AsyncStorage.getItem(PROJECTS_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const hasProjects = async (): Promise<boolean> => {
  const raw = await AsyncStorage.getItem(PROJECTS_KEY);
  return raw !== null;
};
