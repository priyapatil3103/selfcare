import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import SplashScreen from '../screens/SplashScreen';
import StartScreen from '../screens/StartScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OTPScreen from './OTPScreen';

const AuthStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="splash">
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="start" component={StartScreen} />
      <Stack.Screen name="userDetails" component={UserDetailsScreen} />
      <Stack.Screen name="signIn" component={SignInScreen} />
      <Stack.Screen name="signUp" component={SignUpScreen} />
      <Stack.Screen name="otp" component={OTPScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
