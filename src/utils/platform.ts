import { Platform } from 'react-native';

export const isTV = Platform.isTV;
export const isTvOS = Platform.OS === 'ios' && Platform.isTV;
export const isAndroidTV = Platform.OS === 'android' && Platform.isTV;

// Tizen / webOS detection (web environment)
export const isTizen =
  typeof window !== 'undefined' &&
  typeof (window as any).tizen !== 'undefined';

export const isWebOS =
  typeof window !== 'undefined' &&
  typeof (window as any).webOS !== 'undefined';

export const isWeb = Platform.OS === 'web';

export const getPlatformName = (): string => {
  if (isTizen) return 'Tizen';
  if (isWebOS) return 'webOS';
  if (isTvOS) return 'tvOS';
  if (isAndroidTV) return 'Android TV';
  return 'Unknown';
};
