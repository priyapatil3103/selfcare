import React from 'react';
import {View, Text} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import StartImage from '../images/svg/startimage.svg';
import {RootStackParamList} from '../types';
import Button from '../components/Button';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
const StartScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <View style={{justifyContent: 'space-between'}}>
      <>
        <StartImage />
        <Text
          style={{textAlign: 'center', fontSize: 28, fontWeight: 'semibold'}}>
          Manage your health and happy future
        </Text>
      </>
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
