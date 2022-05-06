import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Screens/Main';
import PickThree from './Screens/PickThree';
import PickOne from './Screens/PickOne';
import FinalChoice from './Screens/FinalChoice';
import Home from './Screens/Home';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="PickThree" component={PickThree}/>
        <Stack.Screen name="PickOne" component={PickOne}/>
        <Stack.Screen name="FinalChoice" component={FinalChoice}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
