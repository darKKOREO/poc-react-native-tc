import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme';

type RenderChild = (state: { focused: boolean }) => React.ReactNode;

type Props = {
  children: React.ReactNode | RenderChild;
  onPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  hasTVPreferredFocus?: boolean;
  style?: ViewStyle;
};

export const FocusableItem: React.FC<Props> = ({
  children,
  onPress,
  onFocus,
  onBlur,
  hasTVPreferredFocus = false,
  style,
}) => {
  const [focused, setFocused] = React.useState(false);

  const content = typeof children === 'function'
    ? (children as RenderChild)({ focused })
    : children;

  return (
    <Pressable
      hasTVPreferredFocus={hasTVPreferredFocus}
      onPress={onPress}
      onFocus={() => {
        setFocused(true);
        onFocus?.();
      }}
      onBlur={() => {
        setFocused(false);
        onBlur?.();
      }}
      style={[styles.container, focused && styles.focused, style]}
    >
      {content}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 3,
    borderColor: 'transparent',
    backgroundColor: theme.colors.surface,
  },
  focused: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.focused,
    transform: [{ scale: 1.1 }],
  },
});
