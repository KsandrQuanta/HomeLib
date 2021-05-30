import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import BookUpdate from '../screens/BookUpdate';
import BookAdd from '../screens/BookAdd';
import BookScreen from '../screens/BookScreen';
const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookUpdate"
        component={BookUpdate}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Book"
        component={BookScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookAdd"
        component={BookAdd}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
