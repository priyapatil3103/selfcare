import React, {useEffect} from 'react';
import {View} from 'react-native';
import SignUpForm from '../forms/SignUpForm';
import InitialHeader from '../components/InitialHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = () => {
  useEffect(() => {
    AsyncStorage.getItem('userDetails').then(val => {
      console.log(JSON.parse(val));
    });
  }, []);
  return (
    <View style={{flex: 1}}>
      <InitialHeader title="Sign Up" />
      <SignUpForm />
    </View>
  );
};

export default SignUpScreen;
