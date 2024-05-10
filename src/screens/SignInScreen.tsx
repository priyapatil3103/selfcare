import React from 'react';
import {View} from 'react-native';
import InitialHeader from '../components/InitialHeader';
import SignInForm from '../forms/SignInForm';

const SignInScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <InitialHeader title="Sign In" />
      <SignInForm />
    </View>
  );
};

export default SignInScreen;
