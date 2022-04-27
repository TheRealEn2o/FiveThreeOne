import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Screens/Main';
import Results from './Screens/Results';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="Results" component={Results}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
