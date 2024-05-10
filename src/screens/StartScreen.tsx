import React from 'react';
import {View, Text} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import StartImage from '../images/svg/Vector.svg';
import {RootStackParamList} from '../types';
import Button from '../components/Button';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
const StartScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View>
        <StartImage width="100%" height="80%" />
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
        style={{marginBottom: 20}}
      />
    </View>
  );
};

export default StartScreen;
