import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Button from '../components/Button';
import {useUser} from '../utils/userAuth';
import {RootStackParamList} from '../types';
import {Screen} from 'react-native-screens';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
const UsersScreen = () => {
  const {setUserDetails} = useUser();
  const navigation = useNavigation<NavigationProps>();

  return (
    <Button
      label="logout"
      onPress={() => {
        setUserDetails(null);
        navigation.navigate('main', {screen: 'signIn'});
      }}
    />
  );
};

export default UsersScreen;
