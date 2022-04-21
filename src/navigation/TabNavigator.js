import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Forecast from '../screens/Forecast';
import Places from '../screens/Places';
import {Appearance} from 'react-native';
import StackNavigator from './StackNavigator';

const Tab = createBottomTabNavigator();
const isDarkMode = Appearance.getColorScheme() === 'dark';

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: isDarkMode ? 'white' : 'dodgerblue',
        tabBarInactiveTintColor: isDarkMode ? 'gray' : 'gray',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#0e1621' : '#efefef',
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Forecast"
        component={Forecast}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="weather-partly-cloudy" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Places"
        component={Places}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="map-marker-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
