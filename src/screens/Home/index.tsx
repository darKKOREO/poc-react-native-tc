import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FocusableItem } from '../../components/FocusableItem';
import { BackButton } from '../../components/BackButton';
import { theme } from '../../theme';
import { getPlatformName } from '../../utils/platform';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <BackButton hasTVPreferredFocus />
      <Text style={styles.title}>My TV App</Text>
      <Text style={styles.subtitle}>Platform: {getPlatformName()}</Text>

      <View style={styles.row}>
        {['Movies', 'Series', 'Live TV', 'Settings'].map((item) => (
          <FocusableItem
            key={item}
            onPress={() => console.log(`Pressed: ${item}`)}
          >
            {({ focused }) => (
              <Text style={[styles.itemText, focused && styles.itemTextFocused]}>
                {item}
              </Text>
            )}
          </FocusableItem>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.title,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.md,
    marginBottom: theme.spacing.xl,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  itemText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
  },
  itemTextFocused: {
    color: theme.colors.background,
    fontWeight: '700',
  },
});
