import { StyleSheet } from 'react-native';

export const mapTheme = {
  colors: {
    background: '#FFFFFF',
    panelBackground: '#F5F5F5',
    border: '#E0E0E0',
    text: '#1A1A1A',
    textSecondary: '#6B6B6B',
    bubble: '#FFFFFF',
    bubbleBorder: '#1A1A1A',
    bubbleSelected: '#2563EB',
    cluster: '#2563EB',
    clusterText: '#FFFFFF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
  },
  fontSize: {
    sm: 12,
    md: 14,
    lg: 16,
  },
  borderRadius: {
    sm: 6,
    pill: 16,
    circle: 999,
  },
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: mapTheme.colors.background,
  },
  mapContainer: {
    flex: 65,
  },
  backButton: {
    position: 'absolute',
    top: mapTheme.spacing.lg,
    left: mapTheme.spacing.lg,
    zIndex: 10,
    borderRadius: mapTheme.borderRadius.sm,
  },
  map: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    gap: mapTheme.spacing.md,
  },
  loadingText: {
    color: mapTheme.colors.text,
    fontSize: mapTheme.fontSize.md,
  },
});
