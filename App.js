import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';
import AddItemScreen from './components/AddItemScreen';
import CommercialScreen from './components/CommercialScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="AddItem" component={AddItemScreen} /> 
        <Stack.Screen name="Commercial" component={CommercialScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
