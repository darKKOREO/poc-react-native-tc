/**
 * SC Asset design tokens — light theme for the iPad sales-presenter screens.
 * Separate from src/theme (the dark TV theme): these screens are touch-first.
 */
export const scTheme = {
  colors: {
    background: '#F7F4EF',
    surface: '#FFFFFF',
    surfaceMuted: '#F1EDE6',
    primary: '#E8722A',
    primaryLight: '#FBE9DC',
    text: '#1E1A16',
    textSecondary: '#8A847C',
    border: '#E7E2DA',
    heroOverlay: 'rgba(20, 14, 8, 0.45)',
    success: '#4CAF50',
    chipDark: 'rgba(30, 26, 22, 0.55)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
    xxl: 64,
  },
  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 24,
    xxl: 34,
    display: 44,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 20,
    pill: 999,
  },
};

/** Shared TV D-pad focus ring — apply as `focusedStyle` on <Focusable>. */
export const scFocusRing = {
  borderWidth: 2,
  borderColor: scTheme.colors.primary,
  backgroundColor: scTheme.colors.primaryLight,
};

/** Border-only focus ring for elements that already have their own background/image. */
export const scFocusOutline = {
  borderWidth: 3,
  borderColor: scTheme.colors.primary,
};

/** Focus ring for elements already on a `primary`-colored background (e.g. CTA buttons). */
export const scFocusOnPrimary = {
  borderWidth: 3,
  borderColor: scTheme.colors.text,
};

export type ScTheme = typeof scTheme;
