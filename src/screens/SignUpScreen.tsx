import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SignUpForm from '../forms/SignUpForm';
import InitialHeader from '../components/InitialHeader';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <View style={{flex: 1}}>
      <InitialHeader title="Sign Up" />
      <SignUpForm navigation={navigation} />
    </View>
  );
};

export default SignUpScreen;
