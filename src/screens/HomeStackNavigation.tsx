import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DoctorDetailsScreen from './DoctorDetailsScreen';
import {HomeStackParamList} from '../types';
import AppointmentConfirmationScreen from './AppointmentConfirmationScreen';

const HomeStackNavigation = () => {
  const HomeStack = createNativeStackNavigator<HomeStackParamList>();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="home">
      <HomeStack.Screen name="home" component={HomeScreen} />
      <HomeStack.Screen name="doctorDetails" component={DoctorDetailsScreen} />
      <HomeStack.Screen
        name="appointmentConfirm"
        component={AppointmentConfirmationScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigation;
