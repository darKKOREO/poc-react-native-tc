import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/Welcome';
import { HomeScreen } from '../screens/Home';
import { DashboardScreen } from '../screens/Dashboard';
import { MapProjectScreen } from '../screens/MapProject';

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Dashboard: undefined;
  Detail: { id: string };
  Player: { url: string };
  MapProject: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="MapProject" component={MapProjectScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
