import React from 'react';
import { TextInput, View } from 'react-native';
import { styles, mapTheme } from './styles';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search projects or province..."
        placeholderTextColor={mapTheme.colors.textSecondary}
        style={styles.searchBarInput}
        autoCorrect={false}
        autoCapitalize="none"
      />
    </View>
  );
};
