import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

type RenderChild = (state: { focused: boolean }) => React.ReactNode;

type Props = {
  children: React.ReactNode | RenderChild;
  onPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  hasTVPreferredFocus?: boolean;
  disabled?: boolean;
  hitSlop?: PressableProps['hitSlop'];
  style?: StyleProp<ViewStyle>;
  focusedStyle?: StyleProp<ViewStyle>;
};

/**
 * Theme-agnostic counterpart to FocusableItem: tracks D-pad focus state and
 * applies `focusedStyle` on top of `style`, without baking in any colors.
 * Use this when the caller's screen has its own theme (e.g. scTheme, mapTheme).
 */
export const Focusable: React.FC<Props> = ({
  children,
  onPress,
  onFocus,
  onBlur,
  hasTVPreferredFocus = false,
  disabled,
  hitSlop,
  style,
  focusedStyle,
}) => {
  const [focused, setFocused] = React.useState(false);

  const content = typeof children === 'function'
    ? (children as RenderChild)({ focused })
    : children;

  return (
    <Pressable
      hasTVPreferredFocus={hasTVPreferredFocus}
      disabled={disabled}
      hitSlop={hitSlop}
      onPress={onPress}
      onFocus={() => {
        setFocused(true);
        onFocus?.();
      }}
      onBlur={() => {
        setFocused(false);
        onBlur?.();
      }}
      style={[style, focused && focusedStyle]}
    >
      {content}
    </Pressable>
  );
};
