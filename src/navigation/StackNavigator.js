import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Main from '../screens/Main';
import Search from '../screens/SearchScreen';
import {Appearance} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const isDarkMode = Appearance.getColorScheme() === 'dark';

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? '#0e1621' : '#efefef',
        },
        headerTintColor: isDarkMode ? '#9a9ea2' : 'black',
      }}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Find"
        component={Search}
        options={{
          title: 'Find a place',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
