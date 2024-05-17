import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Logo from '../images/svg/logo.svg';
import {RootStackParamList} from '../types';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const PaymentScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  console.log(navigation);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
      }}>
      <Text
        style={{
          marginBottom: 10,
          fontSize: 28,
          fontWeight: 'semibold',
          color: 'black',
        }}>
        Self Care
      </Text>
      <Logo />

      <Text
        style={{
          position: 'absolute',
          bottom: 30,
          fontWeight: 'semibold',
          fontSize: 18,
        }}>
        Loading...
      </Text>
    </View>
  );
};

export default PaymentScreen;
