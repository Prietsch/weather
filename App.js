// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import WeatherScreen from './screens/WeatherScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Previsão do Tempo' }} />
        <Stack.Screen name="Weather" component={WeatherScreen} options={({ route }) => ({ title: route.params.city })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}