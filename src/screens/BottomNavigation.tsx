import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import UsersScreen from './UsersScreen';
import HomeStackNavigation from './HomeStackNavigation';
import {BottomTabParamsList} from '../types';

const BottomTab = () => {
  const Tab = createBottomTabNavigator<BottomTabParamsList>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      initialRouteName="homeTab">
      <Tab.Screen
        options={{
          tabBarIcon: () => {
            return <Icon name="home" size={28} />;
          },
        }}
        name="homeTab"
        component={HomeStackNavigation}
      />
      <Tab.Screen
        name="user"
        options={{
          tabBarIcon: () => {
            return <Icon name="user" size={28} />;
          },
        }}
        component={UsersScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
