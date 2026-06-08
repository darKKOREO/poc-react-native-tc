export const theme = {
  colors: {
    background: '#0A0A0A',
    surface: '#1A1A1A',
    primary: '#E50914',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    focused: '#FFFFFF',
    focusedBorder: '#E50914',
  },
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 40,
    xl: 64,
  },
  fontSize: {
    sm: 20,
    md: 28,
    lg: 36,
    xl: 48,
    title: 64,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
};

export type Theme = typeof theme;
