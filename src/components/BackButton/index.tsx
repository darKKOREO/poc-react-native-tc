import React from 'react';
import { StyleSheet, StyleProp, Text, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FocusableItem } from '../FocusableItem';
import { theme } from '../../theme';

type Props = {
  style?: StyleProp<ViewStyle>;
  hasTVPreferredFocus?: boolean;
};

export const BackButton: React.FC<Props> = ({ style, hasTVPreferredFocus }) => {
  const navigation = useNavigation();

  if (!navigation.canGoBack()) return null;

  return (
    <FocusableItem
      hasTVPreferredFocus={hasTVPreferredFocus}
      onPress={() => navigation.goBack()}
      style={StyleSheet.flatten([styles.button, style])}
    >
      {({ focused }) => (
        <Text style={[styles.text, focused && styles.textFocused]}>←</Text>
      )}
    </FocusableItem>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    marginTop: theme.spacing.xl
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
  },
  textFocused: {
    color: theme.colors.background,
    fontWeight: '700',
  },
});
