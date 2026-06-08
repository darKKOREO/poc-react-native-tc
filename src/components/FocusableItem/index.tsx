import React, { useRef } from 'react';
import {
  TouchableHighlight,
  View,
  StyleSheet,
  Platform,
  ViewStyle,
} from 'react-native';
import { theme } from '../../theme';

type Props = {
  children: React.ReactNode;
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

  return (
    <TouchableHighlight
      hasTVPreferredFocus={hasTVPreferredFocus}
      underlayColor={theme.colors.surface}
      onPress={onPress}
      onFocus={() => {
        setFocused(true);
        onFocus?.();
      }}
      onBlur={() => {
        setFocused(false);
        onBlur?.();
      }}
    >
      <View
        style={[
          styles.container,
          focused && styles.focused,
          style,
        ]}
      >
        {children}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  focused: {
    borderColor: theme.colors.focusedBorder,
    backgroundColor: theme.colors.surface,
  },
});
