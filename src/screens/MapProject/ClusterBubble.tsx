import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { mapTheme } from './styles';

type ClusterBubbleProps = {
  count: number;
  onPress?: () => void;
};

export const ClusterBubble: React.FC<ClusterBubbleProps> = ({ count, onPress }) => (
  <Pressable onPress={onPress} style={styles.bubble}>
    <Text style={styles.text}>{count}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  bubble: {
    width: 36,
    height: 36,
    borderRadius: mapTheme.borderRadius.circle,
    backgroundColor: mapTheme.colors.cluster,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  text: {
    color: mapTheme.colors.clusterText,
    fontSize: mapTheme.fontSize.md,
    fontWeight: '700',
  },
});
