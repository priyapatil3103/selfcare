import React from 'react';
import {View, Text, Image} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import StartImage from '../images/svg/image.svg';
import Logo from '../images/svg/thankyou.svg';
import {RootStackParamList} from '../types';
import Button from '../components/Button';
import {colors} from '../utils/global';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
const StartScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View>
        <View
          style={{
            backgroundColor: colors.green,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
          }}>
          <Logo />
          <StartImage width="80%" height="80%" />
        </View>
        <Text
          style={{textAlign: 'center', fontSize: 28, fontWeight: 'semibold'}}>
          Manage your health and happy future
        </Text>
      </View>
      <Button
        onPress={() => {
          navigation.navigate('userDetails');
        }}
        label="Get Started"
      />
    </View>
  );
};

export default StartScreen;
