import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/Welcome';
import { HomeScreen } from '../screens/Home';
import { DashboardScreen } from '../screens/Dashboard';
import { MapProjectScreen } from '../screens/MapProject';
import { ScPresentScreen } from '../screens/ScAsset/PresentScreen';
import { ScPresentNormalScreen } from '../screens/ScAsset/PresentNormalScreen';
import { ScProjectDetailScreen } from '../screens/ScAsset/ProjectDetailScreen';
import { ScRegisterScreen } from '../screens/ScAsset/RegisterScreen';
import { ScConsultScreen } from '../screens/ScAsset/ConsultScreen';
import { ScBrowseScreen } from '../screens/ScAsset/BrowseScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Dashboard: undefined;
  Detail: { id: string };
  Player: { url: string };
  MapProject: undefined;
  ScPresent: undefined;
  ScPresentNormal: undefined;
  ScConsult: undefined;
  ScBrowse: undefined;
  ScRegister: { projectId?: string } | undefined;
  ScProjectDetail: { projectId: string };
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
      <Stack.Screen
        name="ScPresent"
        component={ScPresentScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="ScPresentNormal"
        component={ScPresentNormalScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="ScConsult" component={ScConsultScreen} />
      <Stack.Screen name="ScBrowse" component={ScBrowseScreen} />
      <Stack.Screen name="ScRegister" component={ScRegisterScreen} />
      <Stack.Screen name="ScProjectDetail" component={ScProjectDetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
