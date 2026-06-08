import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { FocusableItem } from '../../components/FocusableItem';
import { theme } from '../../theme';
import { getPlatformName } from '../../utils/platform';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 My TV App</Text>
      <Text style={styles.subtitle}>Platform: {getPlatformName()}</Text>

      <View style={styles.row}>
        {['Movies', 'Series', 'Live TV', 'Settings'].map((item, index) => (
          <FocusableItem
            key={item}
            hasTVPreferredFocus={index === 0}
            onPress={() => console.log(`Pressed: ${item}`)}
          >
            <Text style={styles.itemText}>{item}</Text>
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
});
