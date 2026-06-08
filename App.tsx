import React from 'react';
if (__DEV__) require('./src/utils/reactotron');
import { AppNavigator } from './src/navigation';

export default function App() {
  return <AppNavigator />;
}
