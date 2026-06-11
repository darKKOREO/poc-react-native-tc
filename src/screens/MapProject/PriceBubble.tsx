import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { mapTheme } from './styles';

const formatPrice = (price: number): string => {
  if (price >= 1000000) {
    return `฿${(price / 1000000).toFixed(1)}M`;
  }
  return `฿${(price / 1000).toFixed(0)}K`;
};

type PriceBubbleProps = {
  priceFrom: number;
  selected?: boolean;
  onPress?: () => void;
};

export const PriceBubble: React.FC<PriceBubbleProps> = ({ priceFrom, selected, onPress }) => (
  <Pressable
    onPress={onPress}
    style={[styles.bubble, selected && styles.bubbleSelected]}
  >
    <Text style={[styles.text, selected && styles.textSelected]}>
      {formatPrice(priceFrom)}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: mapTheme.colors.bubble,
    borderColor: mapTheme.colors.bubbleBorder,
    borderWidth: 1,
    borderRadius: mapTheme.borderRadius.pill,
    paddingHorizontal: mapTheme.spacing.md,
    paddingVertical: mapTheme.spacing.xs,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  bubbleSelected: {
    backgroundColor: mapTheme.colors.bubbleSelected,
    borderColor: mapTheme.colors.bubbleSelected,
  },
  text: {
    color: mapTheme.colors.text,
    fontSize: mapTheme.fontSize.sm,
    fontWeight: '700',
  },
  textSelected: {
    color: '#FFFFFF',
  },
});
